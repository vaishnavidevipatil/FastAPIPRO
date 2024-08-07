// src/App.jsx
import { Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import apiClient from './api/apiClient'; // Adjust path if needed
import "./app.css"

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/register/');
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Navigate to="/register" />} /> // Redirect to /login
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;