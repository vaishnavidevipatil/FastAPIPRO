import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000', // Change to your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;