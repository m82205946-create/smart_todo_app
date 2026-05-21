import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Eye, EyeOff } from "lucide-react";

import "./Login.css";

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    let users =
      JSON.parse(localStorage.getItem("users")) || [];

    const email = form.email.trim();

    const password = form.password.trim();

    // EMPTY CHECK
    if (!email || !password) {
      toast.error(
        "Email va passwordni to‘ldiring ❌"
      );
      return;
    }

    // PASSWORD LENGTH CHECK
    if (password.length < 8) {
      toast.error(
        "Parol kamida 8 ta belgidan iborat bo‘lishi kerak ❌"
      );
      return;
    }

    const user = users.find(
      (u) =>
        u.email?.trim() === email &&
        u.password?.trim() === password
    );

    if (!user) {
      toast.error(
        "Email yoki password noto‘g‘ri ❌"
      );
      return;
    }

    // SAFE USER
    const currentUser = {
      email: user.email,
      name:
        user.name ||
        user.email.split("@")[0],
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(currentUser)
    );

    setUser(currentUser);

    toast.success(
      "Muvaffaqiyatli login bo‘ldi ✅"
    );

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="login-container">

      <div className="auth-box">

        <h2>Login</h2>

        <p>Accountga kiring</p>

        {/* EMAIL */}
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email kiriting"
            onChange={handleChange}
            value={form.email}
          />
        </div>

        {/* PASSWORD */}
        <div className="input-group password-group">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            placeholder="Password kiriting"
            onChange={handleChange}
            value={form.password}
          />

          {/* EYE BUTTON */}
          <button
            type="button"
            className="eye-btn"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

        </div>

        {/* PASSWORD INFO */}
        <span className="password-info">
          Parol kamida 8 ta belgi bo‘lishi kerak
        </span>

        {/* LOGIN BUTTON */}
        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* REGISTER */}
        <NavLink
          to="/register"
          className="switch-link"
        >
          Account yo‘qmi?
          <span> Register</span>
        </NavLink>

      </div>

    </div>
  );
}