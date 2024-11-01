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

const fectHotelDetail = createAsyncThunk(
    "hotel/fetchHotelDetail",
    async (id, { rejectWithValue }) => {
        try {
            const response = await getRequest(`Hotel/GetById/${id}`);
            return response.data.data;
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
            .addCase(fectHotelDetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(fectHotelDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.hotelDetail = action.payload;
            })
            .addCase(fectHotelDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
            
    },
});

export default hotelSlice.reducer;