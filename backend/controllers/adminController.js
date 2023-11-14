const asyncHandler = require('express-async-handler');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const BlogPost = require('../models/blogPost');

const mongoDB =
  'mongodb+srv://mkoulutas:PISrPqLGt8mgiwRR@cluster0.ighlcln.mongodb.net/?retryWrites=true&w=majority';

// Create a storage object with a given configuration
const storage = new GridFsStorage({
  url: mongoDB,
  file: (req, file) => {
    // If it is an image, save to photos bucket
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      return {
        bucketName: 'photos',
        filename: `${Date.now()}_${file.originalname}`,
      };
    }
    // Otherwise save to default bucket
    return `${Date.now()}_${file.originalname}`;
  },
});

const upload = multer({ storage });

// Display admin control panel
exports.index = asyncHandler(async (req, res, next) => {
  // Check if user admin
  if (!req.currentUser.isAdmin) {
    res.json({ msg: 'You are not authorized' });
    return;
  }
  // Get  blog post data from database
  const posts = await BlogPost.find({})
    .populate({
      path: 'comments',
      populate: { path: 'user', select: 'firstname lastname avatar isAdmin _id' },
    })
    .sort({ date: 1 })
    .exec();

  res.json({ posts });
});

// Display log in form on get
exports.loginGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Log in get form admin');
});

// Log in on post
exports.loginPost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Log in on post');
});

// Display add new post form
exports.addNewGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Add new get to database');
});

// Add new post on post req.
exports.addNewPost = [
  upload.single('blogPhoto'),

  asyncHandler(async (req, res, next) => {
    const { file } = req;
    // Respond with the file details
    res.send({
      message: 'Uploaded',
      id: file.id,
      name: file.filename,
      contentType: file.contentType,
    });
  }),
];

// Display single post detail
exports.postDetailGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Display single post detail');
});

// Display post edit page on get
exports.postEditGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Display post edit form');
});

// Edit post on post req.
exports.postEditPost = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  // Check if user admin
  if (!req.currentUser.isAdmin) {
    res.json({ msg: 'You are not authorized' });
    return;
  }

  // Create new blogpost object
  const post = new BlogPost(req.body);
  await BlogPost.findByIdAndUpdate(req.body._id, post, {});
  res.json({ msg: 'Success on edit' });
});

// Display post delete warning on get
exports.postDeleteGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Display post delete warning on get');
});

// Delete post on post req.
exports.postDeletePost = asyncHandler(async (req, res, next) => {
  // Check if user admin
  if (!req.currentUser.isAdmin) {
    res.json({ msg: 'You are not authorized' });
    return;
  }

  const post = await BlogPost.findByIdAndRemove(req.body.id);

  if (post) {
    // Post deleted
    res.json({ msg: 'Post deleted' });
    return;
  }

  res.json({ msg: 'Post could not found. It may be deleted already.' });
});

// Display all comments of a post
exports.commentsGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Display all comments of the post');
});

// Display single comment
exports.commentDetailGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Display a comment s detail');
});

// Display comment edit page on get
exports.commentEditGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Display comment edit form');
});

// Edit comment on post req.
exports.commentEditPost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Edit comment on post.');
});

// Display comment delete warning on get
exports.commentDeleteGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Display comment delete warning on get');
});

// Delete comment on post req.
exports.commentDeletePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Delete comment on post req.');
});
