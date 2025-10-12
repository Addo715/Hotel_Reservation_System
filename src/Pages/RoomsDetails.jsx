import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { roomsDummyData, facilityIcons } from "../assets/assets";

const RoomsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = roomsDummyData.find((room) => room._id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!room) {
    return (
      <div className="text-center py-20 px-4 sm:px-8 md:px-16 lg:px-24">
        <p className="text-gray-500 text-lg">Room not found</p>
        <Link to="/rooms" className="text-blue-600 hover:underline">
          Back to All Rooms
        </Link>
      </div>
    );
  }

  const handleBookNow = () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select both check-in and check-out dates");
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      toast.error("Check-in date cannot be in the past");
      return;
    }

    if (checkOutDate <= checkInDate) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    const bookingData = {
      roomId: room._id,
      name: room.name,
      address: room.address,
      city: room.city || "New York",
      pricePerNight: room.pricePerNight,
      roomType: room.roomType,
      image: room.images[0],
      checkIn,
      checkOut,
      total: room.pricePerNight * Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)),
      status: "Unpaid",
      bookingDate: new Date().toISOString(),
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    existingBookings.push(bookingData);
    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    toast.success("Room added to your bookings!", {
      duration: 4000, // Changed from 3000 to 4000 for 4 seconds
      position: "top-center",
      icon: "✅",
    });

    // Clear the form
    setCheckIn("");
    setCheckOut("");

    // Removed navigate("/my-bookings") to stay on the current page
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 pt-28 pb-20">
      <Toaster />
      <h1 className="text-3xl font-bold">{room.name}</h1>
      <p className="text-gray-500 text-sm">{room.address}</p>
      <p className="text-gray-500 text-sm">{room.city || "New York"}</p>

      <div className="mt-4">
        <div className="w-full">
          <img
            src={room.images[selectedImage]}
            alt={`${room.roomType} large`}
            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-4 overflow-x-auto">
          {room.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                selectedImage === index ? "border-blue-600" : "border-transparent"
              }`}
            >
              <img
                src={image}
                alt={`${room.roomType} thumbnail ${index + 1}`}
                className="w-full h-full object-cover cursor-pointer"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xl font-semibold">${room.pricePerNight} / night</p>
        <p className="text-gray-600 text-md mt-2">{room.roomType}</p>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Amenities</h2>
          <div className="flex flex-wrap gap-3 mt-2">
            {room.amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
              >
                <img src={facilityIcons[amenity]} alt={amenity} className="w-4 h-4" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-gray-600 text-sm mb-1">Check-in</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm mb-1">Check-out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn || new Date().toISOString().split("T")[0]}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          onClick={handleBookNow}
          className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Book Now
        </button>
      </div>

      <div className="mt-6">
        <Link to="/my-bookings" className="text-blue-600 hover:underline inline-flex items-center gap-2">
          View My Bookings →
        </Link>
      </div>
    </div>
  );
};

export default RoomsDetails;