import React, { useState } from "react";
import { Upload, X } from "lucide-react";

const RoomManagement = () => {
  const [formData, setFormData] = useState({
    buildingName: "",
    buildingAddress: "",
    roomType: "",
    price: "",
    amenities: {
      freeWifi: false,
      freeBreakfast: false,
      roomService: false,
      mountainView: false,
      poolAccess: false,
    },
  });

  const [images, setImages] = useState([null, null, null, null, null]);
  const [imagePreviews, setImagePreviews] = useState([null, null, null, null, null]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: !prev.amenities[amenity],
      },
    }));
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);

      // Create preview
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Images:", images);
    alert("Room added successfully!");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Room Management</h1>
        <p className="text-gray-600">Manage your hotel rooms</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 max-w-5xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Room</h2>
        <p className="text-gray-600 mb-8">
          Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user
          booking experience.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Building Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Building Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Building Name
                </label>
                <input
                  type="text"
                  name="buildingName"
                  value={formData.buildingName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter building name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Building Address
                </label>
                <input
                  type="text"
                  name="buildingAddress"
                  value={formData.buildingAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter building address"
                  required
                />
              </div>
            </div>
          </div>

          {/* Images Upload */}
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

          {/* Room Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Type
              </label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Room Type</option>
                <option value="single">Single Bed</option>
                <option value="double">Double Bed</option>
                <option value="family">Family Suite</option>
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
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.amenities.freeWifi}
                  onChange={() => handleAmenityChange("freeWifi")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Free WiFi</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.amenities.freeBreakfast}
                  onChange={() => handleAmenityChange("freeBreakfast")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Free Breakfast</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.amenities.roomService}
                  onChange={() => handleAmenityChange("roomService")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Room Service</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.amenities.mountainView}
                  onChange={() => handleAmenityChange("mountainView")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Mountain View</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.amenities.poolAccess}
                  onChange={() => handleAmenityChange("poolAccess")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Pool Access</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full md:w-auto flex gap-2 bg-white items-center justify-center text-blue-600 font-semibold border border-blue-600 px-7 py-2 hover:bg-blue-50 transition cursor-pointer"
          >
            Add Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoomManagement;