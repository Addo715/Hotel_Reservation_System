import { useEffect, useState } from "react";
import axios from "axios";
import { Users, DollarSign, Home } from "lucide-react";

const Dashboard = () => {
    const [stats, setStats] = useState(null);
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
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem("access");
                const storedUser = JSON.parse(localStorage.getItem("user"));
                if (storedUser) setUser(storedUser);

                const res = await axios.get("http://127.0.0.1:8000/api/dashboard/admin/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setStats(res.data);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const getPaymentStatusColor = (status) => {
        return status === "Completed" || status === "completed"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800";
    };

    if (loading) {
        return (
            <div className="p-8 text-center text-gray-600 text-lg font-medium">
                Loading dashboard...
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="p-8 text-center text-red-600 text-lg font-medium">
                Failed to load dashboard data.
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {greeting} {user ? `${user.first_name}!` : "Admin!"}
                </h1>
                <p className="text-gray-600">Dashboard</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-4xl font-bold text-blue-500 mb-2">
                                {stats.total_reservations}
                            </h3>
                            <p className="text-gray-600 font-medium">Total Booking</p>
                        </div>
                        <div className="bg-teal-50 p-3 rounded-full">
                            <Users className="text-blue-500" size={28} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-4xl font-bold text-blue-500 mb-2">
                                ${stats.total_payments}
                            </h3>
                            <p className="text-gray-600 font-medium">Total Revenue</p>
                        </div>
                        <div className="bg-teal-50 p-3 rounded-full">
                            <DollarSign className="text-blue-500" size={28} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-4xl font-bold text-blue-500 mb-2">
                                {stats.occupancy_rate}%
                            </h3>
                            <p className="text-gray-600 font-medium">Occupancy Rate</p>
                        </div>
                        <div className="bg-teal-50 p-3 rounded-full">
                            <Home className="text-blue-500" size={28} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">Booking</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Room Type
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Revenue
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {stats.revenue_per_room_type.map((room) => (
                            <tr key={room.name} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-800">{room.name}</td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                                    ${room.revenue}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
