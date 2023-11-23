import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";

import MainPage from "./01-main-page/MainPage";
import ErrorPage from "./ErrorPage";
import LoginPage from "./02-login-page/LoginPage";
import SignupPage from "./03-signup-page/SignupPage";
import SingleBlogPost from "./04-single-blog-post/SingleBlogPost";
import User from "./05-user/User";
import AdminInfo from "./06-admin/AdminInfo";
import AdminControlPanel from "./06-admin/AdminControlPanel";
import BlogPost from "./01-main-page/BlogPost";
import PostUpdateForm from "./06-admin/PostUpdateForm";
import AddNewPost from "./06-admin/AddNewPost";
import AllUsers from "./06-admin/AllUsers";

const Router = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    id: "",
    isAdmin: false,
  });
  const [blogPosts, setBlogPosts] = useState([]);

  // Admin states
  const [posts, setPosts] = useState([]);
  const [renderPosts, setRenderPosts] = useState([]);
  const [updateMessage, setUpdateMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [users, setUsers] = useState([]);

  // New post state
  const [newPost, setNewPost] = useState({});

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
    {
      path: "blog-api/v1/admin",
      element: (
        <AdminControlPanel
          user={user}
          setUser={setUser}
          token={token}
          setToken={setToken}
          posts={posts}
          setPosts={setPosts}
          renderPosts={renderPosts}
          setRenderPosts={setRenderPosts}
          updateMessage={updateMessage}
          setUpdateMessage={setUpdateMessage}
          deleteMessage={deleteMessage}
          setDeleteMessage={setDeleteMessage}
        />
      ),
      children: [
        { index: true, element: <BlogPost blogPosts={renderPosts} /> },
        {
          path: "post/:postid",
          element: (
            <PostUpdateForm
              posts={posts}
              newPost={newPost}
              setNewPost={setNewPost}
              token={token}
              updateMessage={updateMessage}
              setUpdateMessage={setUpdateMessage}
              deleteMessage={deleteMessage}
              setDeleteMessage={setDeleteMessage}
            />
          ),
        },
        {
          path: "add-new",
          element: (
            <AddNewPost
              newPost={newPost}
              setNewPost={setNewPost}
              token={token}
              posts={posts}
              setPosts={setPosts}
            />
          ),
        },
        {
          path: "users",
          element: <AllUsers token={token} users={users} setUsers={setUsers} />,
        },
      ],
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
