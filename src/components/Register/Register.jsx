import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import "./Register.css";

export default function Register() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [success, setSuccess] =
    useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const showToast = (
    type,
    message
  ) => {

    if (type === "error") {

      setError(message);

      setSuccess("");

      setTimeout(() => {
        setError("");
      }, 3500);

    } else {

      setSuccess(message);

      setError("");

      setTimeout(() => {
        setSuccess("");
      }, 3500);

    }
  };

  const handleRegister = () => {

    let users =
      JSON.parse(
        localStorage.getItem(
          "users"
        )
      ) || [];

    const email =
      form.email.trim();

    const password =
      form.password.trim();

    // EMPTY CHECK
    if (!email || !password) {

      showToast(
        "error",
        "Email va passwordni kiriting ⚠️"
      );

      return;
    }

    // EMAIL CHECK
    if (!email.includes("@")) {

      showToast(
        "error",
        "Email noto‘g‘ri kiritildi ❌"
      );

      return;
    }

    // PASSWORD LENGTH
    if (password.length < 8) {

      showToast(
        "error",
        "Parol kamida 8 ta belgidan iborat bo‘lishi kerak ❌"
      );

      return;
    }

    const exists =
      users.find(
        (u) =>
          u.email === email
      );

    if (exists) {

      showToast(
        "error",
        "Bu email allaqachon mavjud ❌"
      );

      return;
    }

    // SAVE USER
    users.push({
      email,
      password,
    });

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    showToast(
      "success",
      "Muvaffaqiyatli ro‘yxatdan o‘tildi ✅"
    );

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (

    <div className="register-container">

      {/* TOASTS */}
      <div className="toast-container">

        {/* ERROR */}
        {error && (

          <div className="toast-msg error-toast">

            <div className="toast-content">

              <span className="toast-icon-error">

                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>

              </span>

              <span>{error}</span>

            </div>

            <button
              className="toast-close-btn"
              onClick={() =>
                setError("")
              }
            >
              ✕
            </button>

            <div className="toast-progress"></div>

          </div>

        )}

        {/* SUCCESS */}
        {success && (

          <div className="toast-msg success-toast">

            <div className="toast-content">

              <span className="toast-icon-success">

                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>

              </span>

              <span>{success}</span>

            </div>

            <button
              className="toast-close-btn"
              onClick={() =>
                setSuccess("")
              }
            >
              ✕
            </button>

            <div className="toast-progress"></div>

          </div>

        )}

      </div>

      {/* FORM */}
      <div className="auth-box">

        <h2>
          Ro‘yxatdan o‘tish
        </h2>

        <p>
          Yangi account yarating
        </p>

        {/* EMAIL */}
        <div className="input-group">

          <input
            type="email"
            name="email"
            placeholder="Email@gmail.com"
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
            placeholder="Kamida 8 ta belgi"
            onChange={handleChange}
            value={form.password}
          />

          {/* EYE */}
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

        <span className="password-info">
          Parol kamida 8 ta belgi bo‘lishi kerak
        </span>

        {/* BUTTON */}
        <button
          className="register-btn"
          onClick={handleRegister}
        >
          Register
        </button>

        {/* LOGIN */}
        <NavLink
          to="/login"
          className="switch-link"
        >
          Allaqachon
          account bormi?
          <span> Kirish</span>
        </NavLink>

      </div>

    </div>
  );
}