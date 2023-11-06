import base64 from "base64-js";
import { format, parseISO } from "date-fns";
import { useParams, Link } from "react-router-dom";

import Header from "../01-main-page/Header";
import Footer from "../01-main-page/Footer";
import Comments from "./Comments";
import CreateComment from "./CreateComment";

const SingleBlogPost = ({ blogPosts, user, setUser }) => {
  const { id } = useParams();

  // Get related blog post from blogPosts
  const blogPost = blogPosts.filter((post) => post._id === id)[0];

  const base64String = `data:image/jpeg;base64,${
    blogPost ? blogPost.image.data : null
  }`;
  return (
    <main>
      <Header user={user} setUser={setUser} />
      <div className="content-container">
        {blogPost ? (
          <>
            <h2>{blogPost.title}</h2>
            <div className="post-info">
              <Link className="post-author" to="/">
                Joe Brown
              </Link>
              <time>{format(parseISO(blogPost.date), "MMMM d, y")}</time>
            </div>
            <img src={base64String} alt={blogPost.image.desc} />
            <article> {blogPost.body} </article>
            <hr
              style={{
                border: "2px solid red",
                margin: "10px 0",
                width: "90%",
              }}
            />
            <CreateComment user={user} />
            <Comments blogPost={blogPost} />
          </>
        ) : null}
      </div>
      <Footer />
    </main>
  );
};

export default SingleBlogPost;
