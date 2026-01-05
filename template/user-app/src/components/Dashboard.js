import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';


function Dashboard() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch welcome message
        const messageResponse = await apiClient.get('/homepage/');
        if (messageResponse.status === 200) {
          setMessage(messageResponse.data.message);
        } else {
          setError('Failed to fetch the welcome message.');
        }

        // Fetch users
        const usersResponse = await apiClient.get('/users');
        if (usersResponse.status === 200) {
          console.log('Users fetched:', usersResponse.data);  // Log fetched users for debugging
          setUsers(usersResponse.data);
        } else {
          setError('Failed to fetch users.');
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
        console.error(error);  // Log the actual error for debugging
      }   
    };
    fetchData();
  }, []);

  return (
    <div className="HomePage">
      <header className="HomePage-header">
        <h1>Welcome Homepage</h1>
        {message && <p>{message}</p>}
      </header>
    </div>
  );
}

export default Dashboard;
