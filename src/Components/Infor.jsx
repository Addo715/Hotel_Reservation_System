import React from 'react'
import room5 from '../assets/roomImg.jpg'

const Infor = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 px-6 md:px-20 py-10">
      
      {/* right side */}
      <div className="md:w-1/2 w-full">
        <h2 className="text-2xl md:text-3xl font-semibold text-black mb-4">
          Experience Comfort & Convenience
        </h2>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
          Discover a new level of relaxation and ease with our modern platform designed to connect you 
          to the best places to stay. Enjoy smooth browsing, instant booking, and trusted hospitality  
          all in one experience.
        </p>

        <p className="mt-4 text-gray-700 text-sm md:text-base leading-relaxed">
          Whether you're planning a weekend getaway or a long vacation, we make it effortless to find 
          comfort that fits your lifestyle and budget.
        </p>
      </div>

      {/* left side */}
      <div className="md:w-1/2 w-full">
        <img 
          src={room5} 
          alt="Hotel Room" 
          className="rounded-lg w-full h-auto" 
        />
      </div>

    </div>
  )
}

export default Infor
