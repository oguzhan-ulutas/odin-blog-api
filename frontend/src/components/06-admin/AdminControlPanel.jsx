import { Link, Outlet } from "react-router-dom";
import { useEffect } from "react";

import "./AdminControlPanel.css";

import Header from "../01-main-page/Header";
import Footer from "../01-main-page/Footer";

const AdminControlPanel = ({
  user,
  setUser,
  token,
  setToken,
  posts,
  setPosts,
  setRenderPosts,
  updateMessage,
  deleteMessage,
  baseUrl,
}) => {
  useEffect(() => {
    const url = `${baseUrl}admin`;

    // Sending post req. to api
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        setPosts(res.posts);
        setRenderPosts(res.posts);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [updateMessage, deleteMessage]);

  const renderPublished = () => {
    const publishedPosts = posts.filter((post) => {
      return post.isPublished;
    });
    setRenderPosts(publishedPosts);
  };

  const renderUnpublished = () => {
    const unpublishedPosts = posts.filter((post) => !post.isPublished);
    setRenderPosts(unpublishedPosts);
  };

  const renderAllPosts = () => {
    setRenderPosts(posts);
  };

  return (
    <main>
      <Header user={user} setUser={setUser} setToken={setToken} />
      <div className="admin-content-container">
        <nav>
          <Link to="/blog-api/v1/admin" onClick={renderAllPosts}>
            All Blog Posts
          </Link>
          <Link to="/blog-api/v1/admin" onClick={renderPublished}>
            Published Blog Posts
          </Link>
          <Link to="/blog-api/v1/admin" onClick={renderUnpublished}>
            Unpublished Blog Posts
          </Link>
          <Link to="/blog-api/v1/admin/users">All Users</Link>
          <hr />
          <Link to="/blog-api/v1/admin/add-new">Add New Post</Link>
        </nav>
        <div className="content">
          {!user.isAdmin && <p>You are not authorized.</p>}
          <Outlet />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AdminControlPanel;
