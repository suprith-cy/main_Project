import React, { useEffect, useState } from "react";
import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Add interceptor to handle expired access token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem("refresh");

      if (refresh) {
        try {
          // request a new access token
          const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
            refresh,
          });

          localStorage.setItem("access", res.data.access);

          // update headers and retry request
          api.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;
          originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;
          return api(originalRequest);
        } catch (err) {
          console.error("Refresh token expired or invalid. Redirecting to login.");
          localStorage.clear();
          window.location.href = "/login"; // redirect to login
        }
      } else {
        localStorage.clear();
        window.location.href = "/login"; // no refresh token, redirect
      }
    }

    return Promise.reject(error);
  }
);

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await api.get("/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#444",
        padding: "20px",
        margin: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#7e7777ff",
          color: "#000000",
          padding: "20px",
          margin: "20px",
          width: "300px",
          borderRadius: "10px",
        }}
      >
        <h1>
          <u>Admin Profile</u>
        </h1>
        <p>
          <b>UserName</b> : {profile ? profile.username : "Loading..."}
        </p>
        <p>
          <b>Email</b> : {profile ? profile.email : "Loading..."}
        </p>
        <p>
          <b>Role</b> : {profile ? profile.role : "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default Profile;
