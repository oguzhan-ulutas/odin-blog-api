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
// Display sing up form on get
router.get('/signup', userController.signUpGet);

// Sing up on post
router.post('/signup', userController.signUpPost);

// Display log in form on get
router.get('/login', userController.loginGet);

// Log in on post
router.post('/login', userController.loginPost);

// Log out on post
router.get('/user/logout/:d', userController.logout);

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

// COMMENT ROUTES
// Add new comment
router.post('/comment', commentController.addNew);

// Display warning on delete get
router.get('/comment/:id', commentController.deleteGet);

// Delete comment on post
router.post('/comment/:id', commentController.deletePost);

// ADMIN ROUTES
// Display admin control panel
router.get('/admin', adminController.index);
// Display log in form on get
router.get('/admin/login', adminController.loginGet);

// Log in on post
router.post('/admin/login', adminController.loginPost);

// Display add new post form
router.get('/admin/add-new', adminController.addNewGet);

// Add new post on post
router.post('/admin/add-new', adminController.addNewPost);

// Display single post
router.get('/admin/post/:postid', adminController.postDetailGet);

// Display post edit page on get
router.get('/admin/post/:postid/edit', adminController.postEditGet);

// Edit post on post req.
router.post('/admin/post/:postid/edit', adminController.postEditPost);

// Display post delete warning on get
router.get('/admin/post/:postid/delete', adminController.postDeleteGet);

// Delete post on post req.
router.post('/admin/post/:postid/delete', adminController.postDeletePost);

// Display all coments of a post
router.get('/admin/post/:postid/comments', adminController.commentsGet);

// Display single comment
router.get('/admin/post/:postid/comment/:id', adminController.commentDetailGet);

// Display comment edit page on get
router.get('/admin/post/:postid/comment/:id/edit', adminController.commentEditGet);

// Edit comment on post req.
router.post('/admin/post/:postid/comment/:id/edit', adminController.commentEditPost);

// Display comment delete warning on get
router.get('/admin/post/:postid/comment/:id/delete', adminController.commentDeleteGet);

// Delete comment on post req.
router.post('/admin/post/:postid/comment/:id/delete', adminController.commentDeletePost);

module.exports = router;
