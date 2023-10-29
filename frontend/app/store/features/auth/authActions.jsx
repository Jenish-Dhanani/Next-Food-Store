import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/app/utils/api";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ fname, lname, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await api.post(
        `/api/v1/auth/signup`,
        { fname, lname, email, password },
        config
      );
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const signinUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await api.post(
        `/api/v1/auth/login`,
        { email, password },
        config
      );
      // store user's token in local storage
      const userInfo = { ...data };
      delete userInfo.token;
      if (typeof window !== "undefined") {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }

      return { userToken: data.token, userInfo };
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
