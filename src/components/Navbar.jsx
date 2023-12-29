import { useEffect } from "react";
import { Link } from "react-router-dom";

import Icon from "../components/Icon";

import PropTypes from "prop-types";

function Navbar({ userLogged, handleUserLogout, checkUserLogged }) {
  useEffect(() => {
    checkUserLogged();
  }, []);
  return (
    <header>
      <nav className="container">
        <div className="logo">
          <Link to="/">Adiva Notes</Link>
        </div>
        <div className="navbar-menu">
          {userLogged && (
            <>
              <div className="archive">
                <Link to="/archives">
                  <Icon
                    name="Archive"
                    color="white"
                    size={24}
                    strokeWidth={2}
                  />
                </Link>
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
