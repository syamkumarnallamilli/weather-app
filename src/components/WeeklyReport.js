// import Rea

// import React from 'react';
// import { useSelector } from 'react-redux';
// import '../App.css'; // Ensure the correct import

// const WeeklyReport = () => {
//   const weeklyWeather = useSelector((state) => state.weather.weeklyWeather);

//   if (!weeklyWeather || weeklyWeather.length === 0) return null;

//   // Helper function to get the closest forecast to 12:00 PM
//   const getMiddayForecast = (forecasts) => {
//     const midday = 12 * 60 * 60; // 12:00 PM in seconds
//     return forecasts.reduce((closest, forecast) => {
//       const currentHour = new Date(forecast.dt * 1000).getUTCHours();
//       const closestHour = new Date(closest.dt * 1000).getUTCHours();
//       return Math.abs(currentHour - 12) < Math.abs(closestHour - 12) ? forecast : closest;
//     });
//   };

//   // Group forecasts by day
//   const dailyWeather = [];
//   const seenDates = new Set();

//   weeklyWeather.forEach((forecast) => {
//     const date = new Date(forecast.dt * 1000).toDateString();
//     if (!seenDates.has(date)) {
//       seenDates.add(date);
//       const forecastsForDay = weeklyWeather.filter(
//         (f) => new Date(f.dt * 1000).toDateString() === date
//       );
//       dailyWeather.push(getMiddayForecast(forecastsForDay));
//     }
//   });

//   // Function to format the date
//   const formatDate = (timestamp) => {
//     const date = new Date(timestamp * 1000);
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       day: 'numeric',
//       month: 'short',
//     });
//   };

//   return (
//     <div className="weekly-report">
//       {dailyWeather.slice(0, 7).map((day, index) => (
//         <div key={index} className="weekly-report-card">
//           <p>{formatDate(day.dt)}</p>
//           <p>{day.weather[0].description}</p>
//           <p>{Math.round(day.main.temp)}°C</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default WeeklyReport;

import React from 'react';
import { useSelector } from 'react-redux';
import '../App.css'; // Ensure the correct import

const WeeklyReport = () => {
  const weeklyWeather = useSelector((state) => state.weather.weeklyWeather);

  if (!weeklyWeather || weeklyWeather.length === 0) return null;

  // Helper function to get the closest forecast to 12:00 PM
  const getMiddayForecast = (forecasts) => {
    return forecasts.reduce((closest, forecast) => {
      const currentHour = new Date(forecast.dt * 1000).getUTCHours();
      const closestHour = new Date(closest.dt * 1000).getUTCHours();
      return Math.abs(currentHour - 12) < Math.abs(closestHour - 12) ? forecast : closest;
    });
  };

  // Group forecasts by day, excluding today
  const dailyWeather = [];
  const seenDates = new Set();
  const today = new Date().toDateString(); // Get today's date

  weeklyWeather.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000).toDateString();
    if (date !== today && !seenDates.has(date)) {
      seenDates.add(date);
      const forecastsForDay = weeklyWeather.filter(
        (f) => new Date(f.dt * 1000).toDateString() === date
      );
      dailyWeather.push(getMiddayForecast(forecastsForDay));
    }
  });

  // Function to format the date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="weekly-report">
      {dailyWeather.slice(0, Math.min(dailyWeather.length, 7)).map((day, index) => (
        <div key={index} className="weekly-report-card">
          <p>{formatDate(day.dt)}</p>
          <p>{day.weather[0].description}</p>
          <p>{Math.round(day.main.temp)}°C</p>
        </div>
      ))}
    </div>
  );
};

export default WeeklyReport;
