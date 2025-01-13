import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { ThemeToggle } from "./components/ToggleTheme";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authApi, carsApi } from "./services/api";
import { useNavigate } from "react-router-dom";
import { logout } from "./store/authSlice";
import Cookies from "js-cookie";

function App() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await carsApi.getAllCars();

        dispatch(setCars(response.data.data));
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };

    if (isAuthenticated) {
      fetchInitialData();
    }
  }, [dispatch, isAuthenticated]);

  const checkCookie = async () => {
    const token = Cookies.get("jwt");

    if (!token) return;

    const res = await authApi.verifyUser(token);

    if (res && res.data.status === "success")
      dispatch(storeLogin(res.data.user));
  };

  useEffect(() => {
    checkCookie();
  }, []);

  async function handleLogoutClick() {
    await authApi.logout();
    dispatch(logout);
    navigate("/login");
  }

  return (
    <div
      className={`min-h-screen transition-colors",
        ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      <nav
        className={`fixed w-full px-4 py-3 flex items-center justify-between ",
          ${isDarkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}
      >
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold">
            CarHub
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:text-blue-500">
                Login
              </Link>
              <Link to="/signup" className="hover:text-blue-500">
                Sign Up
              </Link>
            </>
          ) : (
            <button className="hover:text-blue-500" onClick={handleLogoutClick}>
              Logout
            </button>
          )}
        </div>
      </nav>
      <main className="pt-16 container mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
