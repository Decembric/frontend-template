import { createSlice } from "@reduxjs/toolkit";
import {
  addWaterItem,
  deleteWaterItem,
  fetchWaterData,
  fetchWaterItems,
  getWaterData,
  postWaterData,
} from "./operations";

const today = new Date().toLocaleDateString("en-CA"); // дата локальна, (YYYY-MM-DD)

const INITIAL_STATE = {
  items: [{ _id: 0, amount: 0, date: 0 }],
  daysDrinking: [], // Дані про дні пиття води за місяць
  dayDetails: [], // Деталі пиття води за конкретний день
  chosenDate: today,
  chosenMonth: today.slice(0, 7), // Обраний місяць (YYYY-MM)
  loading: false, // Стан завантаження
  error: null, // Помилки
};

const waterSlice = createSlice({
  name: "water",
  initialState: INITIAL_STATE,
  reducers: {
    setChosenMonth(state, action) {
      state.chosenMonth = action.payload;
    },
    setChosenDate(state, action) {
      state.chosenDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWaterData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        // Розподіл даних за місяцем або днем
        if (action.meta.arg.type === "month") {
          state.daysDrinking = action.payload.data; // Дані за місяць
        } else if (action.meta.arg.type === "day") {
          state.dayDetails = action.payload.data; // Дані за день
        }
        // console.log(action.payload.data);
      })
      .addCase(fetchWaterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchWaterItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWaterItems.fulfilled, (state, action) => {
        (state.loading = false), (state.items = action.payload);
      })
      .addCase(fetchWaterItems.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(addWaterItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addWaterItem.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addWaterItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteWaterItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWaterItem.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteWaterItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(editWaterItem.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(editWaterItem.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.error = null;
      // })
      // .addCase(editWaterItem.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // });
      .addCase(getWaterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWaterData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (Array.isArray(action.payload)) {
          state.items = action.payload;
        } else {
          console.error(action.payload);
        }
      })
      .addCase(getWaterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postWaterData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postWaterData.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      });
  },
});

export const { setChosenMonth, setChosenDate } = waterSlice.actions;
export const waterReducer = waterSlice.reducer;
