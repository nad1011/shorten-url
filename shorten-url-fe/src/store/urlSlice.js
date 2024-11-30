import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { urlService } from "@/services/api/urlApi";

export const createShortUrl = createAsyncThunk("url/create", async (url) => {
  const response = await urlService.create(url);
  if (response.error) {
    throw new Error(response.error);
  }
  return {
    originalUrl: response.data.originalUrl,
    shortId: response.data.shortId,
    qrCode: null,
  };
});

export const createBulkUrls = createAsyncThunk(
  "url/bulkCreate",
  async (urls) => await urlService.bulkCreate(urls)
);

export const generateQrCode = createAsyncThunk("url/qr", async (url) => {
  const response = await urlService.generateQr(url);
  if (response.error) {
    throw new Error(response.error);
  }
  return {
    originalUrl: response.data.originalUrl,
    shortId: response.data.shortId,
    qrCode: response.data.qrCode,
  };
});

const urlSlice = createSlice({
  name: "url",
  initialState: {
    items: [], // array of {shortId, originalUrl, qrCode, accessTimes}
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Short URL
      .addCase(createShortUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShortUrl.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createShortUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create URL with QR
      .addCase(generateQrCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateQrCode.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.loading = false;
      })
      .addCase(generateQrCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default urlSlice.reducer;
