import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../services/httpMethods";

const initialState = {
  bed: [],
  bedDetail: [],
  loading: false,
  error: null,
};

export const fetchAllBedDetail = createAsyncThunk(
  "room/fetchBedDetail",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequest(`Beds`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bedSlice = createSlice({
  name: "bedDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBedDetail.pending, (state) => {
        state.loading = true;
        state.bedDetail = null; // Clear previous hotel details if any
        state.error = null;
      })
      .addCase(fetchAllBedDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.bedDetail = action.payload;
      })
      .addCase(fetchAllBedDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch bed";
      });
  },
});

export default bedSlice;
