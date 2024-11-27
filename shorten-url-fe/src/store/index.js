import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import urlReducer from "./urlSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    url: urlReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {},
    }),
});

export default store;
