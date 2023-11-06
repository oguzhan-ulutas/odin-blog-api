import { useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateComment = ({ user, postComments, setPostComments }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "http://localhost:3000/blog-api/v1/comment";

    // Sending post req. to api
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ commentBody: comment, userid: user.id }),
      headers: { "Content-Type": "application/json" },
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
  console.log(comment);
  console.log(user);
  return user.id ? (
    <form action="" className="new-comment-form" onSubmit={handleSubmit}>
      <ReactQuill
        placeholder="Enter a comment..."
        onChange={(newValue) => {
          // Triming first and last 3 char of value
          const trimmedString = newValue.substring(3, newValue.length - 4);
          setComment(trimmedString);
        }}
      />
      <input type="hidden" name="user" value={user} />
      <button>Create Comment</button>
    </form>
  ) : (
    <p className="comment-login-info">
      Please <Link to="/blog-api/v1/login">log in</Link> to add a comment
    </p>
  );
};

export default CreateComment;