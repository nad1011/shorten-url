import axios from "axios";

const createApiInstance = (baseURL) => {
  const api = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
        }
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export default createApiInstance;
