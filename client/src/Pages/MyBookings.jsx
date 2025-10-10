import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const MyBookings = () => {
  const location = useLocation();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Initialize with existing bookings from location.state if available
    if (location.state) {
      setBookings((prevBookings) => {
        const isDuplicate = prevBookings.some(
          (booking) =>
            booking.roomId === location.state.roomId &&
            booking.checkIn === location.state.checkIn &&
            booking.checkOut === location.state.checkOut
        );
        if (!isDuplicate) {
          return [...prevBookings, location.state];
        }
        return prevBookings;
      });
    }
    // Reset location.state to avoid re-adding on navigation
    window.history.replaceState({}, document.title);
  }, [location.state]);

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 pt-28 pb-20">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      <p className="text-gray-500 text-md mt-2">
        Easily manage your past, current, and upcoming hotel reservations in one place. Plan
        your trips seamlessly with just a few clicks
      </p>

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-lg mt-10 text-center">No bookings yet</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex items-start">
                <img
                  src={booking.image}
                  alt={`${booking.roomType} image`}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{booking.name}</h3>
                  <p className="text-gray-500 text-sm">{booking.address}</p>
                  <p className="text-gray-500 text-sm">{booking.city}</p>
                  <p className="text-gray-600 text-sm">Total: ${booking.total}</p> {/* Display total */}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Check-In:</p>
                  <p>{new Date(booking.checkIn).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Check-Out:</p>
                  <p>{new Date(booking.checkOut).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`text-sm font-medium ${
                    booking.status === "Paid" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {booking.status}
                </span>
                {booking.status === "Unpaid" && (
                  <Link
                    to="/payment"
                    state={{ booking }} // Pass booking data to payment page
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    Pay Now
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;