import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "../store/themeSlice";

export const ThemeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`p-2 rounded-lg transition-colors",
        ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};
