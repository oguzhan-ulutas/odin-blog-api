const express = require('express');

const router = express.Router();

const blogPostController = require('../controllers/blogPostController');
const commentController = require('../controllers/commentController');
const userController = require('../controllers/userController');

// Get home page
router.get('/', blogPostController.index);

// USER ROUTES
// Display sing up form on get
router.get('/signup', userController.signUpGet);

// Sing up on post
router.post('/signup', userController.signUpPost);

// Display log in form on get
router.get('/login', userController.loginGet);

// Log in on post
router.post('/login', userController.loginPost);

// Display user info
router.get('/user/:id', userController.displayUser);

// Display update user form
router.get('/user/:id/update', userController.updateUserGet);

// Update user info on post
router.post('/user/:id/update', userController.updateUserPost);

// Show delete user warning
router.get('/user/:id/delete', userController.deleteUserGet);

// Delete user on post
router.post('/user/:id/delete', userController.deleteUserPost);

// BLOG POSTS ROUTES
// Display single post
router.get('/post/:id', blogPostController.blogPostGet);

// COMMENT ROUTES
// Add new comment
router.post('/comment', commentController.addNew);

// Display warning on delete get
router.get('/comment/:id', commentController.deleteGet);

// Delete comment on post
router.post('/comment/:id', commentController.deletePost);

module.exports = router;
