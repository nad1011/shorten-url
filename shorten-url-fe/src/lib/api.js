import axios from "axios";

const createApiInstance = (baseURL) => {
  const api = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return api;
};

export default createApiInstance;
