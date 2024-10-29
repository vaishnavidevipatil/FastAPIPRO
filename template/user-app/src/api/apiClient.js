// Example of how to set the Authorization header in a React app using Axios
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your FastAPI backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

const token = localStorage.getItem('token'); // Assuming you store your token in localStorage

if (token) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default apiClient;
