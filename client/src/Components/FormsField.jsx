// import React from 'react';

// const FormsField = () => {
//   return (
//     <form className='bg-white text-gray-500 rounded-lg px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-end gap-4 md:gap-6 w-full max-w-4xl'>

//       {/* Room Type */}
//       <div className="w-full md:w-auto flex-1">
//         <div className='flex items-center gap-2'>
//           <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
//           </svg>
//           <label htmlFor="roomType">Room Type</label>
//         </div>
//         <select
//           id="roomType"
//           className="rounded border border-gray-200 px-3 py-2 mt-1 text-sm outline-none w-full"
//           required
//         >
//           <option value="">Select room type</option>
//           <option value="single-bed">Single Bed</option>
//           <option value="double-bed">Double Bed</option>
//           <option value="family-suite">Family Suite</option>
//         </select>
//       </div>

//       {/* Check In */}
//       <div className="w-full md:w-auto flex-1">
//         <div className='flex items-center gap-2'>
//           <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
//           </svg>
//           <label htmlFor="checkIn">Check in</label>
//         </div>
//         <input
//           id="checkIn"
//           type="date"
//           className="rounded border border-gray-200 px-3 py-2 mt-1 text-sm outline-none w-full"
//         />
//       </div>

//       {/* Check Out */}
//       <div className="w-full md:w-auto flex-1">
//         <div className='flex items-center gap-2'>
//           <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
//           </svg>
//           <label htmlFor="checkOut">Check out</label>
//         </div>
//         <input
//           id="checkOut"
//           type="date"
//           className="rounded border border-gray-200 px-3 py-2 mt-1 text-sm outline-none w-full"
//         />
//       </div>

//       {/* Search Button */}
//       <button className='w-full md:w-auto flex gap-2 bg-white items-center justify-center text-blue-600 font-semibold border border-blue-600 px-7 py-2 hover:bg-blue-50 transition cursor-pointer'>
//         Search
//       </button>
//     </form>
//   );
// }

// export default FormsField;



// FormsField.jsx - With Authentication Check


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FormsField = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("access");
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!token && !!user);
  }, []);

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      // Show toast if not authenticated
      showToastNotification();
    } else {
      // If authenticated, proceed with search
      // Add your search logic here
      console.log("Search submitted");
      // You can navigate to search results or handle the search
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
    <div className="relative">
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

      <form 
        onSubmit={handleSearch}
        className='bg-white text-gray-500 rounded-lg px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-end gap-4 md:gap-6 w-full max-w-4xl'
      >
        {/* Room Type */}
        <div className="w-full md:w-auto flex-1">
          <div className='flex items-center gap-2'>
            <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
            </svg>
            <label htmlFor="roomType">Room Type</label>
          </div>
          <select
            id="roomType"
            className="rounded border border-gray-200 px-3 py-2 mt-1 text-sm outline-none w-full"
            required
          >
            <option value="">Select room type</option>
            <option value="single-bed">Single Bed</option>
            <option value="double-bed">Double Bed</option>
            <option value="family-suite">Family Suite</option>
          </select>
        </div>

        {/* Check In */}
        <div className="w-full md:w-auto flex-1">
          <div className='flex items-center gap-2'>
            <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
            </svg>
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input
            id="checkIn"
            type="date"
            min={today}
            className="rounded border border-gray-200 px-3 py-2 mt-1 text-sm outline-none w-full"
          />
        </div>

        {/* Check Out */}
        <div className="w-full md:w-auto flex-1">
          <div className='flex items-center gap-2'>
            <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
            </svg>
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            min={today}
            className="rounded border border-gray-200 px-3 py-2 mt-1 text-sm outline-none w-full"
          />
        </div>

        {/* Search Button */}
        <button 
          type="submit"
          className='w-full md:w-auto flex gap-2 bg-white items-center justify-center text-blue-600 font-semibold border border-blue-600 px-7 py-2 hover:bg-blue-50 transition cursor-pointer'
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default FormsField; 