import React, { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const RoomManagement = () => {
    const [formData, setFormData] = useState({
        roomName: "",
        roomDescription: "",
        roomTypeName: "",
        price: "",
        capacity: 2,
        floor: 1,
        amenities: {
            WiFi: false,
            TV: false,
            "Air Conditioning": false,
            "Room Service": false,
            "Pool Access": false,
        },
    });

    const [roomTypes, setRoomTypes] = useState([]);
    const [images, setImages] = useState([null, null, null, null, null]);
    const [imagePreviews, setImagePreviews] = useState([null, null, null, null, null]);

    // Helper to get token headers
    const getAuthHeaders = () => {
        const token = localStorage.getItem("access"); // use "access"
        return token ? { Authorization: `Bearer ${token}` } : {};
    };


    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/rooms/room-types/",
                    { headers: getAuthHeaders() }
                );
                const data = response.data.results || response.data;
                setRoomTypes(data);
            } catch (error) {
                console.error("Failed to load room types:", error.response?.data || error.message);
                toast.error("Failed to load room types");
            }
        };
        fetchRoomTypes();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAmenityChange = (amenity) => {
        setFormData((prev) => ({
            ...prev,
            amenities: { ...prev.amenities, [amenity]: !prev.amenities[amenity] },
        }));
    };

    const handleImageUpload = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[index] = file;
            setImages(newImages);

            const reader = new FileReader();
            reader.onloadend = () => {
                const newPreviews = [...imagePreviews];
                newPreviews[index] = reader.result;
                setImagePreviews(newPreviews);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages[index] = null;
        setImages(newImages);

        const newPreviews = [...imagePreviews];
        newPreviews[index] = null;
        setImagePreviews(newPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = new FormData();
        payload.append("name", formData.roomName);
        payload.append("room_type_name", formData.roomTypeName);
        payload.append("price_per_night", parseFloat(formData.price));
        payload.append("capacity", formData.capacity);
        payload.append("floor", formData.floor);
        payload.append("status", "available");
        payload.append("description", formData.roomDescription);

        const selectedAmenities = Object.keys(formData.amenities).filter(
            (key) => formData.amenities[key]
        );
        payload.append("amenities", JSON.stringify(selectedAmenities));

        images.forEach((image) => {
            if (image) payload.append("images", image);
        });

        try {
            await axios.post("http://127.0.0.1:8000/api/rooms/rooms/", payload, {
                headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" },
            });

            toast.success("Room added successfully!");
            setFormData({
                roomName: "",
                roomDescription: "",
                roomTypeName: "",
                price: "",
                capacity: 2,
                floor: 1,
                amenities: {
                    WiFi: false,
                    TV: false,
                    "Air Conditioning": false,
                    "Room Service": false,
                    "Pool Access": false,
                },
            });
            setImages([null, null, null, null, null]);
            setImagePreviews([null, null, null, null, null]);
        } catch (error) {
            console.error("Error adding room:", error.response?.data || error.message);
            if ([401, 403].includes(error.response?.status)) {
                toast.error("Unauthorized. Please log in again.");
            } else if (error.response?.status === 400) {
                toast.error("Invalid input. Check all fields.");
            } else {
                toast.error("Failed to add room.");
            }
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Room Management</h1>
                <p className="text-gray-600">Manage your hotel rooms</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 max-w-5xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Room</h2>
                <form onSubmit={handleSubmit}>
                    {/* Room Name & Description */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Room Name
                            </label>
                            <input
                                type="text"
                                name="roomName"
                                value={formData.roomName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter room name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Room Description
                            </label>
                            <input
                                type="text"
                                name="roomDescription"
                                value={formData.roomDescription}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter short description"
                                required
                            />
                        </div>
                    </div>

                    {/* Room Type & Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Room Type
                            </label>
                            <select
                                name="roomTypeName"
                                value={formData.roomTypeName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="">Select Room Type</option>
                                {roomTypes.map((type) => (
                                    <option key={type.id} value={type.name}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price <span className="text-gray-500 text-xs">/night</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="0"
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Amenities</h3>
                        <div className="space-y-3">
                            {Object.keys(formData.amenities).map((key) => (
                                <label key={key} className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.amenities[key]}
                                        onChange={() => handleAmenityChange(key)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-gray-700">{key}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Images */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Images</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {images.map((image, index) => (
                                <div key={index} className="relative">
                                    <input
                                        type="file"
                                        id={`image-${index}`}
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(index, e)}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor={`image-${index}`}
                                        className="block aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors overflow-hidden"
                                    >
                                        {imagePreviews[index] ? (
                                            <div className="relative w-full h-full">
                                                <img
                                                    src={imagePreviews[index]}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleRemoveImage(index);
                                                    }}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                                <Upload size={32} />
                                                <span className="text-xs mt-2">Upload</span>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full md:w-auto flex gap-2 bg-blue-600 items-center justify-center text-white font-semibold border border-blue-600 px-7 py-2 hover:bg-blue-50 transition cursor-pointer"
                    >
                        Add Room
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RoomManagement;
