import { Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import "./app.css";
import HomePage from './components/HomePage';

function App() {
  useEffect(() => {
    // fetchData();
  }, []);

  return (
  <Routes>
    <Route path="/" element={<Navigate to="/register" />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/home" element={<HomePage />} />
  </Routes>

  );
}

export default App;
