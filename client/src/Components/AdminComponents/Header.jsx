import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
    const [user, setUser] = useState(null);
    const [showInfo, setShowInfo] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) setUser(storedUser);
    }, []);

    const getInitials = (name) => {
        if (!name) return "";
        const names = name.split(" ");
        return names.length > 1
            ? names[0][0] + names[1][0]
            : names[0][0];
    };

    // Close dropdown if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowInfo(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between px-8 py-4">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <Menu className="text-gray-600" size={24} />
                </button>

                <div className="flex items-center space-x-4">
                    {/* Profile */}
                    <div className="relative" ref={dropdownRef}>
                        <div
                            onClick={() => setShowInfo(!showInfo)}
                            className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer select-none"
                        >
              <span className="text-white font-bold">
                {getInitials(user?.first_name + " " + user?.last_name)}
              </span>
                        </div>

                        {showInfo && user && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg p-4 text-gray-800 z-50">
                                <p className="font-semibold">{user.first_name} {user.last_name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
