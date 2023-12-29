import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import { useTheme } from "../contexts/ThemeContext";
import { useLocale } from "../contexts/LocaleContext";

import { register } from "../utils/network-data";

function RegisterPage() {
  const { theme } = useTheme();
  const { language } = useLocale();
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
        <h1 className="title">
          {language === "en"
            ? "Fill the form to register account."
            : "Isi form untuk mendaftar akun."}
        </h1>
        <form>
          <label htmlFor="name">Username</label>
          <input
            className={theme === "light" ? "light" : "dark"}
            type="text"
            name="name"
            placeholder="username"
            value={state.name}
            autoComplete="username"
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
            autoComplete="email"
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
            autoComplete="new-password"
            onChange={handleChange}
            required
          />
          <input
            className={theme === "light" ? "light" : "dark"}
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            value={state.confirmPassword}
            autoComplete="new-password"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="submit-button"
            onClick={handleSubmit}
          >
            {language === "en" ? "Register" : "Daftar"}
          </button>
          <div
            className={`register-link ${theme === "light" ? "light" : "dark"}`}
          >
            <span>
              {language === "en"
                ? "Already have an account?"
                : "Sudah punya akun?"}
            </span>
            <Link to="/">
              {language === "en" ? "Login here" : "Login di sini"}
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default RegisterPage;
