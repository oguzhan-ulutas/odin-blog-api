import { useEffect } from "react";

const AddNewPost = ({ newPost, setNewPost, token, posts, setPosts }) => {
  useEffect(() => {
    setNewPost({ isPublished: false });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "http://localhost:3000/blog-api/v1/admin/add-new";

    // Sending post req. to api
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
        if (res.msg) {
          return;
        }
        setPosts([...posts, res]);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  console.log(newPost);
  console.log(posts);
  return (
    <form action="" onSubmit={handleSubmit}>
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
        <input type="text" name="title" onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="body">Body: </label>
        <textarea type="text" name="body" onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="isPublished">Publish: </label>
        <input
          type="checkbox"
          name="isPublished"
          className="check-box"
          onChange={(e) => {
            console.log(e.target.checked);
            setNewPost({ ...newPost, isPublished: e.target.checked });
          }}
        />
      </div>
      <button>Add New Post</button>
    </form>
  );
};

export default AddNewPost;
