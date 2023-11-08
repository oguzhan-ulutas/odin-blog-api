const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Comment = require('../models/comment');
const User = require('../models/user');

// Add new comment
exports.addNew = [
  body('commentBody').trim().isLength({ min: 1 }).withMessage('Empty comments are not allowed.'),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // find user by id
    const user = await User.findById(req.currentUser.id);
    console.log(req.body.commentBody);
    // Create new comment
    const comment = new Comment({
      body: req.body.commentBody,
      user,
    });

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
  await Comment.findByIdAndRemove(req.body.commentid);
  res.redirect('/blog-api/v1/');
});
