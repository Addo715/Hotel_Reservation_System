import React from "react";
import { FaMapMarkerAlt, FaBed, FaUmbrellaBeach } from "react-icons/fa";
import { MdHotel } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import hero from '../assets/Hero.jpg';
import { Link } from "react-router-dom";
import FormsField from "./FormsField";

const Hero = () => {
  return (
    <div className="relative">
      <div
        className="bg-cover bg-center h-screen flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 0, 58, 0.7), rgba(10, 0, 58, 0.7)), url(${hero})`,
        }}
      >
        {/* Added pt-20 for small screens to create space below navbar */}
        <div className="relative z-10 px-6 md:px-16 lg:px-24 xl:px-32 text-white m-5 pt-18 sm:pt-0">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 max-w-4xl leading-tight">
            Find & Book <br />
            Your Perfect Stay
          </h1>

          {/* Hide this icons row on small screens */}
          <div className="hidden sm:flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-300">
            <p className="border-r border-blue-500 pr-3 sm:pr-4 flex items-center gap-1">
              <FaMapMarkerAlt /> Popular Locations
            </p>
            <p className="border-r border-blue-500 pr-3 sm:pr-4 flex items-center gap-1">
              <FaBed /> Comfortable Rooms
            </p>
            <p className="border-r border-blue-500 pr-3 sm:pr-4 flex items-center gap-1">
              <MdHotel /> Luxury Hotels
            </p>
            <p className="flex items-center gap-1">
              <FaUmbrellaBeach /> Holiday Deals
            </p>
          </div>

          {/* Hide paragraph and button on small screens */}
          <div>
            <p className="hidden sm:block text-md text-gray-400 max-w-md leading-snug mt-5">
              Explore top-rated hotels, resorts, and vacation stays around the world. 
              Plan your perfect getaway with seamless booking and great deals.
            </p>

            <Link to='/signup'>
              <div className="mt-4 hidden sm:block">
                <button className="flex items-center gap-2 bg-white text-blue-600 font-semibold border border-blue-600 px-4 py-2 rounded-full hover:bg-red-50 transition cursor-pointer">
                  Book Now <FaArrowRight />
                </button>
              </div>
            </Link>
          </div>

          {/* FormsField */}
          <div className="mt-6">
            <FormsField />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
