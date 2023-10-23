const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

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

    // crypt password
    const salt = bcrypt.genSaltSync(10);

    // Create new user
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
    });

    if (!errors.isEmpty()) {
      // There ara errors render form again with errors
      res.json({ errors: errors.array() });
    } else {
      // Save user
      try {
        await user.save();
        // Redirect to log in page
        res.json({ message: 'Success' });
      } catch (err) {
        res.json({ err });
      }
    }
  }),
];

// Log in on post
exports.loginPost = asyncHandler(async (req, res, next) => {
  // Get user from db
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    console.log(user);
    res.json({ message: 'Incorrect username' });
    return;
  }

  // Compare password
  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) {
    res.json({ message: 'Incorrect password' });
    return;
  }

  jwt.sign({ ...user }, 'iKnowINeedToUseDotenvFile', { expiresIn: '2 days' }, (err, token) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    res.setHeader('Authorization', `Bearer ${token}`);

    res.json({ token });
  });
});

// Log out
exports.logout = asyncHandler(async (req, res, next) => {
  // Probably this route is unnecessary, log out can be implemented in frontend
  res.send('NOT IMPLEMENTED: Log out');
});

// Display user info
exports.displayUser = asyncHandler(async (req, res, next) => {
  // Probably this route is unnecessary, display user can be implemented in frontend
  res.send('NOT IMPLEMENTED: Display user info');
});

// Display update user form
exports.updateUserGet = asyncHandler(async (req, res, next) => {
  // Probably this route is unnecessary, update user get can be implemented in frontend
  res.send('NOT IMPLEMENTED: Display user update form');
});

// Update user info on post
exports.updateUserPost = [
  // Validate and sanitize fields.
  body('firstname').trim().escape().optional({ values: 'falsy' }),
  body('lastname').trim().escape().optional({ values: 'falsy' }),
  body('email').trim().escape().isEmail().withMessage('Invalid e-mail'),
  body('password')
    .trim()
    .isLength({ min: 4 })
    .escape()
    .withMessage('Password must be at least four characters'),

  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const updatedUser = new User({
      firstname: req.body.firstname || req.currentUser.firstname,
      lastname: req.body.lastname || req.currentUser.lastname,
      email: req.body.email || req.currentUser.email,
      password: req.body.password || req.currentUser.password,
      isAdmin: req.currentUser.isAdmin,
      _id: req.currentUser._id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with error messages.
      res.json({ errors: errors.array() });
    } else {
      // Data from form is valid. Update the record.
      await User.findByIdAndUpdate(req.params.id, updatedUser);
      res.redirect(user.url);
    }
  },
];

// Show delete user warning
exports.deleteUserGet = asyncHandler(async (req, res, next) => {
  // Probably this route is unnecessary, delete get can be implemented in frontend
  res.send('NOT IMPLEMENTED: Display delete warning');
});

// Delete user on post
exports.deleteUserPost = asyncHandler(async (req, res, next) => {
  await User.findByIdAndRemove(req.body.userid);
  res.redirect('/');
});
