// src/components/HomePage.js
import React from 'react';
import './HomePage.css'; // Import the CSS file for styling

function HomePage() {
  return (
    <div className="HomePage">
      <header className="HomePage-header">
        <h1>Welcome to the Home Page!</h1>
        <p>This is a simple homepage component.</p>
        <img
          src="https://images.unsplash.com/photo-1617591707807-3c7e9e67cf65"
          alt="Ganesha"
          className="HomePage-image"
        />
      </header>
    </div>
  );
}

export default HomePage;
