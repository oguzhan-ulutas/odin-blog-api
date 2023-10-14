const asyncHandler = require('express-async-handler');

// Display admin control panel
exports.index = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Admin control panel');
});

// Display log in form on get
exports.loginGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Log in get form admin');
});

// Log in on post
exports.loginPost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Log in on post');
});

// Display add new post form
exports.addNewGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Add new post form');
});

// Add new post on post req.
exports.addNewPost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Add new post to database');
});

// Display single post detail
exports.postDetailGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Display single post detail');
});

// Display post edit page on get
exports.postEditGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Display post edit form');
});

// Edit post on post req.
exports.postEditPost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Edit post on post req.');
});

// Display post delete warning on get
exports.postDeleteGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Display post delete warning on get');
});

// Delete post on post req.
exports.postDeletePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Delete post on post req.');
});

// Display all coments of a post
exports.commentsGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Display all comments of the post');
});

// Display single comment
exports.commentDetailGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Display a comment s detail');
});

// Display comment edit page on get
exports.commentEditGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Display comment edit form');
});

// Edit comment on post req.
exports.commentEditPost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Edit comment on post.');
});

// Display comment delete warning on get
exports.commentDeleteGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Display comment delete warning on get');
});

// Delete comment on post req.
exports.commentDeletePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Delete comment on post req.');
});
