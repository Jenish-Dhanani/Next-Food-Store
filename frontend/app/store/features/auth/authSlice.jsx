"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";
import { registerUser, signinUser } from "./authActions";

let userToken = null;
let userInfo = null;
// initialize userToken from local storage
if (typeof window !== "undefined") {
  userToken = localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : null;
  userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
}

const initialState = {
  loading: false,
  userInfo, // for user object
  userToken, // for storing the JWT
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.userToken = null;
      state.userInfo = null;
      localStorage.removeItem("userToken");
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(signinUser.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signinUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.userToken = payload.userToken;
      state.userInfo = payload.userInfo;
    });

    builder.addCase(signinUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
