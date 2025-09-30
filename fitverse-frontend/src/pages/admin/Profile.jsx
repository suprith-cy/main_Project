import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access"); // if using JWT
        const res = await axios.get("http://127.0.0.1:8000/api/profile/", {
          headers: {
            Authorization: `Bearer ${token}`, // if JWT is enabled
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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center",color: "#000000", backgroundColor: "#444", padding: "20px", margin: "20px" }}>
      <div style={{ backgroundColor: "#7e7777ff",color: "#000000", padding: "20px", margin: "20px", width: "300px", borderRadius: "10px" }}>
        <h1><u>Admin Profile</u></h1>
        <p><b>UserName</b> : {profile ? profile.username : "Loading..."}</p>
        <p><b>Email</b> : {profile ? profile.email : "Loading..."}</p>
        <p><b>Role</b> : {profile ? profile.role : "Loading..."}</p>
      </div>
    </div>
  );
};

export default Profile;
