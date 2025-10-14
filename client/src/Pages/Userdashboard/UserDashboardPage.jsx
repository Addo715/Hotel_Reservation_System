import React, { useState } from 'react'
import Dashboard from './Dashboard'
import UserSidebar from '../../Components/UserDashboardComponents/UserSidebar'
import UserHeader from '../../Components/UserDashboardComponents/UserHeader'
// import NewNavbar from '../../Components/UserDashboardComponents/NewNavbar'

const UserDashboardPage = () => {
    
    const [currentRoute, setCurrentRoute] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const pageComponents = {
    'dashboard': Dashboard,
    // 'room-management': RoomManagement,
    // 'room-list': RoomList
  };

     const CurrentPage = pageComponents[currentRoute] || Dashboard;
  return (
    <div>
        {/* <NewNavbar/> */}
        {/* <div className="mt-18"></div> */}

   <div className="flex h-screen bg-gray-50 ">
      <UserSidebar
        currentRoute={currentRoute} 
        setCurrentRoute={setCurrentRoute}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <UserHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto">
          <CurrentPage />
        </main>
      </div>
    </div>
    </div>
  )
}

export default UserDashboardPage