import React, { useEffect, useState } from "react";
import "./Assignment.css";

const Assignment = ({ user }) => {
  const [standard, setStandard] = useState(user.std || "9");
  const [division, setDivision] = useState(user.div || "A");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  const classes = ["9", "10"];
  const divisions = ["A", "B", "C"];

  // Fetch assignments for students
  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/assignment/student/${encodeURIComponent(standard)}/${encodeURIComponent(division)}`
      );
      const data = await res.json();
      setAssignments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [standard, division]);

  // Teacher creates assignment
  const handleCreate = async () => {
    if (!title || !description || !dueDate)
      return alert("All fields required");
    try {
      const res = await fetch("http://localhost:5000/api/assignment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ standard, division, title, description, dueDate }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert(data.message);
      setTitle("");
      setDescription("");
      setDueDate("");
      fetchAssignments();
    } catch (err) {
      alert(err.message);
    }
  };

  // Student marks complete
  const markComplete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/assignment/complete/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: user._id, studentName: user.name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      fetchAssignments();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="assignment-container">
      <h2>Assignments</h2>

      {user.role === "teacher" && (
        <div className="create-assignment">
          <label>
            Class:
            <select value={standard} onChange={(e) => setStandard(e.target.value)}>
              {classes.map(c => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label>
            Division:
            <select value={division} onChange={(e) => setDivision(e.target.value)}>
              {divisions.map(d => <option key={d}>{d}</option>)}
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
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button onClick={handleCreate}>Create Assignment</button>
        </div>
      )}

      <div className="assignment-list">
        {loading ? (
          <p>Loading...</p>
        ) : assignments.length === 0 ? (
          <p>No assignments found.</p>
        ) : (
          <ul>
            {assignments.map((a) => (
              <li key={a._id}>
                <h4>{a.title}</h4>
                <p>{a.description}</p>
                <p>Due: {new Date(a.dueDate).toLocaleDateString()}</p>

                {user.role === "student" && (
                  <button
                    disabled={a.completedBy?.some(c => c.studentId === user._id)}
                    onClick={() => markComplete(a._id)}
                  >
                    {a.completedBy?.some(c => c.studentId === user._id)
                      ? "Completed ✅"
                      : "Mark Complete"}
                  </button>
                )}

                {user.role === "teacher" && (
                  <details>
                    <summary>Completed Students ({a.completedBy.length})</summary>
                    <ul>
                      {a.completedBy.map((s, i) => (
                        <li key={i}>{s.studentName}</li>
                      ))}
                    </ul>
                  </details>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Assignment;
