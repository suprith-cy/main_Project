import React from "react";
import { useNavigate } from "react-router-dom";

function Trainer() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome {username || "User"}!</h1>
      <p>Your role is: {role}</p>
      <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Logout
      </button>
    </div>
  );
}

export default Trainer;
