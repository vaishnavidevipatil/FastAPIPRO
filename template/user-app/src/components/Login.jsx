import React, { useState } from "react";
import signinImage from "../images/signin-image.jpg"; // adjust path
import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    your_name: "",
    your_pass: "",
    rememberMe: false
  });
  
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setSuccess(null);
  setLoading(true);

  try {
    const response = await axios.post('http://localhost:8000/token', credentials); // Use your backend URL
    if (response.status === 200) {
      setSuccess('Logged in successfully!');
      setCredentials({
        email: '',
        password: '',
      });
      const token = response.data.access_token;
      localStorage.setItem('access_token', token);
      navigate('/home');
    } else if (response.status === 401) {
      setError('Invalid email or password. Please try again.');
    } else {
      setError('Unexpected response. Please try again.');
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError(err.response.data.detail || 'Failed to log in. Please check your credentials.');
      }
    } else {
      setError('Network error. Please try again later.');
    }
    console.error('Error during login:', err);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="main">
      <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src={signinImage} alt="sign in" />
              </figure>
              <a href="/register" className="signup-image-link">Create an account</a>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Sign In</h2>
              <form className="register-form" id="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                  <input
                    type="text"
                    name="your_name"
                    placeholder="Your Name"
                    value={formData.your_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                  <input
                    type="password"
                    name="your_pass"
                    placeholder="Password"
                    value={formData.your_pass}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label htmlFor="remember-me" className="label-agree-term">Remember me</label>
                </div>
                <div className="form-group form-button">
                  <input type="submit" className="form-submit" value="Log in" />
                </div>
              </form>

              <div className="social-login">
                <span className="social-label">Or login with</span>
                <ul className="socials">
                  <li><a href="#"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                  <li><a href="#"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                  <li><a href="#"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
