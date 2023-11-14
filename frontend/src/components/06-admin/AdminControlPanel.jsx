import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "./AdminControlPanel.css";

import Header from "../01-main-page/Header";
import Footer from "../01-main-page/Footer";
import BlogPost from "../01-main-page/BlogPost";

const AdminControlPanel = ({ user, setUser, token, setToken }) => {
  const [posts, setPosts] = useState([]);
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
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  return (
    <main>
      <Header user={user} setUser={setUser} setToken={setToken} />
      <div className="admin-content-container">
        <nav>
          <Link>Published Blog Posts</Link>
          <Link>Unpublished Blog Posts</Link>
          <Link>All Users</Link>
          <hr />
          <Link>Add New Post</Link>
        </nav>
        <div className="content">
          {!user.isAdmin && <p>You are not authorized.</p>}
          <BlogPost blogPosts={posts} />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AdminControlPanel;
