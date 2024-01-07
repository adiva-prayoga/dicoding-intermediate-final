import { createContext, useContext, useState, useEffect } from "react";

import PropTypes from "prop-types";

import {
  login,
  getUserLogged,
  putAccessToken,
  getAccessToken,
} from "../utils/network-data";

const AuthContext = createContext();

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    userLogged: null,
    email: "",
    password: "",
    isLoading: false,
    isDataFetching: true,
    error: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = state;
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const { data } = await login({ email, password });

      if (data && data.accessToken) {
        putAccessToken(data.accessToken);

        setState((prev) => ({
          ...prev,
          email: "",
          password: "",
          isLoading: false,
        }));

        checkUserLogged();
      } else {
        setState((prev) => ({
          ...prev,
          error: "Invalid email or password",
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setState((prev) => ({
        ...prev,
        error: "An unexpected error occurred",
        isLoading: false,
      }));
    }
  };

  const checkUserLogged = async () => {
    try {
      const accessToken = getAccessToken();
      if (accessToken) {
        const { data } = await getUserLogged(accessToken);
        setState((prev) => ({
          ...prev,
          userLogged: data,
          isDataFetching: false,
        }));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setState((prev) => ({
        ...prev,
        isDataFetching: false,
      }));
    }
  };

  useEffect(() => {
    checkUserLogged();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        handleChange,
        handleSubmit,
        setState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
