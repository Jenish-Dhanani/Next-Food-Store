"use client";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import restaurantSlice from "./features/restaurant/restaurantSlice";
import foodItemSlice from "./features/FoodItem/foodItemSlice";
import cartSlice from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    restaurant: restaurantSlice,
    foodItem: foodItemSlice,
    cart: cartSlice,
  },
});
