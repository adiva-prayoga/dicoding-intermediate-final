import { useEffect } from "react";
import {
  Route,
  useNavigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  ScrollRestoration,
  Outlet,
} from "react-router-dom";

import { useAuth } from "./contexts/AuthContext";

import Navbar from "./components/Navbar";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CreateNotePage from "./pages/CreateNotePage";
import DetailPage from "./pages/DetailPage";
import ArchivedPage from "./pages/ArchivedPage";
import NotFoundPage from "./pages/NotFoundPage";

function RequireAuth() {
  const navigate = useNavigate();
  const { isDataFetching, userLogged } = useAuth();

  useEffect(() => {
    if (!isDataFetching && !userLogged) {
      navigate("/login");
    }
  });

  return !isDataFetching && userLogged && <Outlet />;
}

function Layout() {
  return (
    <div>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <ScrollRestoration />
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFoundPage />}>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />

      <Route element={<RequireAuth />}>
        <Route index element={<HomePage />} />

        <Route path="archives" element={<ArchivedPage />} />
        <Route path="notes/:noteId" element={<DetailPage />} />
        <Route path="notes/new" element={<CreateNotePage />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
