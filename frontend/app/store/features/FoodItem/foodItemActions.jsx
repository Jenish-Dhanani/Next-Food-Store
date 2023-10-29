import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/app/utils/api";

export const foodItems = createAsyncThunk(
  "fooditem/list",
  async (id, { rejectWithValue, getState }) => {
    const { auth, foodItem } = getState();
    const { searchQuery } = foodItem; // Get searchQuery from Redux state
    console.log({ auth, foodItems });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let url;
      if (id) {
        url = `/api/v1/food/by-restaurant/${id}`;
      } else {
        url = `/api/v1/food/`;
      }

      // Append searchQuery as a query parameter
      if (searchQuery) {
        url += `?search=${encodeURIComponent(searchQuery)}`;
      }

      const { data } = await api.get(url, config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const foodItemCreate = createAsyncThunk(
  "fooditem/create",
  async (payload, { rejectWithValue, getState }) => {
    const { auth } = getState();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const url = `/api/v1/food/`;

      const { data } = await api.post(url, payload, config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const foodItemEdit = createAsyncThunk(
  "fooditem/edit",
  async (payload, { rejectWithValue, getState }) => {
    const { auth } = getState();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const url = `/api/v1/food/${payload.id}`;

      const { data } = await api.put(url, payload.data, config);
      console.log(data);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const foodItemDelete = createAsyncThunk(
  "fooditem/delete",
  async (payload, { rejectWithValue, getState }) => {
    const { auth } = getState();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const url = `/api/v1/food/${payload}`;

      const { data } = await api.delete(url, {}, config);
      console.log(data);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
