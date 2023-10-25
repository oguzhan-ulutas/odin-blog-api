import React, { useEffect, useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import BlogPost from "./BlogPost";

const MainPage = ({ token, user, setUser }) => {
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
      });
      const data = await response.json();

      if (response.status === 200) {
        setUser(data.user);
        console.log("Succes on fetch", data);
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log("Fetch failed", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, []);

  return (
    <main>
      <Header user={user} setUser={setUser} />
      <div className="content-container">
        <BlogPost />
        <BlogPost />
        <BlogPost />
      </div>
      <Footer />
    </main>
  );
};

export default MainPage;
