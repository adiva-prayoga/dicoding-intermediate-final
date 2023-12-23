import PropTypes from "prop-types";

function LoginPage({
  email,
  password,
  handleChange,
  handleSubmit,
  isLoading,
  error,
}) {
  return (
    <section className="notes-section">
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="email"
            autoComplete="username"
            value={email}
            onChange={handleChange}
          />
          <input
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
