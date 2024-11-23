import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./slices/testSlice";
import authSlice from "./slices/authSlice";
import UserSlice from "./slices/userSlice";
import hotelSlice from "./slices/hotelSlice";
import BookingSlice from "./slices/bookingSlice";
import contactSlice from "./slices/contactSlice";
import roomSlice from "./slices/roomSlice";
import roomDetailSlice from "./slices/roomDetailSlice";
import bedSlice from "./slices/bedSlice";
const store = configureStore({
  reducer: {
    testSlice: testSlice.reducer,
    authSlice: authSlice.reducer,
    hotelSlice: hotelSlice.reducer,
    userSlice: UserSlice.reducer,
    BookingSlice: BookingSlice.reducer,
    contactSlice: contactSlice.reducer,
    roomSlice: roomSlice.reducer,
    roomDetailSlice: roomDetailSlice.reducer,
    bedSlice: bedSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
