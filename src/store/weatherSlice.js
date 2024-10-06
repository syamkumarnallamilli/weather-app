import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = 'a5c4eb4240c63392b04546c1b107206b';
const baseUrl = 'https://api.openweathermap.org/data/2.5/';

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city) => {
    const response = await axios.get(
      `${baseUrl}weather?q=${city}&units=metric&appid=${apiKey}`
    );
    return response.data;
  }
);

export const fetchWeeklyWeather = createAsyncThunk(
  'weather/fetchWeeklyWeather',
  async (city) => {
    const response = await axios.get(
      `${baseUrl}forecast?q=${city}&units=metric&appid=${apiKey}`
    );
    return response.data;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentWeather: null,
    weeklyWeather: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.currentWeather = action.payload;
      })
      .addCase(fetchWeeklyWeather.fulfilled, (state, action) => {
        state.weeklyWeather = action.payload.list;
      });
  },
});

export default weatherSlice.reducer;
