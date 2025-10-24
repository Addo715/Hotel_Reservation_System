import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { CreditCard, Smartphone } from "lucide-react";

const Payments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [country, setCountry] = useState("Ghana");
  const [momoNumber, setMomoNumber] = useState("");
  const [momoName, setMomoName] = useState("");
  const [email, setEmail] = useState("");

  if (!booking) {
    return (
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 pt-28 pb-20 text-center">
        <p className="text-gray-500 text-lg">No booking information found</p>
        <button
          onClick={() => navigate("/my-bookings")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Go to My Bookings
        </button>
      </div>
    );
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + " / " + v.slice(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, "").length <= 16) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryDateChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.replace(/\s|\//g, "").length <= 4) {
      setExpiryDate(formatted);
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/gi, "");
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handleMomoNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/gi, "");
    if (value.length <= 10) {
      setMomoNumber(value);
    }
  };

  const validateCardPayment = () => {
    if (!email) {
      toast.error("Please enter your email");
      return false;
    }
    if (!cardNumber || cardNumber.replace(/\s/g, "").length !== 16) {
      toast.error("Please enter a valid 16-digit card number");
      return false;
    }
    if (!expiryDate || expiryDate.replace(/\s|\//g, "").length !== 4) {
      toast.error("Please enter a valid expiry date (MM/YY)");
      return false;
    }
    if (!cvv || cvv.length !== 3) {
      toast.error("Please enter a valid 3-digit CVV");
      return false;
    }
    if (!cardholderName) {
      toast.error("Please enter cardholder name");
      return false;
    }
    return true;
  };

  const validateMomoPayment = () => {
    if (!email) {
      toast.error("Please enter your email");
      return false;
    }
    if (!momoNumber || momoNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile money number");
      return false;
    }
    if (!momoName) {
      toast.error("Please enter account holder name");
      return false;
    }
    return true;
  };

  const handlePayment = () => {
    // Validate based on payment method
    if (paymentMethod === "card" && !validateCardPayment()) {
      return;
    }
    if (paymentMethod === "momo" && !validateMomoPayment()) {
      return;
    }

    // Get all bookings from localStorage
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    
    // Find and update the booking status
    const updatedBookings = allBookings.map((b) => {
      if (
        b.roomId === booking.roomId &&
        b.checkIn === booking.checkIn &&
        b.checkOut === booking.checkOut
      ) {
        return { ...b, status: "Paid" };
      }
      return b;
    });

    // Save updated bookings back to localStorage
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    toast.success("Payment successful! ", {
      duration: 3000,
      position: "top-center",
    });

    // Navigate to bookings page after short delay
    setTimeout(() => {
      navigate("/my-bookings");
    }, 2000);
  };

  const getCardType = () => {
    const number = cardNumber.replace(/\s/g, "");
    if (number.startsWith("4")) return "Visa";
    if (number.startsWith("5")) return "Mastercard";
    return "Card";
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 pt-10 pb-20">
      <Toaster />
      
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-500 hover:text-blue-600 mb-4 cursor-pointer flex items-center gap-2"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Complete Payment</h1>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        {/* Payment Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Payment Method Tabs */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="flex gap-4 border-b">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`pb-3 px-4 flex items-center gap-2 transition-all ${
                  paymentMethod === "card"
                    ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <CreditCard size={20} />
                Card
              </button>
              <button
                onClick={() => setPaymentMethod("momo")}
                className={`pb-3 px-4 flex items-center gap-2 transition-all ${
                  paymentMethod === "momo"
                    ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Smartphone size={20} />
                Mobile Money
              </button>
            </div>
          </div>

          {/* Email Field (Common) */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@greatstack.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Card Payment Form */}
          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Card Information
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="4242 4242 4242 4242"
                    className="w-full px-4 py-3 border border-gray-300 rounded-t-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  {cardNumber && (
                    <div className="absolute right-3 top-3 text-xs font-semibold text-gray-500">
                      {getCardType()}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-0">
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder="MM / YY"
                    className="px-4 py-3 border border-t-0 border-r-0 border-gray-300 rounded-bl-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    value={cvv}
                    onChange={handleCvvChange}
                    placeholder="CVV"
                    className="px-4 py-3 border border-t-0 border-gray-300 rounded-br-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="Full name on card"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Country or Region
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="Ghana">Ghana</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
                <input type="checkbox" className="w-4 h-4" defaultChecked />
                <label>Securely save my information for 1-click checkout</label>
              </div>
            </div>
          )}

          {/* Mobile Money Payment Form */}
          {paymentMethod === "momo" && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Mobile Money Number
                </label>
                <input
                  type="text"
                  value={momoNumber}
                  onChange={handleMomoNumberChange}
                  placeholder="0XX XXX XXXX"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter your mobile money number (MTN, Vodafone, or AirtelTigo)
                </p>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={momoName}
                  onChange={(e) => setMomoName(e.target.value)}
                  placeholder="Full name on account"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-800">
                  You will receive a prompt on your phone to approve the payment of <strong>${booking.total}</strong>
                </p>
              </div>
            </div>
          )}

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            className="w-full mt-6 bg-blue-600 cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Pay ₵{booking.total}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            By confirming your payment, you agree to our terms and conditions
          </p>
        </div>

        {/* Booking Summary */}
        <div className="bg-gray-50 rounded-lg p-6 h-fit sticky top-28">
          <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
          
          <div className="mb-4">
            <img
              src={booking.image}
              alt={booking.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg">{booking.name}</h3>
              <p className="text-gray-600 text-sm">{booking.roomType}</p>
            </div>

            <div className="flex items-start gap-2 text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mt-0.5 flex-shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span>{booking.address}</span>
            </div>

            <div className="border-t pt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Check-In:</span>
                <span className="font-medium">
                  {new Date(booking.checkIn).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-Out:</span>
                <span className="font-medium">
                  {new Date(booking.checkOut).toLocaleDateString()}
                </span>
              </div>
              {/* <div className="flex justify-between">
                <span className="text-gray-600">Guests:</span>
                <span className="font-medium">{booking.guests || 1}</span>
              </div> */}
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Amount:</span>
                <span className="text-2xl font-bold text-blue-600">
                  ₵{booking.total}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;