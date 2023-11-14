import { useEffect } from "react";
import { useParams } from "react-router-dom";

const PostUpdateForm = ({ posts, newPost, setNewPost }) => {
  const { postid } = useParams();
  const [post] = posts.filter((post) => post._id === postid);

  // Set newpost satate to old post
  useEffect(() => {
    setNewPost(post);
  }, [post]);

  console.log(post);
  console.log(newPost);

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h2>Update Post: </h2>
      <form action="">
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
            onChange={(e) => {
              console.log(e.target.checked);
              setNewPost({ ...newPost, isPublished: e.target.checked });
            }}
          />
        </div>
        <button>Update</button>
      </form>
    </>
  );
};

export default PostUpdateForm;
