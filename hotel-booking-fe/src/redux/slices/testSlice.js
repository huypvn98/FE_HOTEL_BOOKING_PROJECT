import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest, postRequestMultipartFormData } from "../../services/httpMethods";
import { notification } from "antd";

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

export const registerUser = createAsyncThunk(
  "data/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await postRequestMultipartFormData("Auth/register", payload);
      if (response && response.status === 200) {
        notification.success({
          message: "Registration Successful",
          description: "You have successfully registered.",
          duration: 2,
        });
      }
      return response.data;
    } catch (error) {
      // Show error notification
      notification.error({
        message: "Registration Failed",
        description: error.response || "An error occurred during registration.",
      });

      return rejectWithValue(error.response || error.message);
    }
  }
);

export const { setUser } = testSlice.actions;
export default testSlice;
