import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './authpages/login';


// import Home from './components/Home';
// import Dashboard from './components/Dashboard';
// import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
