import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./PostUpdateForm.css";

const PostUpdateForm = ({ posts, newPost, setNewPost, token }) => {
  const { postid } = useParams();
  const [post] = posts.filter((post) => post._id === postid);
  const [msg, setMsg] = useState("");

  // Set newpost satate to old post
  useEffect(() => {
    setNewPost(post);
  }, [post]);

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `http://localhost:3000/blog-api/v1/admin/post/${postid}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPost),
      mode: "cors",
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        setMsg(res.msg);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <>
      <h2>Update Post: </h2>
      <form action="" onSubmit={handleSubmit}>
        <img src={`data:image/jpeg;base64,${post.image.data}`} alt="" />

        <div>
          <label htmlFor="image">Image: </label>
          <input
            type="file"
            placeholder="Add image..."
            name="image"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.readAsDataURL(file);

              reader.onloadend = () => {
                const base64String = reader.result.split(",")[1];
                setNewPost({ ...newPost, image: { data: base64String } });
              };
            }}
          />
        </div>

        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            defaultValue={post.title}
            name="title"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="body">Body: </label>
          <textarea
            type="text"
            defaultValue={post.body}
            name="body"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="isPublished">Publish: </label>
          <input
            type="checkbox"
            defaultValue={post.isPublished}
            name="isPublished"
            className="check-box"
            onChange={(e) => {
              console.log(e.target.checked);
              setNewPost({ ...newPost, isPublished: e.target.checked });
            }}
          />
        </div>
        <button>Update</button>
      </form>
      {msg ? <h5>{msg}</h5> : null}
    </>
  );
};

export default PostUpdateForm;
