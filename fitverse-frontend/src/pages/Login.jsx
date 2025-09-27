import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", form);

      // store login info in localStorage
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", res.data.username);

      // redirect based on role
      switch (res.data.role) {
        case "admin":
          navigate("/admin");
          break;
        case "trainer":
          navigate("/trainer");
          break;
        case "member":
          navigate("/member");
          break;
        default:
          navigate("/login");
      }
    } catch (err) {
      setMessage(
        err.response?.data?.non_field_errors?.[0] ||
        err.response?.data?.password ||
        err.response?.data?.username ||
        "Error"
      );
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <select name="role" onChange={handleChange} value={form.role}>
        <option value="">Select role</option>
        <option value="admin">Admin</option>
        <option value="trainer">Trainer</option>
        <option value="member">Member</option>
      </select>
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
}
