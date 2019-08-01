import axios from 'axios';

const axiosFonfig = {
  baseURL: process.env.NODE_ENV === "production" ? "https://cloud.jvtcit.com/api" : "http://127.0.0.1:7001"
}
const _axios = axios.create(axiosFonfig);

_axios.interceptors.request.use(
  config => {
    config.headers.Authorization = localStorage.getItem('token');
    return config;
  },
  error => Promise.reject(error),
);

_axios.interceptors.response.use(
  response => {
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
  error => error.response,
);

export default _axios;