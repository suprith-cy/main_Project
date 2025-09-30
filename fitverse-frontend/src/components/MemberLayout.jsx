import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/MemberLayout.css";

// Sample motivation images (replace URLs with your own images if needed)
const motivationImages = [
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
];

// Sample member data
const members = [
    { name: "Alex Johnson", age: 28, weight: 72, height: 175 },
    { name: "Maria Lee", age: 32, weight: 65, height: 168 },
    { name: "John Smith", age: 24, weight: 80, height: 182 },
];

// Helper to calculate BMI
const calcBMI = (weight, height) => {
    const h = height / 100;
    return (weight / (h * h)).toFixed(1);
};

// Sample week progress data
const weekProgress = [2, 3, 4, 3, 5, 4, 6]; // e.g., workouts per day

const MemberLayout = () => {
    const navigate = useNavigate();
    const [motivationImg, setMotivationImg] = useState(motivationImages[0]);
    const [member, setMember] = useState(members[0]);

    useEffect(() => {
        setMotivationImg(
            motivationImages[Math.floor(Math.random() * motivationImages.length)]
        );
        setMember(members[Math.floor(Math.random() * members.length)]);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        navigate("/login");
    };

    return (
        <div className="member-container">
            {/* Sidebar */}
            <div className="sidebar">
                <h1 className="sidebar-title">FitVerse Member</h1>
                <nav className="nav-links">
                    <Link to="/member/dashboard" className="nav-link">Dashboard</Link>
                    <Link to="/member/profile" className="nav-link">Profile</Link>
                    <Link to="/member/workout-plan" className="nav-link">Workout Plan</Link>
                    <Link to="/member/attendance" className="nav-link">Attendance</Link>
                    <Link to="/member/bmi" className="nav-link">BMI</Link>
                    <Link to="/member/diet-plan" className="nav-link">Diet Plan</Link>
                    <button onClick={handleLogout} style={{ marginTop: "20px" }}>
                        Logout
                    </button>
                </nav>
            </div>

            {/* Main content */}
            <div className="main-content">
                {/* Motivation Image */}
                <div style={{
                    marginBottom: "30px",
                    textAlign: "center"
                }}>
                    <img
                        src={motivationImg}
                        alt="Motivation"
                        style={{
                            width: "100%",
                            maxHeight: "300px",
                            objectFit: "cover",
                            borderRadius: "20px",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.2)"
                        }}
                    />
                    <h2 style={{ color: "#ff9800", fontSize: "2rem", marginTop: "10px" }}>
                        Stay Motivated, {member.name.split(" ")[0]}!
                    </h2>
                </div>

                {/* Member Info */}
                <div style={{
                    background: "#fffde7",
                    borderRadius: "16px",
                    padding: "24px",
                    marginBottom: "30px",
                    boxShadow: "0 2px 8px rgba(255,152,0,0.2)",
                    fontSize: "1.2rem",
                    color: "#333",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <div>
                        <strong>Name:</strong> {member.name}<br />
                        <strong>Age:</strong> {member.age}<br />
                        <strong>Weight:</strong> {member.weight} kg<br />
                        <strong>Height:</strong> {member.height} cm<br />
                        <strong>BMI:</strong> {calcBMI(member.weight, member.height)}
                    </div>
                    {/* Simple BMI Chart */}
                    <div style={{ width: "180px", height: "120px" }}>
                        <svg width="180" height="120">
                            <rect x="10" y="40" width="160" height="30" fill="#ffe082" rx="10" />
                            <rect
                                x="10"
                                y="40"
                                width={Math.min(160, (calcBMI(member.weight, member.height) / 40) * 160)}
                                height="30"
                                fill="#ff9800"
                                rx="10"
                            />
                            <text x="90" y="60" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">
                                BMI: {calcBMI(member.weight, member.height)}
                            </text>
                        </svg>
                    </div>
                </div>

                {/* Week Progress */}
                <div style={{
                    background: "#e1f5fe",
                    borderRadius: "16px",
                    padding: "24px",
                    marginBottom: "30px",
                    boxShadow: "0 2px 8px rgba(33,150,243,0.2)",
                    color: "#1976d2"
                }}>
                    <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>Weekly Progress</h3>
                    <div style={{ display: "flex", alignItems: "flex-end", height: "80px" }}>
                        {weekProgress.map((val, idx) => (
                            <div key={idx} style={{
                                margin: "0 8px",
                                textAlign: "center"
                            }}>
                                <div style={{
                                    background: "#29b6f6",
                                    width: "24px",
                                    height: `${val * 12}px`,
                                    borderRadius: "8px 8px 0 0",
                                    marginBottom: "4px"
                                }}></div>
                                <span style={{ fontSize: "1rem" }}>Day {idx + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <Outlet />
            </div>
        </div>
    );
};

export default MemberLayout;
