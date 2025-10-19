import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, CreditCard, BedDouble } from "lucide-react";
import MyBookings from "../../Components/UserDashboardComponents/Mybookings";

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // Greeting logic
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("access");
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) setUser(storedUser);

        const res = await axios.get("http://127.0.0.1:8000/api/reservations/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReservations(res.data);
      } catch (err) {
        console.error("Error fetching user reservations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);



  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600 text-lg font-medium">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {greeting} {user ? `${user.first_name}!` : "Guest!"}
        </h1>
        <p className="text-gray-600">Here’s a summary of your reservations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-4xl font-bold text-blue-500 mb-2">
                {reservations.length}
              </h3>
              <p className="text-gray-600 font-medium">Total Reservations</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-full">
              <Calendar className="text-blue-500" size={28} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-4xl font-bold text-green-500 mb-2">
                ₵
                {reservations.reduce((sum, r) => sum + parseFloat(r.amount || 0), 0)}
              </h3>
              <p className="text-gray-600 font-medium">Total Spent</p>
            </div>
            <div className="bg-green-50 p-3 rounded-full">
              <CreditCard className="text-green-500" size={28} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-4xl font-bold text-indigo-500 mb-2">
                {
                  reservations.filter((r) => r.status.toLowerCase() === "confirmed")
                    .length
                }
              </h3>
              <p className="text-gray-600 font-medium">Confirmed Bookings</p>
            </div>
            <div className="bg-indigo-50 p-3 rounded-full">
              <BedDouble className="text-indigo-500" size={28} />
            </div>
          </div>
        </div>
      </div>

    
      <MyBookings/>
    </div>
  );
};

export default Dashboard;
