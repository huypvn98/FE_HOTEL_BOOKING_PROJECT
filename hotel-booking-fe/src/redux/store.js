import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./slices/testSlice";

const store = configureStore({
    reducer: {
      testSlice:testSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  
  export default store;