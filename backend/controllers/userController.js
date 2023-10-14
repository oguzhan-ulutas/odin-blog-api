const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

// Display sing up form on get
exports.signUpGet = asyncHandler(async (req, res, next) => {
  // Probably this route is unnecessary, the form can be implemented in frontend
  res.json({});
});

// Sing up on post
exports.signUpPost = [
  // Validate and sanitize fields.
  body('firstname')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('First name must be specified.')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric characters.'),
  body('lastname')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Family name must be specified.')
    .isAlphanumeric()
    .withMessage('Family name has non-alphanumeric characters.'),
  body('email').trim().escape().isEmail().withMessage('Invalid e-mail'),
  body('password')
    .trim()
    .isLength({ min: 4 })
    .escape()
    .withMessage('Password must be at least four characters'),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    console.log(req.body);

    // Create new user
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      // There ara errors render form again with errors
      res.json({ errors: errors.array() });
      return;
    }

    // Crypt password
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        next(err);
        return;
      }
      user.password = hashedPassword;
    });

    // Save user
    await user.save();
    // Redirect to log in page
    res.redirect('/blog-api/v1/login');
  }),
];

// Display log in form on get
exports.loginGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Log in get form');
});

// Log in on post
exports.loginPost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Log in post');
});

// Log out
exports.logout = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Log out');
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
