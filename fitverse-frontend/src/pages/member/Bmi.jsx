import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Bmi = () => {
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
      marginBottom: "20px",
      color: "#2c3e50",
    },
    form: {
      display: "flex",
      gap: "15px",
      marginBottom: "30px",
      justifyContent: "center",
    },
    input: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      width: "150px",
    },
    button: {
      padding: "10px 20px",
      background: "#1abc9c",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    result: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "18px",
      color: "#34495e",
    },
    chartContainer: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "30px",
    },
    chartBox: {
      padding: "20px",
      borderRadius: "10px",
      background: "#f9f9f9",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    },
  };

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);

  // Dummy BMI history (replace with API data later)
  const bmiHistory = [
    { month: "Jan", bmi: 22 },
    { month: "Feb", bmi: 23 },
    { month: "Mar", bmi: 21 },
    { month: "Apr", bmi: 24 },
    { month: "May", bmi: 23 },
  ];

  // Dummy body composition data
  const bodyComposition = [
    { name: "Muscle", value: 45 },
    { name: "Fat", value: 30 },
    { name: "Water", value: 25 },
  ];
  const COLORS = ["#1abc9c", "#e74c3c", "#3498db"];

  const calculateBMI = () => {
    if (height && weight) {
      const h = height / 100; // cm → m
      const result = (weight / (h * h)).toFixed(2);
      setBmi(result);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>BMI Tracker</h2>

      {/* BMI Calculator */}
      <div style={styles.form}>
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={calculateBMI}>
          Calculate
        </button>
      </div>

      {bmi && (
        <div style={styles.result}>
          Your BMI: <b>{bmi}</b>{" "}
          {bmi < 18.5
            ? "(Underweight)"
            : bmi < 24.9
            ? "(Normal)"
            : bmi < 29.9
            ? "(Overweight)"
            : "(Obese)"}
        </div>
      )}

      {/* Charts Section */}
      <div style={styles.chartContainer}>
        {/* Bar Chart */}
        <div style={styles.chartBox}>
          <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
            Monthly BMI Progress
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={bmiHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bmi" fill="#1abc9c" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div style={styles.chartBox}>
          <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
            Body Composition
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={bodyComposition}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label
              >
                {bodyComposition.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Bmi;
 