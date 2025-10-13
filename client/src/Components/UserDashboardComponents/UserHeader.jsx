import { Menu, Search, Bell } from 'lucide-react';

const UserHeader = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="bg-gray-200 shadow-sm border-b border-gray-200 ">
      <div className="flex items-center justify-between px-8 py-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="text-gray-600" size={24} />
        </button>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="text-gray-600" size={24} />
              <span className="absolute top-0 right-0 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer">
            <span className="text-white font-bold">SS</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default UserHeader;