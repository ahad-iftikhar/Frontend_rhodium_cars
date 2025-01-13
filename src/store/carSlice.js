import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cars: [],
  loading: false,
  error: null,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
    addCar: (state, action) => {
      state.cars.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCars, addCar, setLoading, setError } = carsSlice.actions;
export default carsSlice.reducer;
