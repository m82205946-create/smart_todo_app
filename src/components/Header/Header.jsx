import {
  Moon,
  Sun,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Header.css";

export default function Header({
  darkMode,
  setDarkMode,
  setUser,
  sidebarOpen,
  setSidebarOpen,
}) {
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  // LOGOUT
  const logout = () => {
    if (typeof setUser === "function") {
      setUser(null);
    } else {
      localStorage.removeItem("currentUser");
    }

    setProfileOpen(false);
    navigate("/");
  };

  // ESC CLOSE
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setProfileOpen(false);
        setSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setSidebarOpen]);

  // OVERLAY CLOSE
  const closeAll = () => {
    setSidebarOpen(false);
    setProfileOpen(false);
  };

  return (
    <>
      {/* OVERLAY */}
      {(sidebarOpen || profileOpen) && (
        <div className="overlay" onClick={closeAll} />
      )}

      <header className="header">

        {/* MENU BUTTON (MOBILE SIDEBAR) */}
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* SEARCH */}
        <input className="search" placeholder="Search..." />

        {/* RIGHT SIDE */}
        <div className="header-right">

          {/* DARK MODE */}
          <button
            className="icon-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <Sun size={20} color="#fbbf24" />
            ) : (
              <Moon size={20} color="#64748b" />
            )}
          </button>

          {/* PROFILE */}
          <div className="avatar-wrapper">

           

            {/* DROPDOWN */}
            {profileOpen && (
              <div className="dropdown">

                <div className="dropdown-item" onClick={logout}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </div>

              </div>
            )}

          </div>
        </div>
      </header>
    </>
  );
}