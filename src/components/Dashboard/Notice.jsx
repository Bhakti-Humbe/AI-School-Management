import React, { useEffect, useState } from "react";
import "./Notice.css";

const Notice = ({ user }) => {
  const [standard, setStandard] = useState(user.std || "9");
  const [division, setDivision] = useState(user.div || "A");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);

  const classes = ["9", "10"];
  const divisions = ["A", "B", "C"];
  

  // ✅ Fetch notices
  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/notice/student/${encodeURIComponent(standard)}/${encodeURIComponent(division)}`
      );
      if (!res.ok) throw new Error("Failed to fetch notices");
      const data = await res.json();
      setNotices(data);
    } catch (err) {
      console.error("Failed to fetch notices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [standard, division]);

  // ✅ Teacher creates notice
  const handleCreateNotice = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Title and description are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/notice/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, standard, division }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Server error");

      alert(data.message);
      setTitle("");
      setDescription("");
      fetchNotices();
    } catch (err) {
      console.error("Error creating notice:", err);
      alert(err.message);
    }
  };
  console.log("Current Standard:", standard, "Division:", division);

  return (
    <div className="notice-container">
      <h2>Class Notices</h2>

      {user.role === "teacher" && (
        <div className="create-notice">
          <label>
            Class:
            <select value={standard} onChange={(e) => setStandard(e.target.value)}>
              {classes.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>

          <label>
            Division:
            <select value={division} onChange={(e) => setDivision(e.target.value)}>
              {divisions.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </label>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button onClick={handleCreateNotice}>Create Notice</button>
        </div>
      )}

      <div className="notice-list">
        {loading ? (
          <p>Loading notices...</p>
        ) : notices.length === 0 ? (
          <p>No notices found for {standard} {division}.</p>
        ) : (
          <ul>
            {notices.map((n) => (
              <li key={n._id}>
                <h4>{n.title}</h4>
                <p>{n.description}</p>
                <span className="notice-date">
                  {new Date(n.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notice;
