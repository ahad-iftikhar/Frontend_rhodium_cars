import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import carsReducer from "./carSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    cars: carsReducer,
    auth: authReducer,
  },
});
