import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../services/httpMethods";

const initialState = {
  rooms: [],
  allRoom:[],
  loading: false,
  error: null,
};

export const fetchRoomByHotel = createAsyncThunk(
    "room/fetchRooms",
    async (id, { rejectWithValue }) => {
      try {
        const response = await getRequest(`Room/GetAllRoomByHotel/${id}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  export const fetchAllRoom = createAsyncThunk(
    "room/fetchAllRooms",
    async (id, { rejectWithValue }) => {
      try {
        const response = await getRequest(`Room/getAll`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchRoomByHotel.pending, (state) => {
          state.loading = true;
          state.rooms = null; // Clear previous hotel details if any
          state.error = null;
        })
        .addCase(fetchRoomByHotel.fulfilled, (state, action) => {
          state.loading = false;
          state.rooms = action.payload;
        })
        .addCase(fetchRoomByHotel.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch hotel details";
        })
        .addCase(fetchAllRoom.pending, (state) => {
          state.loading = true;
          state.allRoom = null; // Clear previous hotel details if any
          state.error = null;
        })
        .addCase(fetchAllRoom.fulfilled, (state, action) => {
          state.loading = false;
          state.allRoom = action.payload;
        })
        .addCase(fetchAllRoom.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch hotel details";
        })
    },
  });
  
  export default roomSlice;