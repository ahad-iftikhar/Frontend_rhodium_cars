import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Login } from "./components/auth/login.jsx";
import { Home } from "./components/Home.jsx";
import { Signup } from "./components/auth/Signup.jsx";
import { AddCar } from "./components/AddCar.jsx";
import Protected from "./components/auth/AuthLayout";
import { CarDetails } from "./components/CarDetails.jsx";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Protected authentication>
            <Home />{" "}
          </Protected>
        ),
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            {" "}
            <Login />
          </Protected>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            {" "}
            <Signup />
          </Protected>
        ),
      },
      {
        path: "/add-car",
        element: (
          <Protected authentication>
            {" "}
            <AddCar />
          </Protected>
        ),
      },
      {
        path: "/car/:id",
        element: (
          <Protected authentication>
            {" "}
            <CarDetails />
          </Protected>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
