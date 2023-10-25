import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from "./01-main-page/MainPage";
import ErrorPage from "./ErrorPage";
import LoginPage from "./02-login-page/LoginPage";
import SignupPage from "./03-signup-page/SignupPage";

const Router = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    id: "",
    isAdmin: false,
  });

  useEffect(() => {
    // Get token from local storage
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      setToken(data.token);
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/blog-api/v1",
      element: <MainPage token={token} user={user} setUser={setUser} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/blog-api/v1/login",
      element: <LoginPage user={user} setToken={setToken} setUser={setUser} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/blog-api/v1/signup",
      element: <SignupPage user={user} setUser={setUser} />,
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
