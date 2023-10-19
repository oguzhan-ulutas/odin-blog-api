import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import BlogPost from "./BlogPost";

const MainPage = () => {
  return (
    <main>
      <Header />
      <div className="blog-posts">
        <BlogPost />
        <BlogPost />
        <BlogPost />
      </div>
      <Footer />
    </main>
  );
};

export default MainPage;
