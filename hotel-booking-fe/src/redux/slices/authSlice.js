import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postRequest, postRequestFormData } from "../../services/httpMethods";
import { notification } from "antd";

const initialState = {
  data: null,
  user: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Assuming the payload contains user data
        notification.success({
          message: "Login Successful",
          description: "You have successfully logged in.",
          duration: 2,
        });
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

// Define the async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // Ensure you're sending the correct headers and payload
      const res = await postRequest("Auth/login", {
        username,
        password,
      });
      return res.data; // Assuming the response contains user data
    } catch (error) {
      // Check if the error response is available
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.message || "Invalid credentials"
        );
      }
      return rejectWithValue("Invalid credentials");
    }
  }
);

//define the async thunk for registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await postRequestFormData("Auth/register", payload);
      if (response && response.status === 200) {
        notification.success({
          message: "Registration Successful",
          description: "You have successfully registered.",
          duration: 2,
        });
      }
      return response.data;
    } catch (error) {
      notification.error({
        message: "Registration Failed",
        description: error.response || "An error occurred during registration.",
      });
      return rejectWithValue(error.response || error.message);
    }
  }
);

export const { logout } = authSlice.actions;
export default authSlice; // Export the reducer, not the slice itself