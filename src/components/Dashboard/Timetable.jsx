import React, { useState, useEffect } from "react";
import "./Timetable.css";

// ---------- Helper: create time slots ----------
function generateTimeSlots(isSaturday = false) {
  const slots = [];
  let start = 7 * 60 + 30; // 7:30
  const end = isSaturday ? 11 * 60 : 12 * 60 + 30; // Sat 11:00, else 12:30
  const breakStart = 10 * 60;
  const breakEnd = 10 * 60 + 30;

  while (start < end) {
    if (start === breakStart) {
      slots.push("Break");
      start = breakEnd;
      continue;
    }
    const next = start + 30;
    const fmt = (m) => {
      const h = Math.floor(m / 60);
      const min = (m % 60).toString().padStart(2, "0");
      return `${h}:${min}`;
    };
    slots.push(`${fmt(start)} - ${fmt(next)}`);
    start = next;
  }
  return slots;
}

// ---------- Data ----------
const subjects = [
  "Marathi", "Hindi", "English",
  "Maths 1", "Maths 2", "Science 1", "Science 2",
  "History", "Geography"
];
const classes = ["9", "10"];
const divisions = ["A", "B", "C"];
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Fisher–Yates Shuffle
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Timetable() {
  const [selectedClass, setSelectedClass] = useState("9");
  const [selectedDiv, setSelectedDiv] = useState("A");
  const [slots, setSlots] = useState([]);
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timetableExists, setTimetableExists] = useState(false);

  // Check if timetable already exists
  useEffect(() => {
    const fetchExisting = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/timetable/${selectedClass}/${selectedDiv}`
        );
        if (res.ok) {
          const data = await res.json();
          setTable(data.timetable);
          setSlots(data.timetable[0].slots.map((s) => s.time));
          setTimetableExists(true);
        } else {
          setTable([]);
          setSlots([]);
          setTimetableExists(false);
        }
      } catch (err) {
        console.error(err);
        setTable([]);
        setSlots([]);
        setTimetableExists(false);
      }
    };
    fetchExisting();
  }, [selectedClass, selectedDiv]);

  const handleGenerate = async () => {
    setLoading(true);

    // Generate timetable data
    const satSlots = generateTimeSlots(true);
    const normalSlots = generateTimeSlots(false);
    const tSlots = normalSlots; // column headers (Mon-Fri)

    const timetableData = weekdays.map((day) => {
      const isSat = day === "Sat";
      const dailySlots = isSat ? satSlots : tSlots;
      const dailySubjects = shuffle(subjects);
      const slots = dailySlots.map(
        (s, idx) => (s === "Break" ? "Break" : dailySubjects[idx % dailySubjects.length])
      );

      return {
        day,
        slots: slots.map((subject, idx) => ({
          time: dailySlots[idx],
          subject
        }))
      };
    });

    setSlots(tSlots);
    setTable(timetableData);

    // POST to backend
    try {
      const res = await fetch(`http://localhost:5000/api/timetable/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          standard: selectedClass,
          division: selectedDiv,
          timetable: timetableData
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Server error");
      }

      const result = await res.json();
      alert(result.message || "Timetable saved successfully!");
      setTimetableExists(true); // timetable is now created
    } catch (err) {
      console.error("Error saving timetable:", err);
      alert("Error saving timetable: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="timetable-container">
      <h2>Generate Timetable</h2>

      <div className="selector">
        <label>
          Class:
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            {classes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>

        <label>
          Division:
          <select value={selectedDiv} onChange={(e) => setSelectedDiv(e.target.value)}>
            {divisions.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>

        <button
          className="generate-btn"
          onClick={handleGenerate}
          disabled={loading || timetableExists}
        >
          {loading
            ? "Generating..."
            : timetableExists
            ? "Timetable Already Created"
            : "Generate Timetable"}
        </button>
      </div>

      {table.length > 0 && (
        <div className="table-wrapper">
          <h3>
            {selectedClass} - Division {selectedDiv}
          </h3>
          <table className="time-table">
            <thead>
              <tr>
                <th>Day</th>
                {slots.map((s, i) => (
                  <th key={i}>{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.map((day) => (
                <tr key={day.day}>
                  <td className="day-col">{day.day}</td>
                  {day.slots.map((slot, idx) => (
                    <td key={idx} className={slot.subject === "Break" ? "break-cell" : ""}>
                      {slot.subject}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
