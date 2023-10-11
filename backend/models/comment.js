const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  body: { type: String, require: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

// Virtual for user url
UserSchema.virtual('url').get(function () {
  return `/blog-api/v1/comment/${this._id}`;
});

// Export model
module.exports = mongoose.model('Comment', CommentSchema);
