import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        // alert("Login successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.user.name);
            localStorage.setItem("role", data.user.role); // "student" or "teacher"
            localStorage.setItem("userId", data.user.id); // save user ID
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="auth-input"
          onChange={handleChange}
          value={formData.email}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="auth-input"
          onChange={handleChange}
          value={formData.password}
          required
        />

        <select
          name="role"
          className="auth-input"
          onChange={handleChange}
          value={formData.role}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button type="submit" className="auth-button">
          Login
        </button>

        <p className="auth-text">
          Don’t have an account?{" "}
          <a href="/register" className="auth-link">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
