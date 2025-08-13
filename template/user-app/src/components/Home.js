import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import './HomePage.css';
import axios from 'axios';

function Home() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

    const fetchStock = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/get_stock?symbol=${symbol}`);
      setPrice(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch stock data");
    }
  };
  const [symbol, setSymbol] = useState("AAPL");
  const [price, setPrice] = useState(null);


  useEffect(() => {
    axios.get("http://localhost:8000/users/")
      .then((response) => {
        setUsers(response.data);
        setError("");
      })
      .catch((err) => {
        setError("An error occurred. Please try again.");
        console.error(err);
      });
  }, []);

  return (
    <div className="HomePage">
      <header className="HomePage-header">
        <h2>Homepage</h2>
        <>
          {message ? <p>{message}</p> : error && <p>{error}</p>}
          <p>This is a simple home page component.</p>
           <div>
      <table border="1">
        <thead>
          <tr><th>ID</th><th>Email</th></tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </>
      </header>
      <div>
    <div>
      <input
        value={symbol}
        onChange={e => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter stock symbol"
      />
      <button onClick={fetchStock}>Check Price</button>

      {price && (
        <div>
          <p><strong>{price.symbol}</strong></p>
          <p>Date: {price.date}</p>
          <p>Close Price: ${price.close_price}</p>
        </div>
      )}
    </div>
      </div>
    </div>
  );
}

export default Home;
