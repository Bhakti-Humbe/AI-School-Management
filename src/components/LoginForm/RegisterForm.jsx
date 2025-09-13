import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './RegisterForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    role: "student",
    name: "",
    surname: "",
    std: "",
    div: "",
    rollno: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
          required
        />

        <input
          type="text"
          name="surname"
          placeholder="Surname"
          onChange={handleChange}
          value={formData.surname}
          required
        />

        {formData.role === "student" && (
          <>
            <input
              type="text"
              name="std"
              placeholder="Standard"
              onChange={handleChange}
              value={formData.std}
              required
            />

            <input
              type="text"
              name="div"
              placeholder="Division"
              onChange={handleChange}
              value={formData.div}
              required
            />

            <input
              type="text"
              name="rollno"
              placeholder="Roll Number"
              onChange={handleChange}
              value={formData.rollno}
              required
            />
          </>
        )}

        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          value={formData.address}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          value={formData.phone}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
        />

        <select
          name="role"
          onChange={handleChange}
          value={formData.role}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button type="submit">Register</button>

        <p>
          Already have an account?{" "}
          <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
