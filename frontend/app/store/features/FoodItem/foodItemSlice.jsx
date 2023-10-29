"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";
import {
  foodItemCreate,
  foodItemDelete,
  foodItemEdit,
  foodItems,
} from "./foodItemActions";

const initialState = {
  loading: false,
  foodItems: [],
  error: null,
  AddItemSuccess: false, // for create and update food item
  EditItemSuccess: false,
  DeleteItemSuccess: false,
  searchQuery: "",
};

const foodItemSlice = createSlice({
  name: "fooditem",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetSuccess: (state, action) => {
      state.AddItemSuccess = false;
      state.EditItemSuccess = false;
      state.DeleteItemSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(foodItems.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(foodItems.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.foodItems = payload;
    });

    builder.addCase(foodItems.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(foodItemCreate.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(foodItemCreate.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.AddItemSuccess = true;
    });
    builder.addCase(foodItemCreate.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(foodItemEdit.pending, (state, { payload }) => {
      // state.loading = true;
      state.error = null;
    });
    builder.addCase(foodItemEdit.fulfilled, (state, { payload }) => {
      // state.loading = false;
      state.EditItemSuccess = true;
      const index = state.foodItems.findIndex(
        (item) => item._id === payload._id
      );

      if (index !== -1) {
        state.foodItems[index] = payload;
      } else {
        state.foodItems.push(payload);
      }
    });
    builder.addCase(foodItemEdit.rejected, (state, { payload }) => {
      // state.loading = false;
      state.error = payload;
    });

    //delete
    builder.addCase(foodItemDelete.pending, (state, { payload }) => {
      // state.loading = true;
      state.error = null;
    });
    builder.addCase(foodItemDelete.fulfilled, (state, { payload }) => {
      // state.loading = false;
      state.DeleteItemSuccess = true;
      const index = state.foodItems.findIndex(
        (item) => item._id === payload._id
      );

      console.log(payload);
      if (index !== -1) {
        state.foodItems.splice(index, 1);
      }
    });
    builder.addCase(foodItemDelete.rejected, (state, { payload }) => {
      // state.loading = false;
      state.error = payload;
    });
  },
});

export const { setSearchQuery, resetSuccess } = foodItemSlice.actions;

export default foodItemSlice.reducer;
