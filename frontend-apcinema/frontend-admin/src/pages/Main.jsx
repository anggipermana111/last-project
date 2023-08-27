import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Main() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <main className="w-full flex bg-gray-100 relative h-[calc(100vh-5rem)]">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Outlet/>
      </main>
    </>
  )
}