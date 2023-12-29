import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { useTheme } from "../contexts/ThemeContext";

function LoginPage({
  email,
  password,
  handleChange,
  handleSubmit,
  isLoading,
  error,
}) {
  const { theme } = useTheme();
  return (
    <section className="notes-section">
      <div className="container">
        <h1 className="title">Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            className={theme === "light" ? "light" : "dark"}
            type="text"
            name="email"
            placeholder="email"
            autoComplete="email"
            value={email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            className={theme === "light" ? "light" : "dark"}
            type="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChange}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <div
            className={`register-link ${theme === "light" ? "light" : "dark"}`}
          >
            <span>Don&apos;t have an account?</span>
            <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

LoginPage.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default LoginPage;
