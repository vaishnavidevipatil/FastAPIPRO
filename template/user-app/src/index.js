// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage'; // Adjust the path if needed
import './app.css'; // Import global styles

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Add more routes here as needed */}
  
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
