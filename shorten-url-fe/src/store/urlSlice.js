import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { urlService } from "@/services/api/urlApi";

export const createShortUrl = createAsyncThunk(
  "url/create",
  async (url) => await urlService.create(url)
);

export const createBulkUrls = createAsyncThunk(
  "url/bulkCreate",
  async (urls) => await urlService.bulkCreate(urls)
);

export const fetchUrls = createAsyncThunk(
  "url/fetchAll",
  async () => await urlService.getAll()
);

const urlSlice = createSlice({
  name: "url",
  initialState: {
    urls: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createShortUrl.pending, (state) => {
        state.loading = true;
      })
      .addCase(createShortUrl.fulfilled, (state, action) => {
        state.urls.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createShortUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUrls.fulfilled, (state, action) => {
        state.urls = action.payload;
      });
  },
});

export default urlSlice.reducer;
