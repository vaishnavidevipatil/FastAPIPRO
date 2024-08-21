import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

function HomePage() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token'); // Get the access token from local storage
        if (!token) {
          throw new Error('Access token not found in local storage.');
        }

        // Fetch welcome message
        const messageResponse = await apiClient.post('/homepage', null, {
          headers: {
            'Authorization': `Bearer ${token}`, // Send token in the header
          },
        });

        if (messageResponse.status === 200) {
          setMessage(messageResponse.data.message);
        } else {
          setError('Failed to fetch the welcome message.');
        }

        // Fetch users
        const usersResponse = await apiClient.get('/users', {
          headers: {
            'Authorization': `Bearer ${token}`, // Send token in the header
          },
        });

        if (usersResponse.status === 200) {
          setUsers(usersResponse.data);
        } else {
          setError('Failed to fetch users.');
        }

      } catch (error) {
        setError('An error occurred. Please try again.');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="HomePage">
      <header className="HomePage-header">
        <h2>Homepage</h2>
        {message ? <p>{message}</p> : <p>{error}</p>}
        <p>This is a simple home page component.</p>
      </header>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;
