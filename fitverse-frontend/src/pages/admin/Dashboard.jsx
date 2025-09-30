import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/plan-counts/")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#ffffff",
        backgroundColor: "#444",
        marginLeft:"20px",
        marginRight:"20px",
        padding: "40px 20px",
        height: "100%",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1200px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "40px", fontSize: "36px" }}>
          Gym Dashboard
        </h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {/* Total Members */}
          <div
            style={{
              backgroundColor: "#555",
              borderRadius: "12px",
              padding: "30px",
              flex: "1",
              minWidth: "220px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.4)";
            }}
          >
            <h2 style={{ fontSize: "22px", marginBottom: "15px" }}>Total Members</h2>
            <p style={{ fontSize: "28px", fontWeight: "bold" }}>{data.total_members}</p>
          </div>

          {/* Total Trainers */}
          <div
            style={{
              backgroundColor: "#555",
              borderRadius: "12px",
              padding: "30px",
              flex: "1",
              minWidth: "220px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.4)";
            }}
          >
            <h2 style={{ fontSize: "22px", marginBottom: "15px" }}>Total Trainers</h2>
            <p style={{ fontSize: "28px", fontWeight: "bold" }}>{data.total_trainers}</p>
          </div>

          {/* Members by Plan */}
          <div
            style={{
              backgroundColor: "#555",
              borderRadius: "12px",
              padding: "20px",
              flex: "2",
              minWidth: "350px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            }}
          >
            <h2 style={{ fontSize: "22px", marginBottom: "20px", textAlign: "center" }}>Members by Plan</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", color: "#fff" }}>
              <thead>
                <tr style={{ backgroundColor: "#666" }}>
                  <th style={{ padding: "10px", border: "1px solid #777" }}>Plan</th>
                  <th style={{ padding: "10px", border: "1px solid #777" }}>Count</th>
                  <th style={{ padding: "10px", border: "1px solid #777" }}>Cost</th>
                  <th style={{ padding: "10px", border: "1px solid #777" }}>Duration</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.members_plan_details).map(([plan, details]) => (
                  <tr key={plan} style={{ textAlign: "center" }}>
                    <td style={{ padding: "10px", border: "1px solid #777" }}>{plan}</td>
                    <td style={{ padding: "10px", border: "1px solid #777" }}>{details.count}</td>
                    <td style={{ padding: "10px", border: "1px solid #777" }}>₹{details.cost}</td>
                    <td style={{ padding: "10px", border: "1px solid #777" }}>{details.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Revenue */}
          <div
            style={{
              backgroundColor: "#555",
              borderRadius: "12px",
              padding: "30px",
              flex: "1",
              minWidth: "220px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.4)";
            }}
          >
            <h2 style={{ fontSize: "22px", marginBottom: "15px" }}>Total Revenue</h2>
            <p style={{ fontSize: "28px", fontWeight: "bold" }}>₹{data.total_revenue}</p>
          </div>
        </div>
      </div>
    </div>

  );
}
