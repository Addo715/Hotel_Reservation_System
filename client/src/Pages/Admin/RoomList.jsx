import React, { useState, useEffect } from "react";
import { ChevronDown, Trash2, Pencil } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [editingRoom, setEditingRoom] = useState(null);
    const [editData, setEditData] = useState({});

    const statusOptions = ['available', 'occupied', 'maintenance'];
    const allAmenities = ["WiFi", "TV", "Air Conditioning", "Mini Bar", "Balcony", "Coffee Maker"];

    const getStatusColor = (status) => {
        switch(status) {
            case 'available': return 'bg-green-100 text-green-800';
            case 'occupied': return 'bg-red-100 text-red-800';
            case 'maintenance': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getAuthHeaders = () => {
        const token = localStorage.getItem("access");
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/rooms/rooms/", {
                    headers: getAuthHeaders(),
                });
                setRooms(response.data.results || response.data);
            } catch (error) {
                console.error("Failed to fetch rooms:", error.response?.data || error.message);
                toast.error("Failed to load rooms");
            }
        };
        fetchRooms();
    }, []);

    const toggleDropdown = (roomId) => {
        setOpenDropdown(openDropdown === roomId ? null : roomId);
    };

    const handleStatusChange = async (roomId, newStatus) => {
        try {
            await axios.patch(
                `http://127.0.0.1:8000/api/rooms/rooms/${roomId}/update_status/`,
                { status: newStatus },
                { headers: { ...getAuthHeaders(), "Content-Type": "application/json" } }
            );
            setRooms(rooms.map(room => room.id === roomId ? { ...room, status: newStatus } : room));
            setOpenDropdown(null);
            toast.success("Status updated!");
        } catch (error) {
            console.error("Failed to update status:", error.response?.data || error.message);
            toast.error("Failed to update room status");
        }
    };

    const handleDelete = async (roomId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this room?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/rooms/rooms/${roomId}/`, {
                headers: getAuthHeaders()
            });
            setRooms(rooms.filter(room => room.id !== roomId));
            toast.success("Room deleted successfully!");
        } catch (error) {
            console.error("Failed to delete room:", error.response?.data || error.message);
            toast.error("Failed to delete room");
        }
    };

    const openEditModal = (room) => {
        setEditingRoom(room);
        setEditData({
            price_per_night: parseFloat(room.price_per_night).toFixed(2),
            amenities: room.amenities || []
        });
    };

    const handleAmenityToggle = (amenity) => {
        setEditData((prev) => {
            const amenities = prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity];
            return { ...prev, amenities };
        });
    };

    const handlePriceChange = (e) => {
        setEditData({
            ...editData,
            price_per_night: parseFloat(e.target.value).toFixed(2)
        });
    };

    const saveEdit = async () => {
        try {
            await axios.patch(
                `http://127.0.0.1:8000/api/rooms/rooms/${editingRoom.id}/`,
                editData,
                { headers: { ...getAuthHeaders(), "Content-Type": "application/json" } }
            );

            setRooms(rooms.map(room =>
                room.id === editingRoom.id ? { ...room, ...editData } : room
            ));
            toast.success("Room updated successfully!");
            setEditingRoom(null);
        } catch (error) {
            console.error("Failed to update room:", error.response?.data || error.message);
            toast.error("Failed to update room");
        }
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
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Edit</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Change Status</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Delete</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {rooms.map((room) => (
                            <tr key={room.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-800">{room.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{room.room_type?.name || room.type}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                                        {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-800"> ₵{parseFloat(room.price_per_night).toFixed(2)}</td>

                                {/* Edit */}
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => openEditModal(room)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                        title="Edit Room"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                </td>

                                {/* Change Status */}
                                <td className="px-6 py-4 relative">
                                    <button
                                        onClick={() => toggleDropdown(room.id)}
                                        className="flex gap-2 bg-white items-center text-blue-600 font-semibold border border-blue-600 px-4 py-2 hover:bg-blue-50 transition cursor-pointer"
                                    >
                                        Change Status
                                        <ChevronDown size={16} />
                                    </button>

                                    {openDropdown === room.id && (
                                        <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg right-0">
                                            {statusOptions.map((status) => (
                                                <button
                                                    key={status}
                                                    onClick={() => handleStatusChange(room.id, status)}
                                                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition ${
                                                        room.status === status ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'
                                                    }`}
                                                >
                                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </td>

                                {/* Delete */}
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleDelete(room.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                                        title="Delete Room"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            {editingRoom && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg p-6 w-96 relative shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Edit Room {editingRoom.id}</h2>
                        <div className="flex flex-col gap-4"> {/* Increased gap for spacious layout */}
                            <div>
                                <label className="text-gray-700 font-medium">Price per Night</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={editData.price_per_night}
                                    onChange={handlePriceChange}
                                    className="border px-3 py-2 rounded w-full"
                                />
                                <p className="text-gray-500 text-sm mt-1">Currency:  ₵</p>
                            </div>

                            <div>
                                <label className="text-gray-700 font-medium mb-2 block">Amenities</label>
                                <div className="flex flex-col gap-3"> {/* Increased gap for spacious layout */}
                                    {allAmenities.map((amenity) => (
                                        <label key={amenity} className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                checked={editData.amenities.includes(amenity)}
                                                onChange={() => handleAmenityToggle(amenity)}
                                                className="h-4 w-4"
                                            />
                                            <span className="text-gray-800">{amenity}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                onClick={() => setEditingRoom(null)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveEdit}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default RoomList;
