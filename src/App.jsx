import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./Pages/Layout/Layout";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import Home from "./Pages/Home/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Habits from "./Pages/Habits/Habits";
import WeeklyTasks from "./Pages/WeeklyTasks/WeeklyTasks";
import Settings from "./Pages/Settings/Settings";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // ================= AUTH =================
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  // ================= HABITS =================
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // ================= LOGIN =================
  const handleLogin = (userData) => {
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setUser(userData);
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <ToastContainer position="top-right" autoClose={2000} />

      <BrowserRouter>
        <Routes>

          {/* ================= PUBLIC HOME ================= */}
          <Route path="/" element={<Home user={user} />} />

          {/* ================= LOGIN ================= */}
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login setUser={handleLogin} />
              )
            }
          />

          {/* ================= REGISTER ================= */}
          <Route
            path="/register"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Register />
              )
            }
          />

          {/* ================= PROTECTED AREA ================= */}
          <Route
            element={
              user ? (
                <Layout
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  setUser={handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >

            <Route
              path="/dashboard"
              element={<Dashboard habits={habits} />}
            />

            <Route
              path="/habits"
              element={<Habits habits={habits} setHabits={setHabits} />}
            />

            <Route
              path="/tasks"
              element={<WeeklyTasks habits={habits} />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

          </Route>

          {/* ================= CATCH ALL ================= */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;