import React, { useEffect, useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import BlogPost from "./BlogPost";

const MainPage = ({
  token,
  setToken,
  user,
  setUser,
  blogPosts,
  setBlogPosts,
}) => {
  useEffect(() => {
    // Get token from local storage
    const data = JSON.parse(localStorage.getItem("data") || null);
    if (data) {
      setToken(data.token);
    }
  }, []);

  // Authenticate user if token exist
  const fetchUser = async () => {
    const url = "http://localhost:3000/blog-api/v1/";

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        mode: "cors",
      });
      const data = await response.json();

      if (response.status === 200) {
        setUser(data.user);
        setBlogPosts(data.blogPosts);
        console.log("Succes on fetch", data);
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log("Fetch failed", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <main>
      <Header user={user} setUser={setUser} setToken={setToken} />
      <div className="content-container">
        <BlogPost blogPosts={blogPosts} />
      </div>
      <Footer />
    </main>
  );
};

export default MainPage;
