import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authApi } from "./../../services/api.js";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const onSubmit = async (data) => {
    try {
      await authApi.signup(data);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div
        className={`w-full max-w-md p-8 rounded-lg shadow-lg
          ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              name="email"
              className={`w-full mt-1 p-2 border rounded ${
                isDarkMode ? "bg-gray-700" : "border-gray-600"
              } `}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              name="password"
              className={`w-full mt-1 p-2 border rounded ${
                isDarkMode ? "bg-gray-700" : "border-gray-600"
              } `}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
