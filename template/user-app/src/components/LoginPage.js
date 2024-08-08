// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import '../app.css'; 

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await apiClient.post('/token/', credentials);
      if (response.status === 200) {
        setSuccess('Logged in successfully!');
        setCredentials({
          email: '',
          password: '',
        });
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
        setError('Failed to log in. Please check your credentials.');
      }
      console.error('Error during login:', err);
    }
  };

  return (
    <div className="login-container">
      {/* <img src={backgroundImage} alt="Background" className="background-image" /> */}
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {success && <div className="message success">{success}</div>}
        {error && <div className="message error">{error}</div>}
      </div>
    </div>
  );
};


export default LoginPage;
