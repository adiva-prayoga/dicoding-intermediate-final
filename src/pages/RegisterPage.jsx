import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "../contexts/ThemeContext";

import { register } from "../utils/network-data";

function RegisterPage() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { name, email, password, confirmPassword } = state;

      // Check if the password and confirm password match
      if (password !== confirmPassword) {
        alert("Password and confirm password do not match");
        return;
      }

      const { error } = await register({ name, email, password });
      if (!error) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="register-section">
      <div className="container">
        <h1 className="title">Register</h1>
        <form>
          <label htmlFor="name">Username</label>
          <input
            className={theme === "light" ? "light" : "dark"}
            type="text"
            name="name"
            placeholder="username"
            value={state.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            className={theme === "light" ? "light" : "dark"}
            type="text"
            name="email"
            placeholder="email"
            value={state.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            className={theme === "light" ? "light" : "dark"}
            type="password"
            name="password"
            placeholder="password"
            value={state.password}
            onChange={handleChange}
            required
          />
          <input
            className={theme === "light" ? "light" : "dark"}
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            value={state.confirmPassword}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="submit-button"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
}

export default RegisterPage;
