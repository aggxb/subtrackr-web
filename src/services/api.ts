import axios from 'axios';

export const subtrackrAPI = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    'http://localhost:8080/api/v1/subscriptions',
  headers: { 'Content-Type': 'application/json' },
});
