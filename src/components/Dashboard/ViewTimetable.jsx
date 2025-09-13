import React, { useEffect, useState } from "react";
import "./ViewTimetable.css";

const ViewTimetable = ({ user }) => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user.std || !user.div) return;

    const fetchTimetable = async () => {
      setLoading(true);
      setError("");

      try {
        // Ensure standard matches DB format
        const standard = user.std.toString(); // just "9" or "10"


        const res = await fetch(
          `http://localhost:5000/api/timetable/${standard}/${user.div}`
        );

        if (res.status === 404) {
          setTimetable([]);
          setError("No timetable found for your class.");
          return;
        }

        if (!res.ok) throw new Error("Server error while fetching timetable");

        const data = await res.json();

        if (!data?.timetable?.length) {
          setTimetable([]);
          setError("No timetable found for your class.");
          return;
        }

        // Format timetable
        const formatted = data.timetable.map((day) => ({
          day: day.day,
          slots: day.slots.map((slot) => ({
            time: slot.time,
            subject: slot.subject,
          })),
        }));

        setTimetable(formatted);
      } catch (err) {
        console.error("Failed to fetch timetable", err);
        setError("Failed to load timetable. Please try again later.");
        setTimetable([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [user.std, user.div]);

  if (loading) return <p>Loading timetable...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="timetable-container">
      <h2>
        {user.std} {user.div} Class Timetable
      </h2>
      <table className="timetable-table">
        <thead>
          <tr>
            <th>Day</th>
            {timetable[0]?.slots.map((slot, i) => (
              <th key={i}>{slot.time}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timetable.map((day, i) => (
            <tr key={i}>
              <td>{day.day}</td>
              {day.slots.map((slot, j) => (
                <td
                  key={j}
                  className={slot.subject === "Break" ? "break-cell" : ""}
                >
                  {slot.subject}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTimetable;
