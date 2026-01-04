import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies with requests
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    console.log('With credentials:', config.withCredentials);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('Response from:', response.config.url, '- Status:', response.status);
    return response;
  },
  (error) => {
    console.error('Request failed:', error.config?.url, '- Status:', error.response?.status);
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (adminData) => api.post('/auth/admin/register', adminData),
  login: (credentials) => api.post('/auth/admin/login', credentials),
};

// User APIs
export const userAPI = {
  getAllTools: () => api.get('/user/getAll'),
  getFilteredTools: (params) => api.get('/user/tools', { params }),
  getApprovedReviews: (toolId) => api.get(`/user/user/reviews/approved/${toolId}`),
  addReview: (toolId, reviewData) => api.post(`/user/user/reviews/add/${toolId}`, reviewData),
};

// Admin APIs
export const adminAPI = {
  getAllTools: () => api.get('/admin/aitools'),
  addTool: (toolData) => api.post('/admin/aitools/add', toolData),
  getPendingReviews: (toolId) => api.get(`/admin/reviews/pending/${toolId}`),
  approveReview: (reviewId) => api.put(`/admin/reviews/approve/${reviewId}`),
  recalculateRating: (toolId) => api.put(`/admin/aitools/${toolId}/recalculate-rating`),
};

export default api;

