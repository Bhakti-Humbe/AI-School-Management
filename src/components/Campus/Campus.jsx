
import React, { useState } from "react";
import "./Campus.css";

// ✅ Sample images (replace with your own paths from /assets or /public)
import classroom1 from "../../assets/classroom1.jpg";
import classroom2 from "../../assets/classroom2.jpg";
import canteen1 from "../../assets/canteen1.jpg";
import lab1 from "../../assets/lab1.jpg";
import playground1 from "../../assets/playground1.jpg";
import library1 from "../../assets/library1.jpg";

const allImages = [
  { id: 1, category: "Classroom", src: classroom1 },
  { id: 2, category: "Classroom", src: classroom2 },
  { id: 3, category: "Canteen", src: canteen1 },
  { id: 4, category: "Laboratory", src: lab1 },
  { id: 5, category: "Playground", src: playground1 },
  { id: 6, category: "Library", src: library1 },
  // 👉 add more images as needed
];

const categories = ["All", "Classroom", "Canteen", "Laboratory", "Playground", "Library"];

const Campus = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ Filter logic
  const filteredImages =
    selectedCategory === "All"
      ? allImages
      : allImages.filter((img) => img.category === selectedCategory);

  return (
    <div className="campus-life">
      <h2>Campus Life</h2>

      {/* Filter Buttons */}
      <div className="filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid-container">
        {filteredImages.map((img) => (
          <div key={img.id} className="grid-item">
            <img src={img.src} alt={img.category} />
            <p>{img.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campus;

