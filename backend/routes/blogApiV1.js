const express = require('express');

const router = express.Router();

const blogPostController = require('../controllers/blogPostController');
const commentController = require('../controllers/commentController');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');

// BLOG POSTS ROUTES
// Get home page
router.get('/', blogPostController.index);

// Display single post
router.get('/post/:id', blogPostController.blogPostGet);

// USER ROUTES
// Sing up on post
router.post('/signup', userController.signUpPost);

// Log in on post
router.post('/login', userController.loginPost);

// Delete user on post
router.post('/user/:id/delete', userController.deleteUserPost);

// Update user info on post
router.post('/user/:id/update', userController.updateUserPost);

// COMMENT ROUTES
// Delete comment on post
router.post('/comment/:id', commentController.deletePost);

// Add new comment
router.post('/comment', commentController.addNew);

// ADMIN ROUTES
// Display all users on get
router.get('/admin/users', adminController.allUsersGet);

// Display admin control panel
router.get('/admin', adminController.index);

// Add new post on post
router.post('/admin/add-new', adminController.addNewPost);

// Delete post on post req.
router.post('/admin/post/:postid/delete', adminController.postDeletePost);

// Edit post on post req.
router.post('/admin/post/:postid', adminController.postEditPost);

// Display single post
router.get('/admin/post/:postid', adminController.postDetailGet);

module.exports = router;
