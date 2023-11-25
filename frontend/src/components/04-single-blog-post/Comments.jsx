import { format, parseISO } from "date-fns";
import { useState } from "react";
import HTMLString from "react-html-string";

import CreateComment from "./CreateComment";

const Comments = ({ blogPost, user, token, id, baseUrl }) => {
  const [postComments, setPostComments] = useState(blogPost.comments);

  const handleDelete = (e) => {
    e.preventDefault();

    const commentid = e.target.className;
    const url = `${baseUrl}comment/${commentid}`;
    // Sending post req. to api
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ commentid, blogPostId: id }),
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
        setPostComments(res.comments);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <>
      <CreateComment
        user={user}
        postComments={postComments}
        setPostComments={setPostComments}
        token={token}
        id={id}
        baseUrl={baseUrl}
      />
      <h3>{postComments.length ? postComments.length : "0"} Comments</h3>
      {postComments.length
        ? postComments.map((comment) => {
            return (
              <div key={comment._id} className="comments">
                <div className="comment-header">
                  <img
                    src={`data:image/png;base64,${comment.user.avatar.data}`}
                    alt=""
                  />
                  <p>
                    {comment.user.firstname} {comment.user.lastname}
                  </p>
                  <time>{format(parseISO(comment.date), "MMMM d, y")}</time>
                </div>
                <div className="comment-body">
                  <HTMLString html={comment.body} />
                </div>
                <div className="comment-buttons">
                  {user.id === comment.user._id || user.isAdmin ? (
                    <>
                      <button className={comment._id} onClick={handleDelete}>
                        Delete
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            );
          })
        : null}
    </>
  );
};

export default Comments;
