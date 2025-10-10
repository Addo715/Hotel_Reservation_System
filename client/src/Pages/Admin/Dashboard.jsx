import { Users, DollarSign, Home, Eye } from 'lucide-react';

const Dashboard = () => {
  const bookings = [
    { 
      id: 'BKG-0001', 
      name: 'Tommy Bernal', 
      email: 'tommy.bernal@example.com', 
      roomType: 'Double bed', 
      totalAmount: '$350',
      paymentStatus: 'Completed'
    },
    { 
      id: 'BKG-0002', 
      name: 'Ellen Thill', 
      email: 'ellen.thill@example.com', 
      roomType: 'Double bed', 
      totalAmount: '$350',
      paymentStatus: 'Completed'
    },
    { 
      id: 'BKG-0003', 
      name: 'Corina Kelsey', 
      email: 'corina.kelsey@example.com', 
      roomType: 'Single bed', 
      totalAmount: '$180',
      paymentStatus: 'Pending'
    },
    { 
      id: 'BKG-0004', 
      name: 'Carolyn Lane', 
      email: 'carolyn.lane@example.com', 
      roomType: 'Double bed', 
      totalAmount: '$350',
      paymentStatus: 'Completed'
    },
    { 
      id: 'BKG-0005', 
      name: 'Denise', 
      email: 'denise.williams@example.com', 
      roomType: 'Single bed', 
      totalAmount: '$180',
      paymentStatus: 'Pending'
    },
  ];

  const getPaymentStatusColor = (status) => {
    return status === 'Completed' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Good Morning Emmanuel</h1>
        <p className="text-gray-600">Dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-4xl font-bold text-blue-500 mb-2">236</h3>
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
              <h3 className="text-4xl font-bold text-blue-500 mb-2">$45,230</h3>
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
              <h3 className="text-4xl font-bold text-blue-500 mb-2">30</h3>
              <p className="text-gray-600 font-medium">Available Rooms</p>
            </div>
            <div className="bg-teal-50 p-3 rounded-full">
              <Home className="text-blue-500" size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Booking</h2>
          {/* <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
            View All
          </button> */}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Booking ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                {/* <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email ID</th> */}
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Room Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-800">{booking.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{booking.name}</td>
                  {/* <td className="px-6 py-4 text-sm text-blue-500">{booking.email}</td> */}
                  <td className="px-6 py-4 text-sm text-gray-800">{booking.roomType}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{booking.totalAmount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase ${getPaymentStatusColor(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </span>
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