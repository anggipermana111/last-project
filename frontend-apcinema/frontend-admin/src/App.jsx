import { Outlet } from "react-router-dom";
import React, { useState } from 'react';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import FilmForm from "./pages/FilmForm";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      {/* <Header/> */}
      {/* <Login/> */}
      {/* <Register/> */}
      {/* <DashboardLayout>
      </DashboardLayout> */}
      {/* <Outlet/> */}

      <Header toggleSidebar={toggleSidebar} />
      <main className="w-full flex bg-gray-100 relative">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        {/* <Outlet /> */}
        <FilmForm/>
      </main>
    </>
  )
}