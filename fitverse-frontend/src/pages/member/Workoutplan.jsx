import React, { useState } from "react";

const WorkoutPlan = () => {
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
    exercise: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px",
      borderBottom: "1px solid #eee",
    },
    label: {
      fontSize: "16px",
      color: "#34495e",
    },
    checkbox: {
      transform: "scale(1.2)",
      cursor: "pointer",
    },
    done: {
      textDecoration: "line-through",
      color: "#27ae60",
      fontWeight: "bold",
    },
  };

  // Dummy workout plan (later fetch from backend)
  const [workouts, setWorkouts] = useState([
    { id: 1, name: "Push Ups - 3 sets of 15 reps", done: false },
    { id: 2, name: "Squats - 3 sets of 20 reps", done: false },
    { id: 3, name: "Plank - 3 sets of 1 min", done: false },
    { id: 4, name: "Jumping Jacks - 2 mins", done: false },
  ]);

  const toggleWorkout = (id) => {
    setWorkouts(
      workouts.map((workout) =>
        workout.id === id ? { ...workout, done: !workout.done } : workout
      )
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>My Workout Plan</h2>

      {workouts.map((workout) => (
        <div key={workout.id} style={styles.exercise}>
          <span style={workout.done ? styles.done : styles.label}>
            {workout.name}
          </span>
          <input
            type="checkbox"
            style={styles.checkbox}
            checked={workout.done}
            onChange={() => toggleWorkout(workout.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default WorkoutPlan;
