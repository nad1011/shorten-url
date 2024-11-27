export const API_ENDPOINTS = {
  BASE_URL: "http://localhost:3000/",
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/profile",
  }, // TODO: Add in BE
  URL: {
    CREATE: "/url",
    BULK_CREATE: "/url/bulk",
    GET: (id) => `/url/${id}`,
    GET_ALL: "/url", // TODO: Add in BE
  },
  QR: {
    GENERATE: "/url/qr",
  },
};
