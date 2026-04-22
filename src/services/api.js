import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://task-backend-qek0.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to handle API responses
const handleResponse = (response) => response.data;

// Error handler wrapper
const handleError = (error) => {
  const message = error.response?.data?.message || error.message || 'Something went wrong';
  console.error('API Error:', message);
  throw new Error(message);
};

export const taskService = {
  getTasks: async () => {
    try {
      const response = await api.get('/tasks');
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  updateTask: async (id, taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
};

export default api;
