const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  body: { type: String, require: true },
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

// Virtual for user url
CommentSchema.virtual('url').get(function () {
  return `/blog-api/v1/comment/${this._id}`;
});

// Export model
module.exports = mongoose.model('Comment', CommentSchema);
