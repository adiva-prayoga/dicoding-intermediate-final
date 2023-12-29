import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  login,
  getUserLogged,
  putAccessToken,
  getAccessToken,
} from "./utils/network-data";

import Navbar from "./components/Navbar";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CreateNotePage from "./pages/CreateNotePage";
import DetailPage from "./pages/DetailPage";
import ArchivedPage from "./pages/ArchivedPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const navigate = useNavigate();
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

  const handleUserLogout = () => {
    putAccessToken("");
    setState((prev) => ({
      ...prev,
      userLogged: null,
    }));

    navigate("/");
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
    <>
      <Navbar
        userLogged={state.userLogged}
        handleUserLogout={handleUserLogout}
      />
      <main>
        {!state.isDataFetching && (
          <Routes>
            <Route
              path="/"
              element={
                state.userLogged ? (
                  <HomePage />
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
            {state.userLogged && (
              <>
                <Route path="/notes/:noteId" element={<DetailPage />} />
                <Route path="/notes/new" element={<CreateNotePage />} />
                <Route path="/archives" element={<ArchivedPage />} />
              </>
            )}

            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;
