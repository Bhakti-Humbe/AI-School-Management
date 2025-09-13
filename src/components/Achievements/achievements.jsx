import React, { useState } from "react";
import "./achievements.css";

import ach1 from "../../assets/ach1.jpg";
import ach2 from "../../assets/ach2.jpg";
import ach3 from "../../assets/ach3.jpg";
import ach4 from "../../assets/ach4.jpg";
import ach5 from "../../assets/ach5.jpg";
import ach6 from "../../assets/ach6.jpg";

const achievementsData = [
  {
    id: 1,
    image: ach1,
    title: "Science Olympiad Winner",
    description: "Won 1st place in the National Science Olympiad 2025.",
  },
  {
    id: 2,
    image: ach2,
    title: "State-Level Sports Champion",
    description: "Gold medalist in state-level athletics competition.",
  },
  {
    id: 3,
    image: ach3,
    title: "Art Competition Finalist",
    description: "Selected as a finalist in an inter-school art competition.",
  },
  {
    id: 4,
    image: ach4,
    title: "Coding Hackathon",
    description: "Team won 2nd place in Junior Coding Hackathon 2025.",
  },
  {
    id: 5,
    image: ach5,
    title: "Quiz Competition",
    description: "Secured 3rd position in All-India School Quiz Contest.",
  },
  {
    id: 6,
    image: ach6,
    title: "Best School Award",
    description: "School awarded for excellence in academics and activities.",
  }
];

const achievements = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 3;

  const handleNext = () => {
    setStartIndex((prev) => (prev + itemsToShow) % achievementsData.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) =>
      (prev - itemsToShow + achievementsData.length) % achievementsData.length);
  };

  // Wrap-around logic (always 3 items visible)
  const visibleItems = [];
  for (let i = 0; i < itemsToShow; i++) {
    visibleItems.push(
      achievementsData[(startIndex + i) % achievementsData.length]
    );
  }

  return (
    <div className="achievement-section">
      <h2>Our Achievements</h2>

      <div className="achievement-wrapper">
        {/* Left Button */}
        <div className="navigation-buttons">
          <button onClick={handlePrev}>&lt;</button>
        </div>

        {/* Cards */}
        <div className="achievement-cards">
          {visibleItems.map((item) => (
            <div key={item.id} className="achievement-box">
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <div className="navigation-buttons">
          <button onClick={handleNext}>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default achievements;
