import { API_ENDPOINTS } from "@/config/endPoints";
import createApiInstance from "@/lib/api";

const api = createApiInstance(API_ENDPOINTS.BASE_URL);

export const authService = {
  login: async (credentials) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, {
      ...credentials,
    });
    if (response.data?.accessToken) {
      localStorage.setItem("token", response.data.accessToken);
    }

    return response.error
      ? {
          error: response.error,
        }
      : response.data;
  },
  register: async (credentials) => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, {
      ...credentials,
    });
    if (response.data?.accessToken) {
      localStorage.setItem("token", response.data.accessToken);
    }

    return response.error
      ? {
          error: response.error,
        }
      : response.data;
  },
  getProfile: async () => {
    const response = await api.get(API_ENDPOINTS.AUTH.PROFILE);
    return response.error
      ? {
          error: response.error,
        }
      : response.data;
  },
};
