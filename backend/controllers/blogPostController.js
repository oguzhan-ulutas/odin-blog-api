const asyncHandler = require('express-async-handler');
const BlogPost = require('../models/blogPost');

// Display list of all Authors.
exports.index = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author list');
});
