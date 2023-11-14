import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "./AdminControlPanel.css";

import Header from "../01-main-page/Header";
import Footer from "../01-main-page/Footer";
import BlogPost from "../01-main-page/BlogPost";

const AdminControlPanel = ({ user, setUser, token, setToken }) => {
  const [posts, setPosts] = useState([]);
  const [renderPosts, setRenderPosts] = useState([]);
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

  return (
    <main>
      <Header user={user} setUser={setUser} setToken={setToken} />
      <div className="admin-content-container">
        <nav>
          <Link onClick={renderPublished}>Published Blog Posts</Link>
          <Link>Unpublished Blog Posts</Link>
          <Link>All Users</Link>
          <hr />
          <Link>Add New Post</Link>
        </nav>
        <div className="content">
          {!user.isAdmin && <p>You are not authorized.</p>}
          <BlogPost blogPosts={renderPosts} />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AdminControlPanel;
