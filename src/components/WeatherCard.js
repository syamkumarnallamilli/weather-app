


import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faSnowflake, faBolt, faSmog, faCloudShowersHeavy, faTint, faEye,faWind } from '@fortawesome/free-solid-svg-icons';
import '../App.css'; // Ensure your styles are correctly imported

const WeatherCard = () => {
  const weather = useSelector((state) => state.weather.currentWeather);

  if (!weather) return null;

  // Define the background images based on the weather conditions
  const backgroundMap = {
    Clear: '/images/clear-sky.gif',
    Clouds: '/images/cloudy.gif',
    Rain: '/images/rain.gif',
    Snow: '/images/snowy.gif',
    Thunderstorm: '/images/thunderstorm.gif',
    Drizzle: '/images/drizzle.gif',
    Mist: '/images/mist.gif',
    Haze: '/images/haze.jpg',
  };

  const weatherIcons = {
    Clear: faSun,
    Clouds: faCloud,
    Rain: faCloudShowersHeavy,
    Snow: faSnowflake,
    Thunderstorm: faBolt,
    Drizzle: faCloudRain,
    Mist: faSmog,
    Haze: faSmog,
  };

  const iconColors = {
    Clear: '#FFD700', // Gold
    Clouds: '#B0C4DE', // Light Steel Blue
    Rain: '#4682B4', // Steel Blue
    Snow: '#00BFFF', // Deep Sky Blue
    Thunderstorm: '#A9A9A9', // Dark Gray
    Drizzle: '#ADD8E6', // Light Blue
    Mist: '#708090', // Slate Gray
    Haze: '#D3D3D3', // Light Gray
  };

  const weatherCondition = weather.weather[0].main;
  const bgImage = backgroundMap[weatherCondition] || '/images/default.jpg';
  const weatherIcon = weatherIcons[weatherCondition] || faCloud; // Default icon for unspecified weather conditions
  
  // Convert Unix timestamp to human-readable date
  const date = new Date(weather.dt * 1000).toLocaleDateString();

  // Extracting visibility (in meters, convert to kilometers)
  const visibility = weather.visibility / 1000;

  // Example for precipitation (if available)
  const precipitation = weather.rain ? weather.rain["1h"] : 0; // Precipitation over the past 1 hour

  return (
    <div 
      className="weather-card" 
      style={{ 
        backgroundImage: `url(${bgImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        animation: 'fadeIn 1.5s ease-in-out'
      }}
    >
      <div className='inside-card'>
      {/* City Name */}
      <h2>{weather.name}</h2>

      {/* Date */}
      <p>{date}</p
      >

      {/* Weather Description with FontAwesome icon */}
      <h3>
        <FontAwesomeIcon icon={weatherIcon} /> {weather.weather[0].description}
      </h3>

      {/* Temperature */}
      <p>
        <FontAwesomeIcon icon /> Temperature: {Math.round(weather.main.temp)}°C
      </p>

      {/* Humidity */}
      <p>
        <FontAwesomeIcon icon={faTint} /> Humidity: {weather.main.humidity}%
      </p>

      {/* Wind Speed */}
      <p>
        <FontAwesomeIcon icon={faWind} /> Wind Speed: {weather.wind.speed} m/s
      </p>

      {/* Visibility */}
      <p>
        <FontAwesomeIcon icon={faEye} /> Visibility: {visibility} km
      </p>

      {/* Precipitation */}
      <p>
        <FontAwesomeIcon icon={faCloudRain} /> Precipitation: {precipitation} mm
      </p>
      </div>
    </div>
  );
};

export default WeatherCard;
