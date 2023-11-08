const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Comment = require('../models/comment');
const User = require('../models/user');
const BlogPost = require('../models/blogPost');

// Add new comment
exports.addNew = [
  body('commentBody').trim().isLength({ min: 1 }).withMessage('Empty comments are not allowed.'),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // find user by id
    const user = await User.findById(req.currentUser.id);

    // Create new comment
    const comment = new Comment({
      body: req.body.commentBody,
      user,
    });
    console.log(comment);
    // Add comment to blog post
    await BlogPost.findByIdAndUpdate(req.body.blogPostId, { $push: { comments: comment._id } });

    if (!errors.isEmpty()) {
      // There ara errors render form again with errors
      res.json({ errors: errors.array() });
      return;
    }

    // Save comment
    await comment.save();
    // Redirect to blog page
    res.json(comment);
  }),
];

// Display warning on delete get
exports.deleteGet = asyncHandler(async (req, res, next) => {
  // Probably this route is unnecessary, the form can be implemented in frontend
  res.send('NOT IMPLEMENTED: Display warning on delete get');
});

// Delete comment on post
exports.deletePost = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  // Delete comment from the blogPost
  await BlogPost.updateOne(req.body.blogPostId, {
    $pull: { comments: { _id: req.body.commentid } },
  });

  await Comment.findByIdAndRemove(req.body.commentid);

  const comments = await BlogPost.findById(req.body.blogPostId)
    .select('comments')
    .populate({ path: 'comments', populate: { path: 'user' } })
    .sort({ date: 1 })
    .exec();
  res.json(comments);
});
