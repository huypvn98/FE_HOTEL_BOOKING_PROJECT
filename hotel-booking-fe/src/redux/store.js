import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./slices/testSlice";
import authSlice from "./slices/authSlice";
import hotelReducer from "./slices/hotelSlice";
import UserSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    testSlice: testSlice.reducer,
    authSlice: authSlice.reducer,
    hotel: hotelReducer,
    userSlice: UserSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;