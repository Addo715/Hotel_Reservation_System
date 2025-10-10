import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import AllRooms from './Pages/AllRooms';
import RoomsDetails from './Pages/RoomsDetails';
import AdminPage from './Pages/Admin/AdminPage';
import UserSignup from './Pages/UserSignup';
import AdminSignup from './Pages/Admin/AdminSignup';
import MyBookings from './Pages/MyBookings';

const App = () => {
  const location = useLocation();

  // Hide Navbar & Footer for admin and signup pages
  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/signup");

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Navbar />} {/* Hide for admin & signup */}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomsDetails />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path='/adminsignup' element={<AdminSignup/>}/>
          <Route path='/my-bookings' element={<MyBookings/>}/>
        </Routes>
      </main>

      {!hideLayout && <Footer />} {/* Hide for admin & signup */}
    </div>
  );
};

export default App;
