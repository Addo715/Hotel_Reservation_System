import React, { useState } from "react";
import Dashboard from "./Dashboard";
import RoomList from "./RoomList";
// import RoomManagement from "./RoomManagement";
import RoomManagement from "./Roommanagement";
import Sidebar from "../../Components/AdminComponents/Sidebar";
import Header from "../../Components/AdminComponents/Header";

const AdminPage=() =>{
  const [currentRoute, setCurrentRoute] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pageComponents = {
    'dashboard': Dashboard,
    'room-management': RoomManagement,
    'room-list': RoomList
  };

  const CurrentPage = pageComponents[currentRoute] || Dashboard;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentRoute={currentRoute} 
        setCurrentRoute={setCurrentRoute}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto">
          <CurrentPage />
        </main>
      </div>
    </div>
  );
}

export default AdminPage