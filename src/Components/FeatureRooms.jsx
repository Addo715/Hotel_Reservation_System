import React from 'react';
import { roomsDummyData } from '../assets/assets';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';

const FeatureRooms = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="mx-4 sm:mx-[10%]">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold pt-7 sm:pt-10">Our Featured Rooms</h1>
          <p className="text-base text-gray-600 max-w-xl mx-auto mt-2">
            Explore our top rated rooms carefully selected for comfort, style, and convenience. Book your stay with just a few clicks.
          </p>
        </div>

        {/* Featured Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {roomsDummyData.slice(0, 3).map((room) => (
            <Link key={room._id} to={`/rooms/${room._id}`} className="block">
              <div className="shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition">
                <img
                  src={room.images[0]}
                  alt={room.roomType}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{room.name}</h2>
                  <p className="text-sm text-gray-500">{room.address}</p>
                  <p className="text-md pt-2">{room.roomType}</p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-600">${room.pricePerNight} / night</p>
                    <button className="bg-white cursor-pointer text-blue-600 font-semibold border border-blue-600 px-4 py-2 hover:bg-blue-50 transition">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Rooms Button */}
        <div className="flex justify-center mt-10 pb-10">
          <Link to="/rooms">
            <button className="flex items-center cursor-pointer gap-2 bg-white text-blue-600 font-semibold border border-blue-600 px-4 py-2 hover:bg-blue-50 transition">
              View All Rooms <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureRooms;