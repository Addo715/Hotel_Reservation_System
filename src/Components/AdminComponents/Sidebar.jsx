import React from 'react';
import { Briefcase, Key, FileText, X, LogOut } from 'lucide-react';

const Sidebar = ({ currentRoute, setCurrentRoute, sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Briefcase size={20} /> },
    { id: 'room-management', label: 'Room Management', icon: <Key size={20} /> },
    { id: 'room-list', label: 'Room List', icon: <FileText size={20} /> },
  ];

  const handleLogout = () => {
    // Clear stored user data
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    window.location.href = '/signup'; // redirect to login/signup
  };

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
          ${sidebarOpen ? 'w-64' : 'lg:w-20 w-64'}
          fixed lg:relative inset-y-0 left-0 z-50
          bg-white shadow-lg transition-all duration-300 flex flex-col
        `}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {sidebarOpen && (
              <h1 className="text-blue-600 font-bold text-2xl">NovaStay</h1>
            )}
          </div>

          {/* Close button (Mobile only) */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentRoute(item.id);
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                currentRoute === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                {sidebarOpen && (
                  <span className="font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </div>
            </button>
          ))}
        </nav>

        {/* Logout Button (Bottom) */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex cursor-pointer items-center justify-center space-x-2 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="font-medium ">Sign Out</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
