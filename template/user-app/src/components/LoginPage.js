import React, { useState } from "react";
import signinImage from "../images/signin-image.jpg";
import { useNavigate } from 'react-router-dom';
import apiClient from "../api/apiClient"; // Make sure you have this set up for axios

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const params = new URLSearchParams();
      params.append("username", formData.username);
      params.append("password", formData.password);

      const response = await apiClient.post("/token", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      });

      if (response.status === 200) {
        setSuccess("Login successful!");
        localStorage.setItem("access_token", response.data.access_token);
        navigate("/homepage");
      } else {
        setError("Unexpected response. Please try again.");
      }
    } catch (error) {
      setError("Invalid credentials or server error.");
      console.error("Login error:", error);
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
                  <label htmlFor="username"><i className="zmdi zmdi-account material-icons-name"></i></label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Email"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password"><i className="zmdi zmdi-lock"></i></label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
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
                {error && <div style={{ color: "red" }}>{error}</div>}
                {success && <div style={{ color: "green" }}>{success}</div>}
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
