import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../services/httpMethods";

const initialState = {
  hotels: [],
  hotelDetail: null,
  loading: false,
  error: null,
};

export const fetchHotels = createAsyncThunk(
  "hotel/fetchHotels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequest("Hotel/GetAll");
      return response.data.data; // Extract the data array
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchHotelDetail = createAsyncThunk(
  "hotel/fetchHotelDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getRequest(`Hotel/GetById/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchHotelDetail.pending, (state) => {
        state.loading = true;
        state.hotelDetail = null; // Clear previous hotel details if any
        state.error = null;
      })
      .addCase(fetchHotelDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.hotelDetail = action.payload;
      })
      .addCase(fetchHotelDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch hotel details";
      });
  },
});

export default hotelSlice;
