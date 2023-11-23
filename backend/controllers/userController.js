const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Comment = require('../models/comment');

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
      avatar: req.body.avatar,
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
    res.json({ message: 'Incorrect username' });
    return;
  }

  // Compare password
  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) {
    res.json({ message: 'Incorrect password' });
    return;
  }

  jwt.sign(
    {
      firstname: user.firstname,
      lastname: user.lastname,
      isAdmin: user.isAdmin,
      id: user._id,
      avatar: user.avatar,
    },
    'iKnowINeedToUseDotenvFile',
    { expiresIn: '2 days' },
    (err, token) => {
      if (err) {
        res.sendStatus(403);
        return;
      }

      res.json({ token });
    },
  );
});

// Update user info on post
exports.updateUserPost = async (req, res, next) => {
  // Extract the validation errors from a request.
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // There are errors. Render the form again with error messages.
    res.json({ errors: errors.array() });
  } else {
    // Data from form is valid. Update the record.
    const updatedUser = await User.findByIdAndUpdate(req.currentUser.id, req.body, { new: true });

    const user = {
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      id: updatedUser._id,
      avatar: updatedUser.avatar,
      isAdmin: updatedUser.avatar,
    };
    res.redirect(user.url);
  }
  2;
};

// Delete user on post
exports.deleteUserPost = asyncHandler(async (req, res, next) => {
  // Find delete all comments by user
  await Comment.deleteMany({ user: req.body.userId });

  // Delete user
  await User.findByIdAndRemove(req.body.userId);

  // Fetch remaining users
  const users = await User.find({});
  res.json(users);
});
