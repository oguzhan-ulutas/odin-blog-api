import { useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateComment = ({
  user,
  postComments,
  setPostComments,
  token,
  id,
  baseUrl,
}) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `${baseUrl}comment`;

    // Sending post req. to api
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ commentBody: comment, blogPostId: id }),
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
        setPostComments([...postComments, res]);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  return user.id ? (
    <form action="" className="new-comment-form" onSubmit={handleSubmit}>
      <ReactQuill
        placeholder="Enter a comment..."
        onChange={(newValue) => {
          setComment(newValue);
        }}
      />
      <button>Create Comment</button>
    </form>
  ) : (
    <p className="comment-login-info">
      Please <Link to="/blog-api/v1/login">log in</Link> to add a comment
    </p>
  );
};

export default CreateComment;
