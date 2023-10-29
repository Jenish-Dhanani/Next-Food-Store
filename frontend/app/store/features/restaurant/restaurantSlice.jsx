"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";
import { restaurantList, restaurantView } from "./restaurantActions";

const initialState = {
  loading: false,
  restaurants: [],
  error: null,
  selectedRestaurant: null,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(restaurantList.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(restaurantList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.restaurants = payload;
    });

    builder.addCase(restaurantList.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(restaurantView.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(restaurantView.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.selectedRestaurant = payload;
    });

    builder.addCase(restaurantView.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const {} = restaurantSlice.actions;

export default restaurantSlice.reducer;
