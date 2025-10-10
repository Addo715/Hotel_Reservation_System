import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const RoomList = () => {
  const [rooms, setRooms] = useState([
    { id: "BKG-0001", type: 'Single bed', status: 'Available', price: '$250' },
    { id: "BKG-0002", type: 'Double bed', status: 'Occupied', price: '$350' },
    { id: "BKG-0003", type: 'Family suite', status: 'Available', price: '$400' },
    { id: "BKG-0004", type: 'Single bed', status: 'Maintenance', price: '$250' },
    { id: "BKG-0005", type: 'Family suite', status: 'Available', price: '$400' },
    { id: "BKG-0006", type: 'Double bed', status: 'Occupied', price: '$350' },
  ]);

  const [openDropdown, setOpenDropdown] = useState(null);

  const statusOptions = ['Available', 'Occupied', 'Maintenance'];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Occupied': return 'bg-red-100 text-red-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (roomId, newStatus) => {
    setRooms(rooms.map(room => 
      room.id === roomId ? { ...room, status: newStatus } : room
    ));
    setOpenDropdown(null);
  };

  const toggleDropdown = (roomId) => {
    setOpenDropdown(openDropdown === roomId ? null : roomId);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Room List</h1>
        <p className="text-gray-600">View all available rooms</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Room ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Price/Night</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-800">{room.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{room.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                      {room.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{room.price}</td>
                  <td className="px-6 py-4 relative">
                    <button 
                      onClick={() => toggleDropdown(room.id)}
                      className="flex gap-2 bg-white items-center text-blue-600 font-semibold border border-blue-600 px-4 py-2 hover:bg-blue-50 transition cursor-pointer"
                    >
                      Change Status
                      <ChevronDown size={16} />
                    </button>
                    
                    {openDropdown === room.id && (
                      <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg ">
                        {statusOptions.map((status) => (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(room.id, status)}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition ${
                              room.status === status ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RoomList;