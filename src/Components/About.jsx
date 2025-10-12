import React from "react";
import HeroImage3 from "../assets/HeroImage3.jpg"; // Large image
import HeroImage2 from "../assets/HeroImage2.jpg"; // Smaller overlapping image
import { FaArrowRight } from "react-icons/fa6";

const About = () => {
  return (
    <div className="w-full py-16 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Left side: Images with overlap */}
        <div className="relative w-full lg:w-1/2 flex justify-center">
          {/* Large image: wider and shorter on small screens */}
          <img
            src={HeroImage3}
            alt="Hotel Lobby"
            className="rounded-lg shadow-lg w-full max-w-md h-64 md:w-[350px] md:h-[400px] object-cover"
          />
          {/* Smaller image hidden on small screens */}
          <img
            src={HeroImage2}
            alt="Hotel Room"
            className="rounded-lg shadow-lg w-[300px] md:w-[350px] h-[250px] object-cover absolute top-[220px] left-[200px] md:left-[180px] border-4 border-white hidden md:block"
          />
        </div>

        {/* Right side: Text */}
        {/* Right side: Text */}
        <div className="w-full lg:w-1/2">
          <p className="text-sm text-gray-500 mb-2">About Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Effortless Hotel <br /> Reservation Experience
          </h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            Our hotel reservation system makes it easy for you to search,
            compare, and book top rated hotels across the globe. Whether you're
            traveling for business or leisure, we ensure a seamless and secure
            booking process.
          </p>

          <p className="text-gray-600 mb-6 leading-relaxed">
            From budget friendly stays to luxury suites, manage your entire
            booking journey in one place all with real time availability,
            instant confirmation, and flexible payment options.
          </p>

          <ul className="text-gray-700 space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              Real time room availability and instant booking
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              Secure online payment and booking confirmation
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              24/7 customer support and easy cancellation
            </li>
          </ul>

          {/* <button className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition font-semibold">
    DISCOVER MORE
  </button> */}

          {/* <button className="flex gap-2 bg-white items-center text-blue-600 font-semibold border border-blue-600 px-4 py-2 hover:bg-blue-50 transition cursor-pointer">
      Discover More<FaArrowRight />
    </button> */}
        </div>
      </div>
    </div>
  );
};

export default About;
