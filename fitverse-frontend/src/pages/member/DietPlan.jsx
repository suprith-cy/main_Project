import React from "react";

const DietPlan = () => {
  const styles = {
    container: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: "20px",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
      color: "#2c3e50",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
    },
    card: {
      background: "#f9f9f9",
      borderRadius: "10px",
      padding: "20px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      transition: "transform 0.3s",
    },
    cardHover: {
      transform: "scale(1.03)",
    },
    title: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#27ae60",
    },
    list: {
      margin: 0,
      padding: "0 0 0 18px",
      lineHeight: "1.6",
      color: "#34495e",
    },
  };

  // Dummy diet plan data (replace with API from Django later)
  const dietPlan = {
    Breakfast: ["Oatmeal with fruits", "2 boiled eggs", "1 glass of milk"],
    Lunch: ["Grilled chicken breast", "Brown rice", "Mixed vegetables"],
    Snacks: ["Protein shake", "Handful of almonds"],
    Dinner: ["Baked salmon", "Quinoa salad", "Steamed broccoli"],
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>My Diet Plan</h2>

      <div style={styles.grid}>
        {Object.keys(dietPlan).map((meal, index) => (
          <div
            key={index}
            style={styles.card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <div style={styles.title}>{meal}</div>
            <ul style={styles.list}>
              {dietPlan[meal].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietPlan;
