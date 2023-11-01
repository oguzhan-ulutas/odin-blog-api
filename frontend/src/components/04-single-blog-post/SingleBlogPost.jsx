import base64 from "base64-js";

import { useParams } from "react-router-dom";
import Header from "../01-main-page/Header";
import Footer from "../01-main-page/Footer";

const SingleBlogPost = ({ blogPosts, user, setUser }) => {
  const { id } = useParams();
  // Get related blog post from blogPosts
  const blogPost = blogPosts.filter((post) => post._id === id)[0];
  console.log(blogPost.image);

  const base64String = `data:image/jpeg;base64,${blogPost.image.data}`;
  console.log(base64String);
  return (
    <main>
      <Header user={user} setUser={setUser} />
      <div className="content-container">
        <h2>{blogPost.title}</h2>
        <img src={base64String} alt={blogPost.image.desc} />
        <article> {blogPost.body} </article>
      </div>
      <Footer />
    </main>
  );
};

export default SingleBlogPost;
