import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postRequest, postRequestFormData } from "../../services/httpMethods";
import { message } from "antd";

const initialState = {
  data: null,
  user: localStorage.getItem("user") || null,
  loading: false,
  error: null,
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false, // Retrieve isAuthenticated from local storage// Add isAuthenticated to the initial state
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user"); 
      localStorage.setItem("isAuthenticated", false);
      message.info("You have loggout"); // Reset isAuthenticated on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.userInfo; // Assuming the payload contains user data
        localStorage.setItem("user", JSON.stringify(action.payload.userInfo));
        state.isAuthenticated = true; // Set isAuthenticated to true on successful login
        localStorage.setItem("isAuthenticated", true);
        message.success("You have successfully logged in.");
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.isAuthenticated = false;
        localStorage.setItem("isAuthenticated", false);
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
      console.log(res)
      return res; 
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

// Define the async thunk for registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await postRequestFormData("Auth/register", payload);
      if (response && response.status === 200) {
        message.success("You have successfully registered.");
      }
      return response.data;
    } catch (error) {
      message.error(
        error.response.data.message || "An error occurred during registration."
      );
      return rejectWithValue(error.response || error.response.data.message);
    }
  }
);

export const { logout } = authSlice.actions;
export default authSlice; // Export the reducer, not the slice itself
