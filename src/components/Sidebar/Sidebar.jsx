import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  X,
  User,
} from "lucide-react";

import { useEffect, useState } from "react";
import "./Sidebar.css";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  setUser,
}) {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);

  // detect screen size
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () =>
      window.removeEventListener("resize", checkScreen);
  }, []);

  // logout
  const handleLogout = () => {
    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };

  // mobile nav click => close sidebar
  const handleNavClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // profile click
  const handleProfileClick = () => {
    if (isMobile) return;

    alert("Profile opened (desktop only)");
  };

  return (
    <>
      {/* overlay */}
      {sidebarOpen && (
        <div
          className="overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >

        {/* TOP */}
        <div className="sidebar-top">

          <h2 className="logo">
            Smart Todo App
          </h2>

          <button
            className="close-btn"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>

        </div>

        {/* CONTENT */}
        <div className="sidebar-content">

          {/* NAV */}
          <nav className="sidebar-nav">

            <NavLink
              to="/dashboard"
              end
              className="nav-link"
              onClick={handleNavClick}
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/habits"
              className="nav-link"
              onClick={handleNavClick}
            >
              <Calendar size={20} />
              <span>Habits</span>
            </NavLink>

            <NavLink
              to="/tasks"
              className="nav-link"
              onClick={handleNavClick}
            >
              <BarChart3 size={20} />
              <span>Tasks</span>
            </NavLink>

            <NavLink
              to="/settings"
              className="nav-link"
              onClick={handleNavClick}
            >
              <Settings size={20} />
              <span>Settings</span>
            </NavLink>

          </nav>

      
        
        </div>

        {/* LOGOUT */}
        <div className="sidebar-bottom">

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>

        </div>

      </aside>
    </>
  );
}