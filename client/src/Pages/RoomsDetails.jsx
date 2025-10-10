import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { roomsDummyData, facilityIcons } from '../assets/assets';

const RoomsDetails = () => {
  const { id } = useParams();
  const room = roomsDummyData.find((room) => room._id === id);
  const [selectedImage, setSelectedImage] = useState(0); // Track selected image

  // Scroll to top when this page loads
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

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 pt-28 pb-20">
      {/* Room Header */}
      <h1 className="text-3xl font-bold">{room.name}</h1>
      <p className="text-gray-500 text-sm">{room.address}</p>
      <p className="text-gray-500 text-sm">{room.city || 'New York'}</p>

      {/* Room Images */}
      <div className="mt-4">
        {/* Large Image */}
        <div className="w-full">
          <img
            src={room.images[selectedImage]}
            alt={`${room.roomType} large`}
            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
          />
        </div>

        {/* Thumbnail Images */}
        <div className="flex flex-wrap gap-2 mt-4 overflow-x-auto">
          {room.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                selectedImage === index ? 'border-blue-600' : 'border-transparent'
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

      {/* Room Details */}
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
                <img
                  src={facilityIcons[amenity]}
                  alt={amenity}
                  className="w-4 h-4"
                />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <div className="mt-6">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default RoomsDetails;
