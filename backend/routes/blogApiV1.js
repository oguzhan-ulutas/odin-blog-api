const express = require('express');

const router = express.Router();

const blogPostController = require('../controllers/blogPostController');
const commentController = require('../controllers/commentController');
const userController = require('../controllers/userController');

module.exports = router;

// Get home page
router.get('/', blogPostController.index);
