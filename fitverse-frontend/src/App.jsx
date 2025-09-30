import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Trainer from "./pages/Trainer";
import Member from "./pages/Member";

import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Members from "./pages/admin/Members";
import Trainers from "./pages/admin/Trainers";
import Profile from "./pages/admin/Profile";

import ProtectedRoute from "./components/protectRoute/ProtectedRoute";
import MemberLayout from "./components/MemberLayout";
import MemberDashboard from "./pages/member/MemberDashboard";
import MemberProfile from "./pages/member/Profile";
import WorkoutPlan from "./pages/member/Workoutplan";
import Attendance from "./pages/member/Attendance";
import Bmi from "./pages/member/Bmi";
import DietPlan from "./pages/member/DietPlan";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        {/* Admin section with sidebar */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="trainers" element={<Trainers />} />
          <Route path="profile" element={<Profile />} />
          <Route index element={<Navigate to="dashboard" />} /> 
        </Route>
        <Route path="/trainer" element={<Trainer />} />
        {/* member routes */}
        <Route path="/member" element={<MemberLayout />} />
        <Route path="/member/dashboard" element={<MemberDashboard />} />
        <Route path="/member/profile" element={<Profile />} />
        <Route path="/member/workout-plan" element={<WorkoutPlan/>} />
        <Route path="/member/attendance" element={<Attendance/>} />
        <Route path="/member/Bmi" element={<Bmi/>} />
        <Route path="/member/diet-plan" element={<DietPlan/>} />
 
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="Admin">
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trainer"
          element={
            <ProtectedRoute role="Trainer">
              <Trainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/member"
          element={
            <ProtectedRoute role="Member">
              <Member />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
