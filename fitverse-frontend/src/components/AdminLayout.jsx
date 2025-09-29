import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/AdminLayout.css"; 

const AdminLayout = () => {
  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h1 className="sidebar-title">FitVerse Admin</h1>
        <nav className="nav-links">
          <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/admin/members" className="nav-link">Members</Link>
          <Link to="/admin/trainers" className="nav-link">Trainers</Link>
          <Link to="/admin/profile" className="nav-link">Profile</Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
