import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./slices/testSlice";
import authSlice from "./slices/authSlice";
import hotelReducer from "./slices/hotelSlice";
import UserSlice from "./slices/userSlice";
import hotelSlice from "./slices/hotelSlice";
import BookingSlice from "./slices/bookingSlice";
import roomSlice from "./slices/roomSlice";
const store = configureStore({
  reducer: {
    testSlice: testSlice.reducer,
    authSlice: authSlice.reducer,
    hotelSlice: hotelSlice.reducer,
    userSlice: UserSlice.reducer,
    BookingSlice: BookingSlice.reducer,
    roomSlice: roomSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
