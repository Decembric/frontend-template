import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://back-inter-mafia.onrender.com/api/water";

export const fetchWaterData = async (type, date) => {
  try {
    const endpoint = type === "month" ? "/month" : "/day";
    const url = `${BASE_URL}${endpoint}`;

    const response = await axios.get(url, {
      params: { date },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      `Не вдалося отримати дані по ${type}. Помилка: ${error.message}`
    );
  }
};

export const getWaterAmount = createAsyncThunk(
  "water/waterAmount",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get("/");
      return data.amount;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
