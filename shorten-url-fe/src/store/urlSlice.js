import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { urlService } from "@/services/api/urlApi";

export const createShortUrl = createAsyncThunk("url", async (url) => {
  const response = await urlService.create(url);
  if (response.error) {
    throw new Error(response.error);
  }
  return {
    originalUrl: response.originalUrl,
    shortId: response.shortId,
    qrCode: null,
  };
});

// export const createBulkUrls = createAsyncThunk(
//   "url/bulkCreate",
//   async (urls) => await urlService.bulkCreate(urls)
// );

export const generateQrCode = createAsyncThunk("url/qr", async (url) => {
  const response = await urlService.generateQr(url);
  if (response.error) {
    throw new Error(response.error);
  }
  return {
    originalUrl: response.originalUrl,
    shortId: response.shortId,
    qrCode: response.qrCode,
  };
});

export const fetchUrls = createAsyncThunk("url/fetch", async (user) => {
  const response = urlService.fetch(user.id);
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data;
});

const urlSlice = createSlice({
  name: "url",
  initialState: {
    items: [], // array of {shortId, originalUrl, qrCode, accessTimes}
    loading: false,
    error: null,
  },
  reducers: {
    clearItems: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch URLs
      .addCase(fetchUrls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUrls.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
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

export const { clearItems } = urlSlice.actions;
export default urlSlice.reducer;
