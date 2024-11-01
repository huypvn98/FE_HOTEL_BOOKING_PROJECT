import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../services/httpMethods";

const initialState = {
    bookings: [],
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

const hotelSlice = createSlice({
    name: "hotel",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHotels.pending, (state) => {
                state.loading = true;
            })
           
    },
});

export default hotelSlice.reducer;