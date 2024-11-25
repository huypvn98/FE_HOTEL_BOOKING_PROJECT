import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../services/httpMethods";

const initialState = {
  rooms: [],
  roomDetail: null,
  loading: false,
  error: null,
};

export const fetchAllRoomDetail = createAsyncThunk(
  "room/fetchRoomDetail",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequest(`RoomDetail/getAll`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const roomDetailSlice = createSlice({
  name: "roomDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRoomDetail.pending, (state) => {
        state.loading = true;
        state.roomDetail = null; // Clear previous hotel details if any
        state.error = null;
      })
      .addCase(fetchAllRoomDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.roomDetail = action.payload;
      })
      .addCase(fetchAllRoomDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch room details";
      });
  },
});

export default roomDetailSlice;
