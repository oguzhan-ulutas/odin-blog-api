import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import "./AdminControlPanel.css";

import Header from "../01-main-page/Header";
import Footer from "../01-main-page/Footer";
import BlogPost from "../01-main-page/BlogPost";

const AdminControlPanel = ({
  user,
  setUser,
  token,
  setToken,
  posts,
  setPosts,
  renderPosts,
  setRenderPosts,
}) => {
  useEffect(() => {
    const url = "http://localhost:3000/blog-api/v1/admin";

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
  }, []);

  const renderPublished = (e) => {
    e.preventDefault();
    const publishedPosts = posts.filter((post) => {
      return post.isPublished;
    });
    setRenderPosts(publishedPosts);
  };

  const renderUnpublished = (e) => {
    e.preventDefault();

    const unpublishedPosts = posts.filter((post) => !post.isPublished);
    setRenderPosts(unpublishedPosts);
  };

  const renderAllPosts = (e) => {
    e.preventDefault();
    setRenderPosts(posts);
  };

  return (
    <main>
      <Header user={user} setUser={setUser} setToken={setToken} />
      <div className="admin-content-container">
        <nav>
          <Link onClick={renderAllPosts}>All Blog Posts</Link>
          <Link onClick={renderPublished}>Published Blog Posts</Link>
          <Link onClick={renderUnpublished}>Unpublished Blog Posts</Link>
          <Link>All Users</Link>
          <hr />
          <Link>Add New Post</Link>
        </nav>
        <div className="content">
          {!user.isAdmin && <p>You are not authorized.</p>}
          <Outlet blogPosts={renderPosts} />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AdminControlPanel;
