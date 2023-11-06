import { format, parseISO } from "date-fns";
import { useState } from "react";

import CreateComment from "./CreateComment";

const Comments = ({ blogPost, user }) => {
  const [postComments, setPostComments] = useState(blogPost.comments);

  return (
    <>
      <CreateComment
        user={user}
        postComments={postComments}
        setPostComments={setPostComments}
      />
      <h3>{postComments[0]._id ? postComments.length : "0"} Comments</h3>
      {postComments[0]._id
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
                <div className="comment-body">{comment.body}</div>
              </div>
            );
          })
        : null}
    </>
  );
};

export default Comments;
