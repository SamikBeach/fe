import { getNewAccessToken } from '@apis/auth/token';
import axios from 'axios';
import { cookies } from 'next/headers';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const { data } = await getNewAccessToken();

      api.defaults.headers.common['Authorization'] =
        `Bearer ${data.accessToken}`;
    }

    return Promise.reject(error);
  }
);

export default api;
