import React, { useState } from "react";

const Attendance = () => {
  const styles = {
    container: {
      maxWidth: "700px",
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
    calendar: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "10px",
    },
    day: {
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      textAlign: "center",
      cursor: "pointer",
      background: "#f9f9f9",
      transition: "0.3s",
    },
    present: {
      background: "#27ae60",
      color: "#fff",
      fontWeight: "bold",
    },
    weekday: {
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "10px",
      color: "#34495e",
    },
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Weekday labels
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [attendance, setAttendance] = useState([]);

  const toggleAttendance = (day) => {
    if (attendance.includes(day)) {
      setAttendance(attendance.filter((d) => d !== day));
    } else {
      setAttendance([...attendance, day]);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Attendance - {today.toLocaleString("default", { month: "long" })} {year}</h2>

      {/* Weekdays Header */}
      <div style={styles.calendar}>
        {weekdays.map((day, idx) => (
          <div key={idx} style={styles.weekday}>{day}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div style={styles.calendar}>
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            style={{
              ...styles.day,
              ...(attendance.includes(day) ? styles.present : {}),
            }}
            onClick={() => toggleAttendance(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attendance;
