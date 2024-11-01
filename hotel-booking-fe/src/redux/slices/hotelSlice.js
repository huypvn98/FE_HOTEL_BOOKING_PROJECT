// hotelSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../services/httpMethods";

const initialState = {
  hotels: [],
  hotelData: null,
  loading: false,
  error: null,
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    setHotelData: (state, action) => {
      state.hotelData = action.payload;
    },
    clearHotelData: (state) => {
      state.hotelData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        console.log("Fetched hotels:", action.payload); // Log the fetched hotels
        state.hotels = action.payload;
        state.loading = false;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchHotelById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotelById.fulfilled, (state, action) => {
        state.hotelData = action.payload;
        state.loading = false;
      })
      .addCase(fetchHotelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const fetchHotels = createAsyncThunk(
  "hotel/fetchHotels",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getRequest("Hotel/GetAll"); // Endpoint for all hotels
      return res.data;
    } catch (error) {
      return rejectWithValue("Error fetching hotels");
    }
  }
);

export const fetchHotelById = createAsyncThunk(
  "hotel/fetchHotelById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getRequest(`Hotel/GetById/${id}`); // Endpoint for a single hotel
      return res.data;
    } catch (error) {
      return rejectWithValue("Error fetching hotel");
    }
  }
);

export const { setHotelData, clearHotelData } = hotelSlice.actions;
export default hotelSlice;
