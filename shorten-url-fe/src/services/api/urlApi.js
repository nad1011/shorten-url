import { API_ENDPOINTS } from "@/config/endPoints";
import createApiInstance from "@/lib/api";

const api = createApiInstance(API_ENDPOINTS.BASE_URL);

export const urlService = {
  create: async (url) => {
    const response = await api.post(API_ENDPOINTS.URL.CREATE, { url });
    return response.error
      ? {
          error: response.error,
        }
      : response.data;
  },
  // bulkCreate: (urls) => api.post(API_ENDPOINTS.URL.BULK_CREATE, { urls }),
  generateQr: async (url) => {
    const response = await api.post(API_ENDPOINTS.QR.GENERATE, { url });
    return response.error
      ? {
          error: response.error,
        }
      : response.data;
  },
  get: async (shortId) => {
    const response = await api.get(API_ENDPOINTS.URL.GET(shortId));
    return response.error
      ? {
          error: response.error,
        }
      : response.data;
  },
};
