import { useState } from "react";
import { Link } from "react-router-dom";

const BlogPost = () => {
  const [blogPosts, setBlogPosts] = useState({});
  return (
    <div className="blog-post">
      <div className="post-image">
        <img
          src="https://cdn.buttercms.com/fnvdv16ESFybbT9hisQb"
          alt="Blog img"
        />
      </div>
      <div className="post-text">
        <h2>Blog Post</h2>
        <div className="post-info">
          <Link className="post-author" to="/">
            David Black
          </Link>
          <time>2022-07-12 16:45</time>
        </div>
        <p className="post-summary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          distinctio beatae esse amet deserunt nesciunt.
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
