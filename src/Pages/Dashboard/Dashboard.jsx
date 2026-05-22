// Dashboard.jsx

import React, {
  useMemo,
  useState,
  useEffect,
} from "react";

import "./Dashboard.css";

import {
  Plus,
  Moon,
  Sun,
  Clock3,
  CalendarDays,
  CircleAlert,
  Trash2,
  X,
} from "lucide-react";

export default function Dashboard() {

  const getInitialTasks = () => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  };

  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [tasks, setTasks] = useState(getInitialTasks);

  const [form, setForm] = useState({
    title: "",
    desc: "",
    date: "",
    time: "",
    priority: "ortacha",
  });

  /* =========================
     SAVE TASKS
  ========================= */
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  /* =========================
     DARK MODE
  ========================= */
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const today = new Date().toISOString().split("T")[0];

  const todayTasks = useMemo(() => {
    return tasks
      .filter((task) => task.date === today)
      .sort((a, b) => {
        return (
          new Date(`${a.date} ${a.time}`) -
          new Date(`${b.date} ${b.time}`)
        );
      });
  }, [tasks]);

  const weeklyTasks = useMemo(() => {
    return tasks.filter((task) => task.date !== today);
  }, [tasks]);

  /* =========================
     ADD TASK (DESC OPTIONAL)
  ========================= */
  const addTask = () => {
    if (!form.title || !form.date || !form.time) {
      alert("Vazifa nomi, sana va vaqt majburiy!");
      return;
    }

    if (form.title.trim().length < 6) {
      alert("Vazifa nomi kamida 6 ta belgidan iborat bo‘lishi kerak!");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: form.title,
      desc: form.desc || "", // ✅ OPTIONAL FIELD
      date: form.date,
      time: form.time,
      priority: form.priority,
    };

    setTasks([...tasks, newTask]);

    setForm({
      title: "",
      desc: "",
      date: "",
      time: "",
      priority: "ortacha",
    });

    setModalOpen(false);
  };

  /* =========================
     DELETE TASK
  ========================= */
  const deleteTask = () => {
    setTasks(tasks.filter((task) => task.id !== selectedTask));
    setDeleteModal(false);
  };

  return (
    <div className="dashboard">

      {/* =========================
          HEADER
      ========================= */}
      <div className="dashboard-top">

        <div>
          <h1>Bugungi vazifalar</h1>
          <p>Muhimlik va vaqt bo‘yicha</p>
        </div>

        <div className="top-buttons">

          <button
            className="add-btn"
            onClick={() => setModalOpen(true)}
          >
            <Plus size={16} />
            Qo‘shish
          </button>

        </div>

      </div>

      {/* =========================
          TODAY TASKS
      ========================= */}
      <div className="today-wrapper">

        {todayTasks.map((task) => (

          <div className="task-card" key={task.id}>

            <div className="wrapper">

              <button
                className="delete-btn"
                onClick={() => {
                  setSelectedTask(task.id);
                  setDeleteModal(true);
                }}
              >
                <X size={14} />
              </button>

              <div className="task-left">

                <div className="time-box">
                  <Clock3 size={16} />
                  <span>{task.time}</span>
                </div>

                <div className="task-info">
                  <h3>{task.title}</h3>

                  {/* ✅ OPTIONAL DESC FIX */}
                  <p>{task.desc || "Tavsif yo‘q"}</p>

                </div>

              </div>
            </div>

            <div className={`priority ${task.priority}`}>
              <CircleAlert size={14} />
              {task.priority}
            </div>

          </div>

        ))}

      </div>

      {/* =========================
          WEEKLY TASKS
      ========================= */}
      <div className="weekly-wrapper">

        <div className="weekly-header">
          <h2>1 haftalik vazifalar</h2>
          <CalendarDays size={20} />
        </div>

        <div className="weekly-grid">

          {weeklyTasks.map((task) => (

            <div className="weekly-card" key={task.id}>

              <button
                className="delete-btn small"
                onClick={() => {
                  setSelectedTask(task.id);
                  setDeleteModal(true);
                }}
              >
                <X size={13} />
              </button>

              <span className="date">{task.date}</span>

              <h3>{task.title}</h3>

              {/* ✅ OPTIONAL DESC FIX */}
              <p>{task.desc || "Tavsif yo‘q"}</p>

              <div className="bottom">
                <div className="week-time">{task.time}</div>
                <div className={`priority ${task.priority}`}>
                  {task.priority}
                </div>
              </div>

            </div>

          ))}

        </div>

      </div>

      {/* =========================
          ADD MODAL
      ========================= */}
      {modalOpen && (
        <div className="overlay">

          <div className="modal">

            <div className="modal-top">
              <h2>Vazifa qo‘shish</h2>
              <button onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <input
              type="text"
              placeholder="Vazifa nomi (min 10 belgi)"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <textarea
              placeholder="Tavsif (ixtiyoriy)"
              value={form.desc}
              onChange={(e) =>
                setForm({ ...form, desc: e.target.value })
              }
            />

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
            />

            <input
              type="time"
              value={form.time}
              onChange={(e) =>
                setForm({ ...form, time: e.target.value })
              }
            />

            <select
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
            >
              <option value="yuqori">Yuqori</option>
              <option value="ortacha">O‘rtacha</option>
              <option value="past">Past</option>
            </select>

            <button className="save-btn" onClick={addTask}>
              Saqlash
            </button>

          </div>

        </div>
      )}

      {/* =========================
          DELETE MODAL
      ========================= */}
      {deleteModal && (
        <div className="overlay">

          <div className="delete-modal">

            <Trash2 size={45} />
            <h2>O‘chirasizmi?</h2>
            <p>Bu amalni bekor qilib bo‘lmaydi</p>

            <div className="delete-actions">

              <button
                className="cancel-btn"
                onClick={() => setDeleteModal(false)}
              >
                Bekor
              </button>

              <button className="confirm-btn" onClick={deleteTask}>
                O‘chirish
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}   