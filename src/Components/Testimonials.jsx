import React from "react";
import { testimonials } from "../assets/assets";

const Testimonials = () => {
  const TestimonialCard = ({ user }) => (
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white">
      <div className="flex gap-3 items-center">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={user.image}
          alt={user.name}
        />
        <div>
          <p className="font-medium text-gray-800">{user.name}</p>
          <span className="text-xs text-gray-500">{user.address}</span>
        </div>
      </div>
      <p className="text-sm py-4 text-gray-700 italic">"{user.review}"</p>
      <div className="flex items-center gap-1">
        {Array.from({ length: user.rating }, (_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill="#facc15"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#facc15"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.082 4.219a.563.563 0 0 0 .424.308l4.655.676a.562.562 0 0 1 .312.958l-3.37 3.288a.563.563 0 0 0-.162.497l.795 4.63a.563.563 0 0 1-.817.593l-4.16-2.188a.563.563 0 0 0-.524 0l-4.16 2.188a.563.563 0 0 1-.817-.593l.795-4.63a.563.563 0 0 0-.162-.497L2.007 9.66a.562.562 0 0 1 .312-.958l4.655-.676a.563.563 0 0 0 .424-.308l2.082-4.219z"
            />
          </svg>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .marquee-inner {
          animation: marqueeScroll 25s linear infinite;
        }
      `}</style>

      <div className="w-full mx-auto max-w-5xl overflow-hidden relative py-10 bg-gray-100">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          What Our Guests Say
        </h2>
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>

        <div className="marquee-inner flex transform-gpu min-w-[200%]">
          {[...testimonials, ...testimonials].map((user, index) => (
            <TestimonialCard key={index} user={user} />
          ))}
        </div>

        <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>
    </>
  );
};

export default Testimonials;
