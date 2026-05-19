import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import "./Layout.css";

// setIsAuth o'rniga App.js dan kelayotgan setUser ni qabul qilamiz
export default function Layout({ darkMode, setDarkMode, setUser }) {
  return (
    <div className={darkMode ? "layout dark" : "layout"}>
      <Sidebar />

      <div className="layout-right">
        {/* Headerga o'sha logout funksiyasini to'g'ri uzatamiz */}
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onLogout={setUser} 
        />

        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}