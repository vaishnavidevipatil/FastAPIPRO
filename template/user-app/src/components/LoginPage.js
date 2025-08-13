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

  const [loading, setLoading] = useState(false); // Loading state
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

    setLoading(true); // Set loading to true during API call

    try {
      const response = await apiClient.post('/token', credentials); // Removed trailing slash
      if (response.status === 200) {        setSuccess('Logged in successfully!');
        setCredentials({
          email: '',
          password: '',
        });
        navigate('/home'); 
      } else if (response.status === 401) {
        setError('Invalid email or password. Please try again.');

        const token = response.data.access_token;
        console.log('Access Token:', token);
        localStorage.setItem('access_token', token);
        navigate('/home');

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

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>
        {success && <div className="message success">{success}</div>}
        {error && <div className="message error">{error}</div>}
      </div>
    </div>
  );
};


export default LoginPage;
