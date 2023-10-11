const mongoose = require('mongoose');

const { Schema } = mongoose;

const BlogPostSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  body: { type: String, require: true },
  date: { type: Date, default: Date.now },
});

BlogPostSchema.virtual('url').get(function () {
  return `/blog-api/v1/blog-post/${this._id}`;
});

// Export model
module.exports = mongoose.model('BlogPost', BlogPostSchema);
