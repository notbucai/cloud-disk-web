import axios from 'axios';

const axiosFonfig = {
  baseURL: process.env.NODE_ENV === "production" ? "http://clos.ncgame.cc" : "http://127.0.0.1:7001"
}
const _axios = axios.create(axiosFonfig);

_axios.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
);

_axios.interceptors.response.use(
  response => response,
  error => error.response,
);

export default _axios;