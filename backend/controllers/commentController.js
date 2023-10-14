const asyncHandler = require('express-async-handler');

// Add new comment
exports.addNew = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Add new comment');
});

// Display warning on delete get
exports.deleteGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Display warning on delete get');
});

// Delete comment on post
exports.deletePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Delete comment on post');
});
