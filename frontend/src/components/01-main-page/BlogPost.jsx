import { useState } from "react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

const BlogPost = ({ blogPosts }) => {
  const blogPost = blogPosts.map((post) => {
    return (
      <div key={post._id} className="blog-post">
        <div key={post._id} className="post-image">
          <img
            src="https://cdn.buttercms.com/fnvdv16ESFybbT9hisQb"
            alt="Blog img"
          />
        </div>
        <div className="post-text">
          <h2>{post.title}</h2>
          <div className="post-info">
            <Link className="post-author" to="/">
              Oguzhan Ulutas
            </Link>
            <time>{format(parseISO(post.date), "yyyy-MM-dd")}</time>
          </div>
          <p className="post-summary">{post.body.slice(0, 100) + "..."}</p>
        </div>
      </div>
    );
  });

  return blogPost;
};

export default BlogPost;
