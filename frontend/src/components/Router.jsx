import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from "./01-main-page/MainPage";
import ErrorPage from "./ErrorPage";
import LoginPage from "./02-login-page/LoginPage";
import SignupPage from "./03-signup-page/SignupPage";
import SingleBlogPost from "./04-single-blog-post/SingleBlogPost";
import User from "./05-user/User";
import AdminInfo from "./06-admin/AdminInfo";

const Router = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    id: "",
    isAdmin: false,
  });
  const [blogPosts, setBlogPosts] = useState([]);

  const router = createBrowserRouter([
    {
      path: "/blog-api/v1",
      element: (
        <MainPage
          token={token}
          setToken={setToken}
          user={user}
          setUser={setUser}
          blogPosts={blogPosts}
          setBlogPosts={setBlogPosts}
        />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/blog-api/v1/login",
      element: <LoginPage user={user} setToken={setToken} setUser={setUser} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/blog-api/v1/signup",
      element: <SignupPage user={user} setUser={setUser} setToken={setToken} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/blog-api/v1/post/:id",
      element: (
        <SingleBlogPost
          blogPosts={blogPosts}
          user={user}
          setUser={setUser}
          token={token}
          setToken={setToken}
        />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/blog-api/v1/user/:userid",
      element: (
        <User user={user} setUser={setUser} token={token} setToken={setToken} />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/admin/info",
      element: <AdminInfo user={user} setUser={setUser} setToken={setToken} />,
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
