import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { putRequestFormData, getRequestParams, getRequest, postRequestFormData, deleteRequest } from "../../services/httpMethods";
import { notification } from "antd";

const initialState = {
  data: null,
  loading: false,
  error: null,
  userDetails: null,
  users: [],
};

export const fetchEditUser = createAsyncThunk(
  "user/fetchEditUser",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await putRequestFormData(
        `User/updateUser/${id}`,
        formData
      );
      if (response.status === 204) {
        return null; // No content but successful
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getRequestParams(`User/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add a new async thunk to fetch all users
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequest("User/getAllUsers");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

 export const fetchCreateUser = createAsyncThunk(
  "user/fetchCreateUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await postRequestFormData("User/createUser", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
 );

 export const FetchDeleteUser = createAsyncThunk(
  "user/FetchDeleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteRequest(`User/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
 );

  export const fetchUserRoles = createAsyncThunk(
  "user/fetchUserRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequest("User/getAllRoles");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
 );

 const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEditUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEditUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.data = action.payload;
        }
        notification.success({ message: "User updated successfully" });
      })
      .addCase(fetchEditUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notification.error({ message: "Edit user failed" });
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCreateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        notification.success({ message: "User created successfully" });
      })
      .addCase(fetchCreateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notification.error({ message: "Create user failed" });
      })
      .addCase(FetchDeleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchDeleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.id !== action.meta.arg);
        notification.success({ message: "User deleted successfully" });
      })
      .addCase(FetchDeleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notification.error({ message: "Delete user failed" });
      })
      .addCase(fetchUserRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchUserRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default UserSlice;