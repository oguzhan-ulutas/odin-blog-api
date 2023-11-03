import { format, parseISO } from "date-fns";

const Comments = ({ blogPost }) => {
  console.log(blogPost.comments);
  const postComments = blogPost.comments;
  return (
    <>
      <h3>{postComments.length} Comments</h3>
      {postComments
        ? postComments.map((comment) => {
            return (
              <div key={comment._id} className="comments">
                <div className="comment-header">
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
