import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './authpages/login';
import WeatherForeCast from './components/weatherforecast';
function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<WeatherForeCast/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
