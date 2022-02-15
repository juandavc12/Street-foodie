import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { LocationProvider } from './context/LocationContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Map from './pages/Map';

function App() {
  return (
    <BrowserRouter>
      <LocationProvider>
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Map />} path="/map" />
          <Route element={<Login />} path="/login" />
        </Routes>
      </LocationProvider>
    </BrowserRouter>
  );
}

export default App;
