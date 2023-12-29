import { useEffect } from "react";
import { Link } from "react-router-dom";

import Icon from "../components/Icon";
import { useTheme } from "../contexts/ThemeContext";

import PropTypes from "prop-types";

function Navbar({ userLogged, handleUserLogout, checkUserLogged }) {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    checkUserLogged();
  }, []);
  return (
    <header className={`header ${theme === "light" ? "light" : "dark"}`}>
      <nav className="container">
        <div className={`logo ${theme === "light" ? "light" : "dark"}`}>
          <Link to="/">Adiva Notes</Link>
        </div>
        <div className={`navbar-menu ${theme === "light" ? "light" : "dark"}`}>
          {userLogged && (
            <>
              <div className="archive">
                <Link to="/archives">
                  <Icon
                    name="Archive"
                    color={theme === "light" ? "#070e1d" : "#fff"}
                    size={24}
                    strokeWidth={2}
                  />
                </Link>
              </div>
              <div className="theme" onClick={toggleTheme}>
                <Icon
                  name={theme === "light" ? "Sun" : "Moon"}
                  color={theme === "light" ? "#070e1d" : "#fff"}
                  size={24}
                  strokeWidth={2}
                />
              </div>
              <div className="logout" onClick={handleUserLogout}>
                <Icon name="LogOut" color="#FF6767" size={24} strokeWidth={2} />
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

Navbar.propTypes = {
  userLogged: PropTypes.bool.isRequired,
  handleUserLogout: PropTypes.func.isRequired,
  checkUserLogged: PropTypes.func.isRequired,
};

export default Navbar;
