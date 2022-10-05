import axios from 'axios';
import router from '@/router/index';
import { getToken, removeToken } from './AuthTokenService';

const baseURL = process.env.VUE_APP_BASE_URL;

let axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(function (config) {
  const token = getToken();
  // set auth token
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Unauthenticated
    if (error.response.status === 401) {
      if (router.currentRoute.path !== '/login') {
        removeToken();
        router.push('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
