import { Briefcase, Key, FileText, User, Calendar, DollarSign, X } from 'lucide-react';

const UserSidebar = ({ currentRoute, setCurrentRoute, sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Briefcase size={20} /> },
    // { id: 'my-reservations', label: 'My Reservations', icon: <Calendar size={20} /> },
    // { id: 'profile', label: 'Profile', icon: <User size={20} /> },
  ];

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
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
        ${sidebarOpen ? 'w-64' : 'lg:w-20 w-64'}
        fixed lg:relative inset-y-0 left-0 z-50
        bg-gray-200 shadow-lg transition-all duration-300 flex flex-col
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div> */}
            {/* {sidebarOpen && <h1 className="text-xl font-bold text-blue-500">HOTEL</h1>} */}
          </div>
          
          {/* Close button for mobile */}
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  setCurrentRoute(item.id);
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
                className={`w-full flex cursor-pointer items-center px-4 py-3 rounded-lg transition-all ${
                  currentRoute === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  {sidebarOpen && <span className="font-medium whitespace-nowrap">{item.label}</span>}
                </div>
              </button>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}

export default UserSidebar;
