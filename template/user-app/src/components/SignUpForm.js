import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient'; // Import the configured apiClient
import "../app.css"; // Ensure the correct path

function SignUpForm() {
  const [state, setState] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();


  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    setError(null);
    setSuccess(null);

    const { name, email, password } = state;
    alert(
      `You are sign up with name: ${name} email: ${email} and password: ${password}`
    );

    try {
      const response = await apiClient.post('/user/', { email, password });
      switch (response.status === 400) {
        case 201:
          setSuccess('Registration successful!');
          localStorage.setItem('isRegistered', 'true');
          navigate('/login')
          // Reset form fields
          setState({
            email: "",
            password: ""
          });
          break;
        case 400:
          if (response.data.detail === 'Email already registered') {
            setError('User already exists. Redirecting to login...');
            navigate('/login'); // Immediately redirect if user already exists
          } else {
            setError(response.data.detail || 'Bad request. Please check your input.');
          }
          break;
        default:
          setError('Unexpected response. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        // Only if response is present in error
        switch (error.response.status) {
          case 400:
            if (error.response.data.detail === 'Email already registered') {
              setError('User already exists. Redirecting to login...');
              navigate('/login'); 
            } else {
              setError(error.response.data.detail || 'Bad request. Please check your input.');
            }
            break;
          default:
            setError('Unexpected response. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
        {success && <div className="message success">{success}</div>}
        {error && <div className="message error">{error}</div>}
      </form>
    </div>
  );
}

export default SignUpForm;
