import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
// import NewNavbar from './Components/NewNavbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import AllRooms from './Pages/AllRooms';
import RoomsDetails from './Pages/RoomsDetails';
import AdminPage from './Pages/Admin/AdminPage';
import UserSignup from './Pages/UserSignup';
import AdminSignup from './Pages/Admin/AdminSignup';
import UserDashboardPage from './Pages/Userdashboard/UserDashboardPage';
import { Toaster } from 'react-hot-toast';
import NewNavbar from './Components/UserDashboardComponents/NewNavbar';

const App = () => {
  const location = useLocation();

  // Hide Navbar for admin and signup pages
  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/signup");

  // Hide Footer for admin, signup, and my-bookings pages
  const hideFooter =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/signup") ||
    location.pathname.startsWith("/my-bookings");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Toaster */}
      <Toaster 
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 3000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {!hideNavbar && <NewNavbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomsDetails />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/adminsignup" element={<AdminSignup />} />
          <Route path="/my-bookings" element={<UserDashboardPage />} />
        </Routes>
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
};

export default App;
