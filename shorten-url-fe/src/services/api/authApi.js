import { API_ENDPOINTS } from "@/config/endPoints";
import createApiInstance from "@/lib/api";

const api = createApiInstance(API_ENDPOINTS.BASE_URL);

export const authService = {
  login: (credentials) => api.post(API_ENDPOINTS.AUTH.LOGIN, credentials),
  register: (data) => api.post(API_ENDPOINTS.AUTH.REGISTER, data),
  getProfile: () => api.get(API_ENDPOINTS.AUTH.PROFILE),
};
