const asyncHandler = require('express-async-handler');

// Display sing up form on get
exports.signUpGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Sing up get form');
});

// Sing up on post
exports.signUpPost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Sing up post');
});

// Display log in form on get
exports.loginGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Log in get form');
});

// Log in on post
exports.loginPost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Log in post');
});

// Display user info
exports.displayUser = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Display user info');
});

// Display update user form
exports.updateUserGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Display user update form');
});

// Update user info on post
exports.updateUserPost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Update user on post');
});

// Show delete user warning
exports.deleteUserGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Display delete warning');
});

// Delete user on post
exports.deleteUserPost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Delete user');
});
