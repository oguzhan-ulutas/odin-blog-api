const asyncHandler = require('express-async-handler');

const BlogPost = require('../models/blogPost');
const Comment = require('../models/comment');
const User = require('../models/user');

// Display list of all Authors.
exports.index = asyncHandler(async (req, res, next) => {
  // Get all data from database
  const [blogPosts, comments] = await Promise.all([
    BlogPost.find({ isPublished: true }).sort({ isPublished: 1 }).exec(),
    Comment.find().populate('user blogPost').exec(),
  ]);
  console.log(comments);
  res.json({ blogPosts, comments });
});

// Display single post
exports.blogPostGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Single post');
});
