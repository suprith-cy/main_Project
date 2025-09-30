// Increase card and chart size for a larger dashboard
import React, { useEffect, useState } from "react";

const randomWorkouts = [
    {
        name: "Push Ups",
        reps: Math.floor(Math.random() * 50) + 10,
        sets: Math.floor(Math.random() * 5) + 1,
        progress: [10, 20, 30, 40, 50],
    },
    {
        name: "Squats",
        reps: Math.floor(Math.random() * 40) + 10,
        sets: Math.floor(Math.random() * 4) + 1,
        progress: [15, 25, 35, 45, 55],
    },
    {
        name: "Plank",
        reps: Math.floor(Math.random() * 3) + 1,
        sets: Math.floor(Math.random() * 3) + 1,
        progress: [30, 40, 50, 60, 70],
    },
];

function getRandomWorkout() {
    return randomWorkouts[Math.floor(Math.random() * randomWorkouts.length)];
}

const MemberDashboard = () => {
    const [workout, setWorkout] = useState(getRandomWorkout());

    useEffect(() => {
        setWorkout(getRandomWorkout());
    }, []);

    // Larger chart
    const chartWidth = 520;
    const chartHeight = 180;
    const maxProgress = Math.max(...workout.progress);
    const points = workout.progress
        .map(
            (val, idx) =>
                `${(idx / (workout.progress.length - 1)) * chartWidth},${chartHeight - (val / maxProgress) * chartHeight}`
        )
        .join(" ");

    return (
        <>
            <style>{`
                :root {
                    --bg-1: #0b1220;
                    --bg-2: #0a0f1d;
                    --neon-cyan: #00e5ff;
                    --neon-pink: #ff00d4;
                    --neon-lime: #b6ff00;
                    --neon-yellow: #fff500;
                    --card-bg: rgba(255, 255, 255, 0.06);
                    --card-border: rgba(255, 255, 255, 0.18);
                    --text-main: #eaf6ff;
                    --text-dim: #c9d6ff;
                }
                .member-dashboard {
                    min-height: 100dvh;
                    padding: clamp(48px, 8vw, 96px);
                    display: grid;
                    place-items: center;
                    background:
                        radial-gradient(1200px 600px at 20% 10%, rgba(0, 229, 255, 0.18), transparent 60%),
                        radial-gradient(1000px 600px at 80% 90%, rgba(255, 0, 212, 0.18), transparent 60%),
                        linear-gradient(180deg, var(--bg-1), var(--bg-2));
                    position: relative;
                    overflow: hidden;
                }
                .member-dashboard::before,
                .member-dashboard::after {
                    content: "";
                    position: absolute;
                    inset: -30%;
                    background:
                        radial-gradient(40% 60% at 30% 30%, rgba(0, 229, 255, 0.12), transparent 60%),
                        radial-gradient(50% 50% at 70% 70%, rgba(255, 0, 212, 0.10), transparent 60%);
                    filter: blur(20px);
                    animation: md-float 16s ease-in-out infinite alternate;
                    pointer-events: none;
                }
                .member-dashboard::after {
                    animation-delay: 6s;
                    transform: scaleX(-1);
                }
                @keyframes md-float {
                    from { transform: translateY(-2%) translateX(-1%) rotate(0.5deg); }
                    to   { transform: translateY(2%)  translateX(1%)  rotate(-0.5deg); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .member-dashboard::before,
                    .member-dashboard::after {
                        animation: none;
                    }
                }
                .glass-card {
                    width: min(1200px, 98vw);
                    background: var(--card-bg);
                    border: 1px solid var(--card-border);
                    border-radius: 28px;
                    padding: clamp(40px, 8vw, 80px);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    box-shadow:
                        0 20px 60px rgba(0, 0, 0, 0.35),
                        0 0 0 2px rgba(255, 255, 255, 0.04) inset;
                    position: relative;
                }
                .glass-card::before {
                    content: "";
                    position: absolute;
                    inset: -2px;
                    border-radius: 28px;
                    padding: 2px;
                    background: linear-gradient(135deg, rgba(0, 229, 255, 0.55), rgba(255, 0, 212, 0.55));
                    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
                    -webkit-mask-composite: xor;
                                    mask-composite: exclude;
                    pointer-events: none;
                }
                .glass-card h2 {
                    margin: 0 0 20px;
                    font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                    font-size: clamp(48px, 6vw, 72px);
                    font-weight: 800;
                    line-height: 1.1;
                    background: linear-gradient(90deg, var(--neon-cyan), var(--neon-pink), var(--neon-yellow));
                    -webkit-background-clip: text;
                                    background-clip: text;
                    color: transparent;
                    text-shadow: 0 0 32px rgba(0, 229, 255, 0.25), 0 0 52px rgba(255, 0, 212, 0.16);
                }
                .glass-card p {
                    margin: 0;
                    color: var(--text-main);
                    font-size: clamp(28px, 2.8vw, 36px);
                    line-height: 1.6;
                    text-wrap: balance;
                    text-shadow: 0 2px 2px rgba(0, 0, 0, 0.35);
                }
                    margin-top: 24px;
                    color: var(--text-main);
                }
                .progress-chart {
                    margin-top: 18px;
                    width: ${chartWidth}px;
                    height: ${chartHeight + 30}px;
                }
                .progress-label {
                    font-size: 13px;
                    color: var(--text-dim);
                    text-align: center;
                    margin-top: 6px;
                }
                @media (max-width: 480px) {
                    .glass-card {
                        border-radius: 16px;
                    }
                    .progress-chart {
                        width: 98vw;
                        max-width: 98vw;
                    }
                }
            `}</style>

            <div className="member-dashboard">
                <div className="glass-card" role="region" aria-label="Member Dashboard">
                    <h2>Member Dashboard</h2>
                    <p>Welcome to your dashboard! Track your fitness here.</p>

                    <div className="workout-details">
                        <strong>Workout:</strong> {workout.name}<br />
                        <strong>Reps:</strong> {workout.reps}<br />
                        <strong>Sets:</strong> {workout.sets}
                    </div>

                    <div className="progress-chart">
                        <svg width={chartWidth} height={chartHeight + 30}>
                            {/* Chart background */}
                            <rect x="0" y="0" width={chartWidth} height={chartHeight} rx="12" fill="rgba(0,229,255,0.07)" />
                            {/* Progress line */}
                            <polyline
                                points={points}
                                fill="none"
                                stroke="url(#grad)"
                                strokeWidth="4"
                            />
                            {/* Gradient for line */}
                            <defs>
                                <linearGradient id="grad" x1="0" y1="0" x2={chartWidth} y2="0" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#00e5ff" />
                                    <stop offset="0.5" stopColor="#ff00d4" />
                                    <stop offset="1" stopColor="#fff500" />
                                </linearGradient>
                            </defs>
                            {/* Dots */}
                            {workout.progress.map((val, idx) => (
                                <circle
                                    key={idx}
                                    cx={(idx / (workout.progress.length - 1)) * chartWidth}
                                    cy={chartHeight - (val / maxProgress) * chartHeight}
                                    r="5"
                                    fill="#00e5ff"
                                    stroke="#fff"
                                    strokeWidth="2"
                                    opacity="0.85"
                                />
                            ))}
                            {/* X-axis labels */}
                            {workout.progress.map((val, idx) => (
                                <text
                                    key={idx}
                                    x={(idx / (workout.progress.length - 1)) * chartWidth}
                                    y={chartHeight + 18}
                                    textAnchor="middle"
                                    fontSize="13"
                                    fill="#c9d6ff"
                                >
                                    Day {idx + 1}
                                </text>
                            ))}
                        </svg>
                        <div className="progress-label">
                            Progress over last {workout.progress.length} days
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MemberDashboard;