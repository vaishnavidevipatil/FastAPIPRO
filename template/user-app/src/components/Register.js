import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import signupImage from "../images/signup-image.jpg"; // adjust path

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
    re_pass: "",
    agreeTerm: false
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      setError("You must agree to the terms of service.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/user/", formData, {
        headers: { "Content-Type": "application/json" }
      });

      if (response.status === 201) {
        setSuccess("Registration successful!");
        localStorage.setItem("isRegistered", "true");
        navigate("/login");
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          if (err.response.data.detail === "Email already registered") {
            setError("User already exists. Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
          } else {
            setError(err.response.data.detail || "Bad request. Please check your input.");
          }
        } else {
          setError("Unexpected server error.");
        }
      } else {
        setError("Network error. Please try again.");
      }
      console.error("Registration error:", err);
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
                    required
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
                    required
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
                    required
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
                    required
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
              </form>

              {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
              {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}
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
