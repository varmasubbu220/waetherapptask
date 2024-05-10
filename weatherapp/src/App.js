import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './authpages/login';
import WeatherForeCast from './components/weatherforecast';
import UserManager from './components/userManagement';
import RecentForecast from './components/recentforecast';
import CityForecast from './components/cityforecast';
function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/hourly" element={<WeatherForeCast/>} />
          <Route path="/users" element={<UserManager/>} />
          <Route path="/temperature" element={<RecentForecast/>} />
          <Route path="/home" element={<CityForecast/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
