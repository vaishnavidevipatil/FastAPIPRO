import React, { useState } from "react";
import signupImage from "../images/signup-image.jpg";
import { useNavigate } from 'react-router-dom';
import apiClient from "../api/apiClient"; // Make sure this is set up for axios
import '../registerpage.css'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
    re_pass: "",
    agreeTerm: false
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.agreeTerm) {
      setError("You must agree to the terms.");
      return;
    }
    if (formData.pass !== formData.re_pass) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.pass
      };
      const response = await apiClient.post("/user", payload);
      if (response.status === 200) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.detail || "Registration failed. Please try again."
      );
    }
  };

  return (
     <div className="main">
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form className="register-form" id="register-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                  <input
                    type="password"
                    name="pass"
                    placeholder="Password"
                    value={formData.pass}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="re_pass"><i className="zmdi zmdi-lock-outline"></i></label>
                  <input
                    type="password"
                    name="re_pass"
                    placeholder="Repeat your password"
                    value={formData.re_pass}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    name="agreeTerm"
                    checked={formData.agreeTerm}
                    onChange={handleChange}
                  />
                  <label htmlFor="agree-term" className="label-agree-term">
                    I agree all statements in <a href="#">Terms of service</a>
                  </label>
                </div>
                <div className="form-group form-button">
                  <input type="submit" className="form-submit" value="Register" />
                </div>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img src={signupImage} alt="sign up" />
              </figure>
              <a href="/login" className="signup-image-link">I am already member</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
