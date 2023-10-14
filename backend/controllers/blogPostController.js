const asyncHandler = require('express-async-handler');

const BlogPost = require('../models/blogPost');
const Comment = require('../models/comment');
const User = require('../models/user');

// Display list of all Authors.
exports.index = asyncHandler(async (req, res, next) => {
  // Get published blog post data from database
  const blogPosts = await BlogPost.find({ isPublished: true })
    .populate({ path: 'comments', populate: { path: 'user' } })
    .sort({ date: 1 })
    .exec();

  res.json({ blogPosts });
});

// Display single post
exports.blogPostGet = asyncHandler(async (req, res, next) => {
  const blogPost = await BlogPost.findById(req.params.id)
    .populate({ path: 'comments', populate: { path: 'user' } })
    .exec();
  res.json({ blogPost });
});
