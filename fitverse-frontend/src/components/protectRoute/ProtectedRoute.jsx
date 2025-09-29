import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("access");   // JWT token from login
  const userRole = localStorage.getItem("role").toLowerCase(); // role stored on login
  console.log("ProtectedRoute - role:", role, "userRole:", userRole);

  if (!token) {
    // If no token, redirect to login
    console.log("ProtectedRoute - role:", role, "userRole:", userRole);
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    // If role doesn’t match, block access
    console.log("ProtectedRoute - role:", role, "userRole:", userRole);
    return <Navigate to="/login" replace />;
  }

  return children; // allow access
}

export default ProtectedRoute;
