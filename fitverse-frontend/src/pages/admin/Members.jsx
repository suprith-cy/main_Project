import React, { useState, useEffect } from "react";
import "../../styles/AdminMember.css";

const Members = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/routes/admin/members/") // Django backend URL
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="members-container">
      <h2>Member Management</h2>
      <table className="members-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Plan</th>
            <th>Date of Joining</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.username}</td>
              <td>{member.plan}</td>
              <td>{member.date_of_joining}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Members;
