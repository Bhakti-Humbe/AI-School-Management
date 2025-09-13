import React from "react";
import "./Profile.css";

const Profile = ({ user }) => {
  if (!user || !user.name) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">{user.name} {user.surname}</h2>

      <div className="profile-details">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Role:</strong> {user.role}</p>
        {user.role === "student" && (
          <>
            <p><strong>Standard:</strong> {user.std}</p>
            <p><strong>Division:</strong> {user.div}</p>
            <p><strong>Roll No:</strong> {user.rollno}</p>
            <p><strong>Address:</strong> {user.address}</p>
          </>
        )}
        {user.role === "teacher" && (
          <>
            <p><strong>Address:</strong> {user.address}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
