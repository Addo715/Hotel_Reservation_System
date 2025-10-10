import React from "react";
import marriot from '../assets/Marriott.svg'
import travigo from '../assets/Trivago.svg'
import hyatt from '../assets/Hyatt.svg'
import booking from '../assets/booking.svg'
import expedia from '../assets/expedia.svg'
import Hilton from '../assets/Hilton.svg'
import airbnb from '../assets/airbnb.svg'

const TrustedBrands = () => {
  const hotelLogos = [
    {
      name: 'Marriott',
      url: marriot,
    },
    {
      name: 'Hilton',
      url: Hilton,
    },
    {
      name: 'Hyatt',
      url: hyatt,
    },
    {
      name: 'Booking.com',
      url: booking,
    },
    {
      name: 'Expedia',
      url: expedia,
    },
    {
      name: 'Airbnb',
      url: airbnb,
    },
    {
      name: 'Trivago',
      url: travigo,
    },
  ];

  return (
    <>
      <style>{`
        .marquee-inner {
          animation: marqueeScroll linear infinite;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div className="py-8">
        <h3 className="text-center text-2xl font-bold text-blue-500 mb-6">
          Trusted By Leading Brands
        </h3>

        <div className="overflow-hidden w-full relative max-w-5xl mx-auto select-none py-6">
          {/* Left gradient */}
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

          <div
            className="marquee-inner flex will-change-transform min-w-[200%]"
            style={{ animationDuration: '20s' }}
          >
            <div className="flex">
              {[...hotelLogos, ...hotelLogos].map((logo, index) => (
                <img
                  key={index}
                  src={logo.url}
                  alt={logo.name}
                  className="h-16 w-auto mx-6 object-contain"
                  draggable={false}
                />
              ))}
            </div>
          </div>

          {/* Right gradient */}
          <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </>
  );
};

export default TrustedBrands;