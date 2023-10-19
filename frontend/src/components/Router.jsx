import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from "./01-main-page/MainPage";
import ErrorPage from "./ErrorPage";
import LoginPage from "./02-login-page/LoginPage";
import SignupPage from "./03-signup-page/SignupPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/blog-api/v1",
      element: <MainPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/blog-api/v1/login",
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/blog-api/v1/signup",
      element: <SignupPage />,
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
