import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  login,
  getUserLogged,
  putAccessToken,
  getAccessToken,
} from "./utils/network-data";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
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

      if (data) {
        const { accessToken } = data;

        putAccessToken(accessToken);

        setState((prev) => ({
          ...prev,
          email: "",
          password: "",
          isLoading: false,
        }));

        checkUserLogged(); // Fetch user data after successful login
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
    // Fetch user data on component mount
    checkUserLogged();
  }, []);

  return (
    <>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              state.isDataFetching ? (
                // Show a loading indicator or a placeholder while data is being fetched
                <div>Loading...</div>
              ) : state.userLogged ? (
                <HomePage
                  username={state.userLogged.name}
                  isLoading={state.isDataFetching}
                />
              ) : (
                <LoginPage
                  email={state.email}
                  password={state.password}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  isLoading={state.isLoading}
                  error={state.error}
                />
              )
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
