import { format, parseISO } from "date-fns";
import { useState } from "react";
import HTMLString from "react-html-string";

import CreateComment from "./CreateComment";

const Comments = ({ blogPost, user, token }) => {
  const [postComments, setPostComments] = useState(blogPost.comments);
  console.log(user);

  return (
    <>
      <CreateComment
        user={user}
        postComments={postComments}
        setPostComments={setPostComments}
        token={token}
      />
      <h3>{postComments[0]._id ? postComments.length : "0"} Comments</h3>
      {postComments[0]._id
        ? postComments.map((comment) => {
            console.log(comment.user);
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
                  {user.id === comment.user._id ? (
                    <>
                      <button>Edit</button>
                      <button>Delete</button>
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
