import { API_ENDPOINTS } from "@/config/endPoints";
import createApiInstance from "@/lib/api";

const api = createApiInstance(API_ENDPOINTS.BASE_URL);

export const urlService = {
  create: (url) => api.post(API_ENDPOINTS.URL.CREATE, { url }),
  bulkCreate: (urls) => api.post(API_ENDPOINTS.URL.BULK_CREATE, { urls }),
  getAll: () => api.get(API_ENDPOINTS.URL.GET_ALL),
  getOne: (id) => api.get(API_ENDPOINTS.URL.GET_ONE(id)),
};
