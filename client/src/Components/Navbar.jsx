import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { assets } from "../assets/assets";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="h-[70px] absolute top-0 left-0 w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-20 bg-transparent text-gray-700 transition-all">
      <Link >
        {/* <img className="w-[10rem] " src={assets.logo1} alt="dummyLogoColored" /> */}
        <h1>Logo</h1>
      </Link>

      {/* <ul className="md:flex hidden items-center gap-10 text-black">
        <li>
          <Link  className="hover:text-black transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-black transition">
            Contact Us
          </Link>
        </li>
      
      </ul> */}

       <Link to= "/signup">
      <button
        type="button"
        className="bg-white text-gray-600 border border-gray-300 md:inline hidden text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full cursor-pointer"
        // onClick={() => {
        //   logout();
        // }}
      >
        Signup
      </button>
      </Link>

      <button
        aria-label="menu-btn"
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="menu-btn inline-block md:hidden active:scale-90 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="#fff"
        >
          <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z" />
        </svg>
      </button>

      {menuOpen && (
        <div className="mobile-menu absolute top-[70px] left-0 w-full bg-white p-6 md:hidden">
          {/* <ul className="flex flex-col space-y-4 text-lg">
            <li>
              <Link className="text-sm">
                Home
              </Link>
            </li>
            <li>
              <Link  className="text-sm">
                Contact Us
              </Link>
            </li>
         
          </ul> */}

          <Link to='/signup'>
          <button
            type="button"
            className="bg-white text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full cursor-pointer"
            // onClick={() => {
            //   logout();
            // }}
          >
            Signup
          </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
