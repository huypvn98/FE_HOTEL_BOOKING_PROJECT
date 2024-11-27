import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../services/httpMethods";
import { notification } from "antd";

const initialState = {
  bookings: [],
  paymentUrl: null,
  loading: false,
  error: null,
};

export const fetchHotels = createAsyncThunk(
  "hotel/fetchHotels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequest("Hotel/GetAll");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBooking = createAsyncThunk(
  "hotel/fetchBooking",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await postRequest("Booking/Create", payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPaymentUrl = createAsyncThunk(
  "hotel/createPaymentUrl",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await postRequest("Payment/create-payment-url", payload);
      return response.data.url;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const BookingSlice = createSlice({
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
        state.bookings = action.payload;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
        notification.success({ message: "Booking successful" });
        localStorage.removeItem("checkInDate");
        localStorage.removeItem("checkOutDate");
        localStorage.removeItem("nights");
      })
      .addCase(fetchBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notification.error({ message: "Booking failed" });
      })
      .addCase(createPaymentUrl.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPaymentUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentUrl = action.payload;
      })
      .addCase(createPaymentUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
      });
  },
});

export default BookingSlice;
