import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeatherData, fetchWeeklyWeather } from '../store/weatherSlice';

const CitySelector = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();

  const searchCity = () => {
    dispatch(fetchWeatherData(city));
    dispatch(fetchWeeklyWeather(city));
  };

  return (
    <div className="city-selector">
      <input 
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={searchCity}>Get Weather</button>
    </div>
  );
};

export default CitySelector;
