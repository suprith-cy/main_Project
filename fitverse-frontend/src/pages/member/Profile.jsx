import React from "react";

const Profile = () => {
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#2c3e50",
    },
    field: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      fontWeight: "bold",
      marginBottom: "5px",
      color: "#34495e",
    },
    value: {
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      background: "#f9f9f9",
      color: "#333",
    },
  };

  // Dummy data (later fetch this from backend)
  const memberData = {
    name: "John Doe",
    email: "johndoe@example.com",
    age: 25,
    gender: "Male",
    membership: "Gold",
    joinDate: "2025-01-10",
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Member Profile</h2>

      <div style={styles.field}>
        <label style={styles.label}>Name</label>
        <div style={styles.value}>{memberData.name}</div>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Email</label>
        <div style={styles.value}>{memberData.email}</div>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Age</label>
        <div style={styles.value}>{memberData.age}</div>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Gender</label>
        <div style={styles.value}>{memberData.gender}</div>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Membership</label>
        <div style={styles.value}>{memberData.membership}</div>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Join Date</label>
        <div style={styles.value}>{memberData.joinDate}</div>
      </div>
    </div>
  );
};

export default Profile;
