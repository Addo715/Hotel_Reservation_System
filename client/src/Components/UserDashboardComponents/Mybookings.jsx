import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const MyBookings = () => {
  const location = useLocation();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Load bookings from localStorage on mount
    const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(savedBookings);

    // Update bookings if location.state is present (initial navigation)
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
      // Clear location.state after processing
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleDeleteBooking = (indexToDelete) => {
    setBookings((prevBookings) => {
      const updatedBookings = prevBookings.filter((_, index) => index !== indexToDelete);
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
      return updatedBookings;
    });
  };

  return (
    // <div className="px-4 sm:px-8 md:px-16 lg:px-24 pt-28 pb-20">
    <div>
      <h1 className="text-4xl font-semibold">My Bookings</h1>
      <p className="text-gray-500 text-lg mt-2">
        Easily manage your past, current, and upcoming hotel reservations in one place.
        Plan your trips seamlessly with just a few clicks.
      </p>

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-lg mt-10 text-center">No bookings yet</p>
      ) : (
        <div className="mt-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_0.5fr] gap-4 text-gray-600 font-medium border-b pb-2">
            <p>Hotels</p>
            <p>Date & Timings</p>
            <p>Payment</p>
            <p>Actions</p> {/* New column for delete action */}
          </div>

          {bookings.map((booking, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_0.5fr] gap-4 items-center border-b border-gray-200 pb-6"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={booking.image}
                  alt={booking.name}
                  className="w-32 h-24 object-cover rounded-lg shadow-sm"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {booking.name} <span className="text-gray-500 text-sm">({booking.roomType})</span>
                  </h3>
                  <p className="text-gray-500 text-sm flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      />
                    </svg>
                    {booking.address}
                  </p>
                  <p className="text-gray-500 text-sm">Guests: {booking.guests || 1}</p>
                  <p className="text-gray-700 font-medium mt-1">Total: ${booking.total}</p>
                </div>
              </div>

              <div className="text-gray-700 text-sm space-y-1">
                <p>
                  <span className="text-gray-600 font-medium">Check-In:</span>{" "}
                  {new Date(booking.checkIn).toDateString()}
                </p>
                <p>
                  <span className="text-gray-600 font-medium">Check-Out:</span>{" "}
                  {new Date(booking.checkOut).toDateString()}
                </p>
              </div>

              <div className="flex items-center justify-between md:justify-start gap-4">
                <span
                  className={`text-sm font-semibold flex items-center ${
                    booking.status === "Paid" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full mr-2 ${
                      booking.status === "Paid" ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  {booking.status}
                </span>

                {booking.status === "Unpaid" && (
                  <Link
                    to="/payment"
                    state={{ booking }}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition"
                  >
                    Pay Now
                  </Link>
                )}
              </div>

              {/* Delete Action */}
              <div>
                <button
                  onClick={() => handleDeleteBooking(index)}
                  className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;