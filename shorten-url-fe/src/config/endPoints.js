export const API_ENDPOINTS = {
  BASE_URL: "http://localhost:3000/",
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    PROFILE: "/auth/profile",
  }, // TODO: Add in BE
  URL: {
    CREATE: "/url",
    BULK_CREATE: "/url/bulk",
    GET: (id) => `/url/${id}`,
    GET_USER_URLS: "/url/user",
  },
  QR: {
    GENERATE: "/url/qr",
  },
};
