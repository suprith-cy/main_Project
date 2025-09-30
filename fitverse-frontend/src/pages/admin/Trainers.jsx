// src/pages/admin/trainers.jsx
import React, { useState, useEffect } from "react";
import "../../styles/AdminTrainer.css";

const trainers = () => {
  const [trainers, settrainers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingtrainerId, setEditingtrainerId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    status: "Active",
    date_of_joining: new Date().toISOString().split("T")[0],
  });

  // Fetch trainers
  useEffect(() => {
    fetchtrainers();
  }, []);

  const fetchtrainers = () => {
    fetch("http://127.0.0.1:8000/api/routes/admin/trainers/")
      .then((res) => res.json())
      .then((data) => settrainers(data))
      .catch((err) => console.error(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openAddModal = () => {
    setEditingtrainerId(null);
    setFormData({
      name: "",
      email: "",
      username: "",
      status: "Active",
      date_of_joining: new Date().toISOString().split("T")[0],
    });
    setShowModal(true);
  };

  const openEditModal = (trainer) => {
    setEditingtrainerId(trainer.id);
    setFormData({
      name: trainer.name,
      email: trainer.email,
      username: trainer.username,
      status: trainer.status || "Active",
      date_of_joining: trainer.date_of_joining,
    });
    setShowModal(true);
  };

  const savetrainer = async () => {
    const url = editingtrainerId
      ? `http://127.0.0.1:8000/api/routes/admin/trainers/${editingtrainerId}/`
      : "http://127.0.0.1:8000/api/routes/admin/trainers/";

    const method = editingtrainerId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to save trainer");

      await response.json();
      fetchtrainers();
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/routes/admin/trainers/${id}/`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete");
      settrainers(trainers.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="trainers-container">
      <div className="trainers-header">
        <h2>Trainer Management</h2>
        <button className="btn-primary" onClick={openAddModal}>
          + Add trainer
        </button>
      </div>

      {/* trainers Table */}
      <div className="card">
        <table className="trainers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer) => (
              <tr key={trainer.id}>
                <td>{trainer.name}</td>
                <td>{trainer.email}</td>
                <td>{trainer.username}</td>
                <td>{trainer.date_of_joining}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => openEditModal(trainer)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(trainer.id)}
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
            <h3>{editingtrainerId ? "Edit trainer" : "Add New trainer"}</h3>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
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

            <div className="modal-actions">
              <button className="btn-primary" onClick={savetrainer}>
                {editingtrainerId ? "Update" : "Add"}
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

export default trainers;
