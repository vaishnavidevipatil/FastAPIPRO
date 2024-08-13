// src/components/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient'; // Correct path
import '../app.css'; // Import the CSS file
import './registerpage.css'

const RegisterPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await apiClient.post('/user/', formData);
      switch (response.status===400) {
        case 201:
          setSuccess('Registration successful!');
          localStorage.setItem('isRegistered', 'true');
          navigate('/login'); // Redirect to login page
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
    <div className="form-container register-container">
      <h1>Register</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <div>
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="show-password">Show password</label>
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;