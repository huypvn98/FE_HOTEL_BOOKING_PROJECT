import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postRequest } from "../../services/httpMethods";
import { notification } from "antd";
const initialState = {
    loading: false,
    error: null,
};

export const fetchCreateContact = createAsyncThunk(
    "contact/fetchContact",
    async (payload, { rejectWithValue }) => {
        try {
            const { FullName, PhoneNumber, EmailAddress } = payload;
            const url = `Contact/createContact?FullName=${encodeURIComponent(FullName)}&PhoneNumber=${encodeURIComponent(PhoneNumber)}&EmailAddress=${encodeURIComponent(EmailAddress)}`;
            const response = await postRequest(url, {});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateContact.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCreateContact.fulfilled, (state, action) => {
                state.loading = false;
                state.contact = action.payload;
                notification.success({ message: "Contact created successfully" });
            })
            .addCase(fetchCreateContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                notification.error({ message: "Failed to create contact" });
            });
    },
});
export default contactSlice;