import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditProfile from './components/EditProfile';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { LocationProvider } from './context/LocationContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Map from './pages/Map';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <LocationProvider>
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Map />} path="/map" />
          <Route element={<Login />} path="/login" />
          <Route element={<Profile />} path="/profile" />
          <Route element={<EditProfile />} path="/profile/editprofile" />
        </Routes>
        <Footer />
      </LocationProvider>
    </BrowserRouter>
  );
}

export default App;
