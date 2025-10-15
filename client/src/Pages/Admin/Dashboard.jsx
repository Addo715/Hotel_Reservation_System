import { useEffect, useState } from "react";
import { Users, DollarSign, Home } from "lucide-react";

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [greeting, setGreeting] = useState("");
    const [localBookings, setLocalBookings] = useState([]);

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

                // Get bookings from localStorage
                const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
                setLocalBookings(bookings);

                // Calculate stats from local bookings
                const totalBookings = bookings.length;
                const totalRevenue = bookings.reduce((sum, booking) => {
                    return sum + (booking.status === "Paid" ? booking.total : 0);
                }, 0);

                // Calculate revenue per room type
                const revenueByType = {};
                bookings.forEach(booking => {
                    const type = booking.roomType || "Standard";
                    const amount = booking.status === "Paid" ? booking.total : 0;
                    if (revenueByType[type]) {
                        revenueByType[type] += amount;
                    } else {
                        revenueByType[type] = amount;
                    }
                });

                const revenuePerRoomType = Object.keys(revenueByType).map(type => ({
                    name: type,
                    revenue: revenueByType[type].toFixed(2)
                }));

                // Try to fetch from API, but fallback to local data if it fails
                try {
                    const res = await axios.get("http://127.0.0.1:8000/api/dashboard/admin/", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    
                    // Merge API data with local bookings data
                    setStats({
                        ...res.data,
                        total_reservations: totalBookings,
                        total_payments: totalRevenue.toFixed(2),
                        revenue_per_room_type: revenuePerRoomType.length > 0 
                            ? revenuePerRoomType 
                            : res.data.revenue_per_room_type
                    });
                } catch (apiError) {
                    // If API fails, use only local data
                    setStats({
                        total_reservations: totalBookings,
                        total_payments: totalRevenue.toFixed(2),
                        occupancy_rate: totalBookings > 0 ? 75 : 0, // Default value
                        revenue_per_room_type: revenuePerRoomType
                    });
                }
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();

        // Poll for changes in localStorage every 2 seconds
        const interval = setInterval(() => {
            const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
            setLocalBookings(bookings);
            
            const totalBookings = bookings.length;
            const totalRevenue = bookings.reduce((sum, booking) => {
                return sum + (booking.status === "Paid" ? booking.total : 0);
            }, 0);

            const revenueByType = {};
            bookings.forEach(booking => {
                const type = booking.roomType || "Standard";
                const amount = booking.status === "Paid" ? booking.total : 0;
                if (revenueByType[type]) {
                    revenueByType[type] += amount;
                } else {
                    revenueByType[type] = amount;
                }
            });

            const revenuePerRoomType = Object.keys(revenueByType).map(type => ({
                name: type,
                revenue: revenueByType[type].toFixed(2)
            }));

            setStats(prev => ({
                ...prev,
                total_reservations: totalBookings,
                total_payments: totalRevenue.toFixed(2),
                revenue_per_room_type: revenuePerRoomType.length > 0 
                    ? revenuePerRoomType 
                    : (prev?.revenue_per_room_type || [])
            }));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const getPaymentStatusColor = (status) => {
        return status === "Paid" || status === "paid"
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
                            <p className="text-gray-600 font-medium">Total Bookings</p>
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
                            <p className="text-gray-600 font-medium">Total Revenue (Paid)</p>
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

            {/* All Bookings Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">All Bookings</h2>
                </div>

                <div className="overflow-x-auto">
                    {localBookings.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No bookings yet
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Room Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Room Type
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Address
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Check-In
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Check-Out
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Total
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Payment Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {localBookings.map((booking, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-800">
                                            {booking.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {booking.roomType}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {booking.address}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(booking.checkIn).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(booking.checkOut).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                                            ${booking.total}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;