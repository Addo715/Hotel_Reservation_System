import React from 'react';

const FormsField = () => {
  return (
    <form className='bg-white text-gray-500 rounded-lg px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-end gap-4 md:gap-6 w-full max-w-4xl'>

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
          className="rounded border border-gray-200 px-3 py-2 mt-1 text-sm outline-none w-full"
        />
      </div>

      {/* Search Button */}
      <button className='w-full md:w-auto flex gap-2 bg-white items-center justify-center text-blue-600 font-semibold border border-blue-600 px-7 py-2 hover:bg-blue-50 transition cursor-pointer'>
        Search
      </button>
    </form>
  );
}

export default FormsField;
