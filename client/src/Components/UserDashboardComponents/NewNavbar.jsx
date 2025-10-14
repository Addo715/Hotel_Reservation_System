// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const NewNavbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-20 bg-blue-100 text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all">
//       {/* Logo */}
//       <a href="/" className="text-blue-600 font-bold text-2xl">
//         NovaStay
//       </a>

//       {/* Desktop Menu */}
//       <ul className="md:flex hidden items-center gap-10">
//         <li>
//           <a className="hover:text-gray-500/80 transition" href="#">
//             Home
//           </a>
//         </li>
//         <Link to='/rooms'>
//         <li>
//           <a className="hover:text-gray-500/80 transition" href="#">
//             Rooms
//           </a>
//         </li>
//         </Link>
//         <li>
//           <a className="hover:text-gray-500/80 transition" href="#">
//             Dashboard
//           </a>
//         </li>
      
//       </ul>

//       {/* Desktop Button */}
//       <button
//         type="button"
//         className="bg-white text-gray-600 border border-gray-300 md:inline hidden text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
//       >
//         Logout
//       </button>

//       {/* Mobile Menu Button */}
//       <button
//         aria-label="menu-btn"
//         type="button"
//         className="menu-btn inline-block md:hidden active:scale-90 transition"
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="30"
//           height="30"
//           viewBox="0 0 30 30"
//           fill="#000"
//         >
//           <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
//         </svg>
//       </button>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="absolute top-[70px] left-0 w-full bg-white p-6 md:hidden">
//           <ul className="flex flex-col space-y-4 text-lg">
//             <li>
//               <a href="#" className="text-sm">
//                 Home
//               </a>
//             </li>
//             <li>
//               <a href="#" className="text-sm">
//                 Rooms
//               </a>
//             </li>
//             <li>
//               <a href="#" className="text-sm">
//                 Dashboard
//               </a>
//             </li>
           
//           </ul>

//           <button
//             type="button"
//             className="bg-white text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default NewNavbar;


// ============================================
// UPDATED NewNavbar.jsx with Authentication
// ============================================

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const NewNavbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   // Check if user is authenticated
//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem("access");
//       const user = localStorage.getItem("user");
//       setIsAuthenticated(!!token && !!user);
//     };

//     checkAuth();
//     // Listen for storage changes (in case user logs in/out in another tab)
//     window.addEventListener("storage", checkAuth);
    
//     return () => window.removeEventListener("storage", checkAuth);
//   }, []);

//   // Handle Logout
//   const handleLogout = () => {
//     // Clear all auth data
//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//     localStorage.removeItem("user");
    
//     // Update state
//     setIsAuthenticated(false);
//     setMenuOpen(false);
    
//     // Redirect to home
//     navigate("/");
//   };

//   return (
//     <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-20 bg-blue-100 text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all">
//       {/* Logo */}
//       <a href="/" className="text-blue-600 font-bold text-2xl">
//         NovaStay
//       </a>

//       {/* Desktop Menu - Only show if authenticated */}
//       {isAuthenticated && (
//         <ul className="md:flex hidden items-center gap-10">
//           <li>
//             <Link to="/" className="hover:text-gray-500/80 transition">
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/rooms" className="hover:text-gray-500/80 transition">
//               Rooms
//             </Link>
//           </li>
//           <li>
//             <Link to="/dashboard" className="hover:text-gray-500/80 transition">
//               Dashboard
//             </Link>
//           </li>
//         </ul>
//       )}

//       {/* Desktop Button - Show Logout if authenticated, Sign Up if not */}
//       {isAuthenticated ? (
//         <button
//           type="button"
//           onClick={handleLogout}
//           className="bg-white text-gray-600 border border-gray-300 md:inline hidden text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
//         >
//           Logout
//         </button>
//       ) : (
//         <button
//           type="button"
//           onClick={() => navigate("/signup")}
//           className="bg-blue-500 text-white md:inline hidden text-sm hover:bg-blue-600 active:scale-95 transition-all w-40 h-11 rounded-full"
//         >
//           Sign Up
//         </button>
//       )}

//       {/* Mobile Menu Button - Only show if authenticated */}
//       {isAuthenticated && (
//         <button
//           aria-label="menu-btn"
//           type="button"
//           className="menu-btn inline-block md:hidden active:scale-90 transition"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="30"
//             height="30"
//             viewBox="0 0 30 30"
//             fill="#000"
//           >
//             <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
//           </svg>
//         </button>
//       )}

//       {/* Mobile Sign Up Button - Show only if not authenticated */}
//       {!isAuthenticated && (
//         <button
//           type="button"
//           onClick={() => navigate("/signup")}
//           className="bg-blue-500 text-white md:hidden inline text-sm hover:bg-blue-600 active:scale-95 transition-all px-6 h-11 rounded-full"
//         >
//           Sign Up
//         </button>
//       )}

//       {/* Mobile Menu - Only show if authenticated and menu is open */}
//       {isAuthenticated && menuOpen && (
//         <div className="absolute top-[70px] left-0 w-full bg-white p-6 md:hidden shadow-lg">
//           <ul className="flex flex-col space-y-4 text-lg">
//             <li>
//               <Link 
//                 to="/" 
//                 className="text-sm hover:text-blue-500 transition"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link 
//                 to="/rooms" 
//                 className="text-sm hover:text-blue-500 transition"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Rooms
//               </Link>
//             </li>
//             <li>
//               <Link 
//                 to="/my-bookings" 
//                 className="text-sm hover:text-blue-500 transition"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 My Bookings
//               </Link>
//             </li>
//           </ul>

//           <button
//             type="button"
//             onClick={handleLogout}
//             className="bg-white text-gray-600 border cursor-pointer border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default NewNavbar;


// ============================================
// UPDATED NewNavbar.jsx with Authentication
// ============================================

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access");
      const user = localStorage.getItem("user");
      setIsAuthenticated(!!token && !!user);
    };

    checkAuth();
    // Listen for storage changes (in case user logs in/out in another tab)
    window.addEventListener("storage", checkAuth);
    
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // Handle Logout
  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    
    // Update state
    setIsAuthenticated(false);
    setMenuOpen(false);
    
    // Redirect to home
    navigate("/");
  };

  return (
    <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-20 bg-blue-100 text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all">
      {/* Logo */}
      <a href="/" className="text-blue-600 font-bold text-2xl cursor-pointer">
        NovaStay
      </a>

      {/* Desktop Menu - Only show if authenticated */}
      {isAuthenticated && (
        <ul className="md:flex hidden items-center gap-10">
          <li>
            <Link to="/" className="hover:text-gray-500/80 transition cursor-pointer">
              Home
            </Link>
          </li>
          <li>
            <Link to="/rooms" className="hover:text-gray-500/80 transition cursor-pointer">
              Rooms
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-gray-500/80 transition cursor-pointer">
              Dashboard
            </Link>
          </li>
        </ul>
      )}

      {/* Desktop Button - Show Logout if authenticated, Sign Up if not */}
      {isAuthenticated ? (
        <button
          type="button"
          onClick={handleLogout}
          className="bg-white text-gray-600 border border-gray-300 md:inline hidden text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full cursor-pointer"
        >
          Logout
        </button>
      ) : (
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="bg-blue-500 text-white md:inline hidden text-sm hover:bg-blue-600 active:scale-95 transition-all w-40 h-11 rounded-full cursor-pointer"
        >
          Sign Up
        </button>
      )}

      {/* Mobile Menu Button - Only show if authenticated */}
      {isAuthenticated && (
        <button
          aria-label="menu-btn"
          type="button"
          className="menu-btn inline-block md:hidden active:scale-90 transition cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="#000"
          >
            <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
          </svg>
        </button>
      )}

      {/* Mobile Sign Up Button - Show only if not authenticated */}
      {!isAuthenticated && (
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="bg-blue-500 text-white md:hidden inline text-sm hover:bg-blue-600 active:scale-95 transition-all px-6 h-11 rounded-full cursor-pointer"
        >
          Sign Up
        </button>
      )}

      {/* Mobile Menu - Only show if authenticated and menu is open */}
      {isAuthenticated && menuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white p-6 md:hidden shadow-lg">
          <ul className="flex flex-col space-y-4 text-lg">
            <li>
              <Link 
                to="/" 
                className="text-sm hover:text-blue-500 transition cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/rooms" 
                className="text-sm hover:text-blue-500 transition cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                Rooms
              </Link>
            </li>
            <li>
              <Link 
                to="/my-bookings" 
                className="text-sm hover:text-blue-500 transition cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                My Bookings
              </Link>
            </li>
          </ul>

          <button
            type="button"
            onClick={handleLogout}
            className="bg-white text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NewNavbar;