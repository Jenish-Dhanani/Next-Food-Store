import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/app/utils/api";

export const restaurantList = createAsyncThunk(
  "restaurant/list",
  async (_, { rejectWithValue, getState }) => {
    const { auth } = getState();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.userToken}`,
        },
      };
      const { data } = await api.get(`/restaurant/`, config);
      return data;
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

export const restaurantView = createAsyncThunk(
  "restaurant/view",
  async (id, { rejectWithValue, getState }) => {
    const { auth } = getState();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.userToken}`,
        },
      };
      const { data } = await api.get(`/restaurant/${id}`, config);
      return data;
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
