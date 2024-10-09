import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./slices/testSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    testSlice: testSlice.reducer,
    authSlice: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
