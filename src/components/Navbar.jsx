import { Link } from "react-router-dom";

import Icon from "../components/Icon";
import { useTheme } from "../contexts/ThemeContext";
import { useLocale } from "../contexts/LocaleContext";

import PropTypes from "prop-types";

function Navbar({ userLogged, handleUserLogout }) {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLocale } = useLocale();

  const themeClass = theme === "light" ? "light" : "dark";

  const isUserLogged = userLogged ? true : false;

  return (
    <header className={`header ${themeClass}`}>
      <nav className="container">
        <div className={`logo ${themeClass}`}>
          <Link to="/">Adiva Notes</Link>
        </div>
        <div className={`navbar-menu ${themeClass}`}>
          {isUserLogged ? (
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
          ) : null}

          <div className="locale" onClick={toggleLocale}>
            <span>{language === "en" ? "English" : "Indonesia"}</span>
            <Icon
              name="Globe"
              color={theme === "light" ? "#070e1d" : "#fff"}
              size={24}
              strokeWidth={2}
            />
          </div>
          <div className="theme" onClick={toggleTheme}>
            <Icon
              name={theme === "light" ? "Sun" : "Moon"}
              color={theme === "light" ? "#070e1d" : "#fff"}
              size={24}
              strokeWidth={2}
            />
          </div>

          {isUserLogged && (
            <div className="logout" onClick={handleUserLogout}>
              <span>{userLogged.name}</span>
              <Icon name="LogOut" color="#FF6767" size={24} strokeWidth={2} />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

Navbar.propTypes = {
  userLogged: PropTypes.bool.isRequired,
  handleUserLogout: PropTypes.func.isRequired,
};

export default Navbar;
