// import React from 'react';
// import { roomsDummyData } from '../assets/assets';
// import { Link } from 'react-router-dom';
// import { FaArrowRight } from 'react-icons/fa6';

// const FeatureRooms = () => {
//   return (
//     <div className="bg-gray-100 py-10">
//       <div className="mx-4 sm:mx-[10%]">
//         {/* Header */}
//         <div className="text-center">
//           <h1 className="text-3xl font-bold pt-7 sm:pt-10">Our Featured Rooms</h1>
//           <p className="text-base text-gray-600 max-w-xl mx-auto mt-2">
//             Explore our top rated rooms carefully selected for comfort, style, and convenience. Book your stay with just a few clicks.
//           </p>
//         </div>

//         {/* Featured Rooms Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
//           {roomsDummyData.slice(0, 3).map((room) => (
//             <Link key={room._id} to={`/rooms/${room._id}`} className="block">
//               <div className="shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition">
//                 <img
//                   src={room.images[0]}
//                   alt={room.roomType}
//                   className="w-full h-60 object-cover"
//                 />
//                 <div className="p-4">
//                   <h2 className="text-xl font-semibold">{room.name}</h2>
//                   <p className="text-sm text-gray-500">{room.address}</p>
//                   <p className="text-md pt-2">{room.roomType}</p>
//                   <div className="flex justify-between items-center mt-4">
//                     <p className="text-gray-600">${room.pricePerNight} / night</p>
//                     <button className="bg-white cursor-pointer text-blue-600 font-semibold border border-blue-600 px-4 py-2 hover:bg-blue-50 transition">
//                       Book Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* View All Rooms Button */}
//         <div className="flex justify-center mt-10 pb-10">
//           <Link to="/rooms">
//             <button className="flex items-center cursor-pointer gap-2 bg-white text-blue-600 font-semibold border border-blue-600 px-4 py-2 hover:bg-blue-50 transition">
//               View All Rooms <FaArrowRight />
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeatureRooms;

import React, { useState, useEffect } from 'react';
import { roomsDummyData } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';

const FeatureRooms = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("access");
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!token && !!user);
  }, []);

  // Handle protected actions
  const handleProtectedAction = (e, path) => {
    if (!isAuthenticated) {
      e.preventDefault(); // Prevent navigation
      showToastNotification();
    } else {
      // If authenticated, navigate to the path
      navigate(path);
    }
  };

  // Show toast notification
  const showToastNotification = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Hide after 3 seconds
  };

  return (
    <div className="bg-gray-100 py-10 relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3 animate-bounce">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
          <span className="font-medium">
            Please{' '}
            <button 
              onClick={() => navigate('/signup')}
              className="underline font-bold hover:text-gray-200"
            >
              Login or Sign Up
            </button>
            {' '}to continue
          </span>
        </div>
      )}

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
            <div key={room._id} className="block">
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
                    <Link to={`/rooms/${room._id}`}>
                      <button 
                        onClick={(e) => handleProtectedAction(e, `/rooms/${room._id}`)}
                        className="bg-white cursor-pointer text-blue-600 font-semibold border border-blue-600 px-4 py-2 hover:bg-blue-50 transition"
                      >
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Rooms Button */}
        <div className="flex justify-center mt-10 pb-10">
          <Link to="/rooms">
            <button 
              onClick={(e) => handleProtectedAction(e, '/rooms')}
              className="flex items-center cursor-pointer gap-2 bg-white text-blue-600 font-semibold border border-blue-600 px-4 py-2 hover:bg-blue-50 transition"
            >
              View All Rooms <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureRooms;
