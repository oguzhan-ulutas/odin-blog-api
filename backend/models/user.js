const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstname: { type: String, required: true, maxLength: 100 },
  lastname: { type: String, required: true, maxLength: 100 },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  avatar: {
    data: { type: String },
    contentType: { type: String, default: 'jpg/png' },
    desc: { type: String, default: 'User avatar' },
  },
});

// Virtual for full name.
UserSchema.virtual('fullname').get(function () {
  let fullName = '';
  if (this.firstname && this.lastname) {
    fullName = `${this.lastname}, ${this.firstname}`;
  }

  return fullname;
});

// Virtual for user url
UserSchema.virtual('url').get(function () {
  return `/blog-api/v1/user/${this._id}`;
});

// Export model
module.exports = mongoose.model('User', UserSchema);
