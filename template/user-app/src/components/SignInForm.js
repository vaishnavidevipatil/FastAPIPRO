import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient'; // Adjust the path as needed
import '../app.css'; // Ensure the correct path

function SignInForm() {
  const [state, setState] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

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

    const { email, password } = state;
    try {
      const response = await apiClient.post('/token/', { email, password }); // Adjust endpoint as needed
      if (response.status === 200) {
        const token = response.data.token; // Assume the token is returned in response.data.token
        localStorage.setItem('jwtToken', token); // Store the token in local storage
        
        setSuccess('Logged in successfully!');
        setState({ email: '', password: '' });
        navigate('/home'); // Redirect to homepage
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
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign In</h1>
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
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button type="submit">Login</button>
      </form>
      {success && <div className="message success">{success}</div>}
      {error && <div className="message error">{error}</div>}
    </div>
  );
}

export default SignInForm;
