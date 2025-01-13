import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../store/authSlice";
import { authApi } from "../../services/api";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const onSubmit = async (data) => {
    try {
      const response = await authApi.login(data);
      dispatch(login(response.data));
      navigate("/cars");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div
        className={`w-full max-w-md p-8 rounded-lg shadow-lg border-black"
          ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
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
            Login
          </button>
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:text-blue-600">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
