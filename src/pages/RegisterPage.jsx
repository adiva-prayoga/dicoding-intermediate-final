import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../utils/network-data";

function RegisterPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { name, email, password } = state;
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
            type="text"
            name="name"
            placeholder="username"
            value={state.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="email"
            value={state.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={state.password}
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
