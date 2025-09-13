import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Profile from "./Profile";
import Timetable from "./Timetable";
import ViewTimetable from "./ViewTimetable";
import Notice from "./Notice";
import Assignment from "./Assignment"; // ✅ Assignment component

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", role: "", std: "", div: "" });
  const [activeTab, setActiveTab] = useState("Profile");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          ...data,
          std: data.std || localStorage.getItem("std"),
          div: data.div || localStorage.getItem("div"),
        });
      })
      .catch((err) => console.error(err));
  }, [navigate]);

  const studentMenu = ["Profile", "Assignments", "Notice", "View Timetable"];
  const teacherMenu = ["Profile", "Timetable", "Class Assignments", "Notice"];
  const menuItems = user.role === "teacher" ? teacherMenu : studentMenu;

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="sidebar-title">
          {user.role === "teacher" ? "Teacher" : "Student"} Panel
        </h2>
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`menu-item ${activeTab === item ? "active" : ""}`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </li>
          ))}
          <li className="menu-item logout" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </aside>

      <main className="main-content">
        {activeTab === "Profile" && <Profile user={user} />}
        {activeTab === "Timetable" && user.role === "teacher" && <Timetable />}
        {activeTab === "View Timetable" && user.role === "student" && (
          <ViewTimetable user={user} />
        )}
        {activeTab === "Notice" && <Notice user={user} />}

        {activeTab === "Assignments" && user.role === "student" && (
          <Assignment user={user} />
        )}
        {activeTab === "Class Assignments" && user.role === "teacher" && (
          <Assignment user={user} />
        )}

        {activeTab !== "Profile" &&
         activeTab !== "Timetable" &&
         activeTab !== "View Timetable" &&
         activeTab !== "Notice" &&
         activeTab !== "Assignments" &&
         activeTab !== "Class Assignments" && (
          <>
            <h1 className="welcome">Welcome, {user.name} 👋</h1>
            <p className="info-text">
              Here you can manage your{" "}
              {user.role === "teacher"
                ? "classes, assignments, and notices"
                : "assignments and attendance"}.
            </p>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
