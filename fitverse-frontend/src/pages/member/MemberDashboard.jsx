import React from "react";

const MemberDashboard = () => {
  return (
    <>
      <style>{`
        /* ========= Theme ========= */
        :root {
          --bg-1: #0b1220;
          --bg-2: #0a0f1d;

          /* Neon accents */
          --neon-cyan: #00e5ff;
          --neon-pink: #ff00d4;
          --neon-lime: #b6ff00;
          --neon-yellow: #fff500;

          --card-bg: rgba(255, 255, 255, 0.06);
          --card-border: rgba(255, 255, 255, 0.18);
          --text-main: #eaf6ff;
          --text-dim: #c9d6ff;
        }

        /* ========= Layout ========= */
        .member-dashboard {
          min-height: 100dvh;
          padding: clamp(24px, 4vw, 48px);
          display: grid;
          place-items: center;
          background:
            radial-gradient(1200px 600px at 20% 10%, rgba(0, 229, 255, 0.18), transparent 60%),
            radial-gradient(1000px 600px at 80% 90%, rgba(255, 0, 212, 0.18), transparent 60%),
            linear-gradient(180deg, var(--bg-1), var(--bg-2));
          position: relative;
          overflow: hidden;
        }

        /* Soft animated glow orbs (decorative) */
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

        /* ========= Card ========= */
        .glass-card {
          width: min(760px, 96vw);
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 18px;
          padding: clamp(20px, 4vw, 40px);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.35),
            0 0 0 1px rgba(255, 255, 255, 0.04) inset;
          position: relative;
        }

        /* Fancy gradient border highlight */
        .glass-card::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 18px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(0, 229, 255, 0.55), rgba(255, 0, 212, 0.55));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          pointer-events: none;
        }

        /* ========= Typography ========= */
        .glass-card h2 {
          margin: 0 0 10px;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          line-height: 1.1;
          /* Gradient neon text */
          background: linear-gradient(90deg, var(--neon-cyan), var(--neon-pink), var(--neon-yellow));
          -webkit-background-clip: text;
                  background-clip: text;
          color: transparent;
          /* Soft glow for bright readability */
          text-shadow: 0 0 16px rgba(0, 229, 255, 0.25), 0 0 26px rgba(255, 0, 212, 0.16);
        }

        .glass-card p {
          margin: 0;
          color: var(--text-main);
          font-size: clamp(15px, 1.8vw, 18px);
          line-height: 1.6;
          text-wrap: balance;
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.35);
        }

        /* ========= Actions ========= */
        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 22px;
        }

        .btn {
          --btn-bg: rgba(255, 255, 255, 0.08);
          --btn-fg: var(--text-main);
          border: 1px solid var(--card-border);
          color: var(--btn-fg);
          background: var(--btn-bg);
          padding: 10px 16px;
          border-radius: 12px;
          font-weight: 600;
          letter-spacing: 0.2px;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.2s ease, border-color 0.2s ease;
        }

        .btn.primary {
          --btn-bg: linear-gradient(135deg, rgba(0, 229, 255, 0.25), rgba(255, 0, 212, 0.25));
          border-color: rgba(255, 255, 255, 0.28);
        }

        .btn.secondary {
          --btn-bg: linear-gradient(135deg, rgba(182, 255, 0, 0.22), rgba(255, 245, 0, 0.22));
        }

        .btn.ghost {
          background: transparent;
          border-color: rgba(255, 255, 255, 0.16);
        }

        .btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.28), 0 0 16px rgba(0, 229, 255, 0.18);
          border-color: rgba(255, 255, 255, 0.35);
        }

        .btn:active {
          transform: translateY(0);
        }

        /* ========= Responsive tweaks ========= */
        @media (max-width: 480px) {
          .glass-card {
            border-radius: 16px;
          }
        }
      `}</style>

      <div className="member-dashboard">
        <div className="glass-card" role="region" aria-label="Member Dashboard">
          <h2>Member Dashboard</h2>
          <p>Welcome to your dashboard! Track your fitness here.</p>

          {/* Optional actions - feel free to remove or rename */}
          <div className="actions" aria-label="Quick actions">
            <button className="btn primary">Start Workout</button>
            <button className="btn secondary">Update Profile</button>
            <button className="btn ghost">View Progress</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberDashboard;