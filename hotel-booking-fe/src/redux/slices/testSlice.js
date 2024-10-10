import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../services/httpMethods";

const initialState = {
  data: null,
};

export const testSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(testFunc.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const testFunc = createAsyncThunk(
  "data/testFunc",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getRequest(`TestAuthorize/admin`);
      return res.data;
    } catch (error) {
      return rejectWithValue("Error");
    }
  }
);

export const { setUser } = testSlice.actions;
export default testSlice;