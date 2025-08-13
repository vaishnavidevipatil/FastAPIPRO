// src/App.jsx
import { Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import LoginPage from './components/Login';
import "./app.css"
import HomePage from './components/HomePage';
import "./app.css";
import Home from './components/Home';
function App() {
  useEffect(() => {
  //   fetchData();
   }, 
  []);

  return (
    <Router>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Protected Route Example */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/signin" />} />
     

    </Router>
  );
}

export default App;