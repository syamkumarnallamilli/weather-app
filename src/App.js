


// import React from 'react';
// import CitySelector from './components/CitySelector';
// import WeatherCard from './components/WeatherCard';
// import WeeklyReport from './components/WeeklyReport';
// import './App.css';

// function App() {
//   return (
//     <div className="app">
//       <header className="app-header">
       
//       </header>
//       <main>
//         <CitySelector />
//         <WeatherCard />
//         <WeeklyReport />
//       </main>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import CitySelector from './components/CitySelector';
import WeatherCard from './components/WeatherCard';
import WeeklyReport from './components/WeeklyReport';
import './App.css';

function App() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        {/* You can add additional responsive elements here */}
      </header>
      <main>
        <CitySelector />
        <WeatherCard />
        <WeeklyReport />
      </main>
      {/* Example of using viewport width to adjust styles or content */}
      {viewportWidth < 600 }
    </div>
  );
}

export default App;


