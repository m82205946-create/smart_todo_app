import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

import "./Layout.css";

export default function Layout({
  darkMode,
  setDarkMode,
  setUser,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <div className={`layout ${darkMode ? "dark" : ""}`}>

      {/* SIDEBAR */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setUser={setUser}
      />

      {/* RIGHT SIDE */}
      <div className="layout-right">

        {/* HEADER */}
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setUser={setUser}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* CONTENT */}
        <main className="layout-content">
          <Outlet />
        </main>

      </div>
    </div>
  );
}