import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postRequest } from "../../services/httpMethods"; // Assuming you have a postRequest function

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
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
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

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice; // Export the reducer, not the slice itself
