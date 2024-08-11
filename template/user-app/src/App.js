import React, { useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import "./app.css";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import HomePage from "./components/HomePage";

export default function App() {
  const [type, setType] = useState("signIn");
  const navigate = useNavigate(); // Hook for navigation

  const handleOnClick = (text) => {
    if (text === "signUp") {
      navigate("/register"); // Redirect to the register page
    } else if (text === "signIn") {
      setType(text);
    }
  };

  const containerClass = "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<div>Welcome to the User App</div>} />
        <Route path="/register" element={<SignUpForm />} />
        <Route path="/login" element={<SignInForm />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>

      {window.location.pathname !== '/home' && (
        <div className={containerClass} id="container">
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={() => handleOnClick("signIn")}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start the journey with us</p>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={() => handleOnClick("signUp")}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
