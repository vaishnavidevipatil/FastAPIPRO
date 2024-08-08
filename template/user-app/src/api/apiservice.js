// src/apiService.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000', // Ensure this matches your FastAPI server URL
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const createUser = async (userData) => {
  try {
    const response = await apiClient.post('/user/', userData);
    return response.data;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
};

export const getUsers = async (skip = 0, limit = 100) => {
  try {
    const response = await apiClient.get('/users/', {
      params: { skip, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

export const getUser = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
};

export const createItemForUser = async (userId, itemData) => {
  try {
    const response = await apiClient.post(`/users/${userId}/items/`, itemData);
    return response.data;
  } catch (error) {
    console.error('Failed to create item for user:', error);
    throw error;
  }
};

export const getItems = async (skip = 0, limit = 100) => {
  try {
    const response = await apiClient.get('/items/', {
      params: { skip, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch items:', error);
    throw error;
  }
};