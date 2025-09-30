// src/pages/admin/Members.jsx
import React, { useState, useEffect } from "react";
import "../../styles/AdminMember.css";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    plan: "",
    status: "Active",
    date_of_joining: new Date().toISOString().split("T")[0],
  });

  // Fetch members
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = () => {
    fetch("http://127.0.0.1:8000/api/routes/admin/members/")
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => console.error(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openAddModal = () => {
    setEditingMemberId(null);
    setFormData({
      name: "",
      email: "",
      username: "",
      plan: "",
      status: "Active",
      date_of_joining: new Date().toISOString().split("T")[0],
    });
    setShowModal(true);
  };

  const openEditModal = (member) => {
    setEditingMemberId(member.id);
    setFormData({
      name: member.name,
      email: member.email,
      username: member.username,
      plan: member.plan,
      status: member.status || "Active",
      date_of_joining: member.date_of_joining,
    });
    setShowModal(true);
  };

  const saveMember = async () => {
    const url = editingMemberId
      ? `http://127.0.0.1:8000/api/routes/admin/members/${editingMemberId}/`
      : "http://127.0.0.1:8000/api/routes/admin/members/";

    const method = editingMemberId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to save member");

      await response.json();
      fetchMembers();
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/routes/admin/members/${id}/`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete");
      setMembers(members.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="members-container">
      <div className="members-header">
        <h2>Member Management</h2>
        <button className="btn-primary" onClick={openAddModal}>
          + Add Member
        </button>
      </div>

      {/* Members Table */}
      <div className="card">
        <table className="members-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Plan</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.username}</td>
                <td>{member.plan}</td>
                <td>{member.date_of_joining}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => openEditModal(member)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(member.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingMemberId ? "Edit Member" : "Add New Member"}</h3>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Date of Joining</label>
              <input
                type="date"
                name="date_of_joining"
                value={formData.date_of_joining}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Plan</label>
              <select
                name="plan"
                value={formData.plan}
                onChange={handleInputChange}
              >
                <option value="">Select Plan</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="btn-primary" onClick={saveMember}>
                {editingMemberId ? "Update" : "Add"}
              </button>
              <button
                className="btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
