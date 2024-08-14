// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

function HomePage() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const token = localStorage.getItem('access_token'); // Get the access token from local storage
        if (!token) {
          throw new Error('Access token not found in local storage.');
        }
        const response = await apiClient.post('/homepage', null, {
          headers: {
            'Authorization': `Bearer ${token}`, // Send token in the header
          },
        });
        if (response.status === 200) {
          setMessage(response.data.message);
        } else {
          setError('Failed to fetch the welcome message.');
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
      }
    };
    fetchWelcomeMessage();
  }, []);

  return (
    <div className="HomePage">
      <header className="HomePage-header">
        <h2>Homepage</h2>
        {message ? <p>{message}</p> : <p>{error}</p>}
        <p>This is a simple home page component.</p>
      </header>
    </div>
  );
}

export default HomePage;
