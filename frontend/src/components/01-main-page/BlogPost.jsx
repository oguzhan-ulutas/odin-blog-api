import { useState } from "react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

const BlogPost = ({ blogPosts }) => {
  const blogPost = blogPosts.map((post) => {
    return (
      <div key={post._id} className="blog-post">
        <div className="post-image">
          <Link to={`post/${post._id}`}>
            <img
              src={`data:image/jpeg;base64,${post.image.data}`}
              alt={post.image.desc}
            />
          </Link>
        </div>
        <div className="post-text">
          <h2>{post.title}</h2>
          <div className="post-info">
            <Link className="post-author" to="/">
              Joe Brown
            </Link>
            <time>{format(parseISO(post.date), "MMMM d, y")}</time>
          </div>
          <p className="post-summary">{post.body.slice(0, 100) + "..."}</p>
        </div>
      </div>
    );
  });

  return blogPost;
};

export default BlogPost;
