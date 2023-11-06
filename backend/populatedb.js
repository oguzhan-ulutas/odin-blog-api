#! /usr/bin/env node

console.log(
  'This script populates some test users and blog posts, comments to database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"',
);
const fs = require('fs');
// Import bycrpt
const bcrypt = require('bcryptjs');
const base64 = require('base64-js');
// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const mongoose = require('mongoose');

const User = require('./models/user');
const BlogPost = require('./models/blogPost');
const Comment = require('./models/comment');

const users = [];
const comments = [];
const imageBuffer = {
  data: '',
  contentType: 'jpg/png',
  desc: 'Blog writing with scrabble game letters',
};

fs.readFile('/Users/oguzhan/Downloads/photo.jpg', (err, dataImg) => {
  if (err) throw err;

  imageBuffer.data = base64.fromByteArray(dataImg);
});

// Reading avatar files
const avatar0 = {
  data: '',
  contentType: 'jpg/png',
  desc: 'User avatar',
};
const avatar1 = {
  data: '',
  contentType: 'jpg/png',
  desc: 'User avatar',
};
const avatar2 = {
  data: '',
  contentType: 'jpg/png',
  desc: 'User avatar',
};
const avatar3 = {
  data: '',
  contentType: 'jpg/png',
  desc: 'User avatar',
};
const avatar4 = {
  data: '',
  contentType: 'jpg/png',
  desc: 'User avatar',
};

fs.readFile('backend/avatar_image/avatar.png', (err, dataImg) => {
  if (err) throw err;

  avatar0.data = base64.fromByteArray(dataImg);
});
fs.readFile('backend/avatar_image/avatar1.png', (err, dataImg) => {
  if (err) throw err;

  avatar1.data = base64.fromByteArray(dataImg);
});
fs.readFile('backend/avatar_image/avatar2.png', (err, dataImg) => {
  if (err) throw err;

  avatar2.data = base64.fromByteArray(dataImg);
});
fs.readFile('backend/avatar_image/avatar3.png', (err, dataImg) => {
  if (err) throw err;

  avatar3.data = base64.fromByteArray(dataImg);
});
fs.readFile('backend/avatar_image/avatar4.png', (err, dataImg) => {
  if (err) throw err;

  avatar4.data = base64.fromByteArray(dataImg);
});

mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createUsers();
  await createComments();
  await createBlogPosts();

  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function userCreate(index, firstname, lastname, email, password, isAdmin, avatar) {
  // crypt password
  const salt = bcrypt.genSaltSync(10);
  console.log(avatar);

  // Create new user
  const user = new User({
    firstname,
    lastname,
    email,
    password: bcrypt.hashSync(password, salt),
    isAdmin,
    avatar,
  });

  await user.save();
  users[index] = user;

  console.log(`Added user: ${firstname}`);
}

async function blogPostCreate(title, body, date, comments, isPublished, image) {
  const blogPost = new BlogPost({
    title,
    body,
    date,
    comments,
    isPublished,
    image,
  });

  await blogPost.save();
  console.log(`Added post: ${title}`);
}

async function commentCreate(index, body, date, user) {
  const comment = new Comment({
    body,
    date,
    user,
  });

  await comment.save();
  comments[index] = comment;
  console.log(`Added comment: ${body}`);
}

async function createUsers() {
  console.log('Adding users');

  await Promise.all([
    userCreate(0, 'admin', 'admin', 'admin@admin.com', '1234', true, avatar0),
    userCreate(1, 'Jenny', 'Gonzales', 'jenny@gmail.com', '1234', false, avatar1),
    userCreate(2, 'John', 'Smith', 'john@yahoo.com', '1234', false, avatar2),
    userCreate(3, 'Ali', 'Bayrak', 'ali@hotmail.com', '1234', false, avatar3),
    userCreate(4, 'testFirstname', 'testLastname', 'test@test.com', '1234', false, avatar4),
  ]);
}

async function createComments() {
  console.log('Adding comments');
  await Promise.all([
    commentCreate(0, loremComment, '1698327877014', users[0]),
    commentCreate(1, loremComment, '1698327877014', users[1]),
    commentCreate(2, loremComment, '1698327877014', users[1]),
    commentCreate(3, loremComment, '1698327877014', users[2]),
    commentCreate(4, loremComment, '1698327877014', users[0]),
    commentCreate(5, loremComment, '1698327877014', users[1]),
    commentCreate(6, loremComment, '1698327877014', users[3]),
    commentCreate(7, loremComment, '1698327877014', users[3]),
    commentCreate(8, loremComment, '1698327877014', users[3]),
    commentCreate(9, loremComment, '1698327877014', users[3]),
    commentCreate(10, loremComment, '1698327877014', users[3]),
  ]);
}

async function createBlogPosts() {
  console.log('Adding blog posts');
  await Promise.all([
    blogPostCreate(
      'Lorem ipsum dolor sit amet',
      lorem,
      '1698327877014',
      [comments[0], comments[1], comments[2]],
      true,
      imageBuffer,
    ),
    blogPostCreate(
      'Lorem ipsum dolor sit amet',
      lorem,
      '1698327877014',
      [comments[3], comments[4], comments[5]],
      true,
      imageBuffer,
    ),
    blogPostCreate(
      'Lorem ipsum dolor sit amet',
      lorem,
      '1698327877014',
      [comments[6], comments[7], comments[8]],
      true,
      imageBuffer,
    ),
    blogPostCreate(
      'Lorem ipsum dolor sit amet',
      lorem,
      '1698327877014',
      [comments[9], comments[10]],
      false,
      imageBuffer,
    ),
    blogPostCreate('Lorem ipsum dolor sit amet', lorem, '1698327877014', [], true, imageBuffer),
    blogPostCreate(
      'Lorem ipsum dolor sit amet',
      lorem,
      '1698327877014',
      [comments[9], comments[10]],
      false,
      imageBuffer,
    ),
  ]);
}

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Laoreet non curabitur gravida arcu. Vitae purus faucibus ornare suspendisse sed nisi lacus. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Odio ut enim blandit volutpat maecenas volutpat blandit. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Fames ac turpis egestas sed. Elementum sagittis vitae et leo duis ut diam quam nulla. Tellus molestie nunc non blandit massa. Ipsum a arcu cursus vitae congue. Nisl tincidunt eget nullam non nisi. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Tincidunt dui ut ornare lectus. Pharetra sit amet aliquam id diam maecenas ultricies mi.

Habitasse platea dictumst vestibulum rhoncus. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor. Venenatis cras sed felis eget velit aliquet sagittis id consectetur. Duis convallis convallis tellus id interdum velit laoreet. Aliquam eleifend mi in nulla posuere sollicitudin. Purus ut faucibus pulvinar elementum integer enim neque. Amet facilisis magna etiam tempor. Sed euismod nisi porta lorem mollis. Et netus et malesuada fames. Quis commodo odio aenean sed adipiscing diam donec adipiscing tristique. Commodo elit at imperdiet dui accumsan sit amet nulla. Vulputate odio ut enim blandit volutpat maecenas.

At consectetur lorem donec massa sapien. Sit amet dictum sit amet justo donec enim. Porta non pulvinar neque laoreet suspendisse interdum. Odio pellentesque diam volutpat commodo sed. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Scelerisque felis imperdiet proin fermentum leo. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Leo in vitae turpis massa sed. Orci phasellus egestas tellus rutrum. Dictum at tempor commodo ullamcorper a lacus vestibulum. At urna condimentum mattis pellentesque id nibh tortor. Pellentesque elit ullamcorper dignissim cras. Quis enim lobortis scelerisque fermentum dui faucibus. Fringilla urna porttitor rhoncus dolor purus non enim. Quam nulla porttitor massa id neque aliquam. Sem nulla pharetra diam sit. Magna ac placerat vestibulum lectus mauris. Nascetur ridiculus mus mauris vitae. Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Nullam ac tortor vitae purus faucibus ornare suspendisse.

Lectus proin nibh nisl condimentum id venenatis. Tristique nulla aliquet enim tortor at. Dis parturient montes nascetur ridiculus mus mauris. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra. Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Pharetra et ultrices neque ornare. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Tortor dignissim convallis aenean et tortor. Amet nisl purus in mollis. Ut lectus arcu bibendum at.

Quis auctor elit sed vulputate mi sit amet. Posuere morbi leo urna molestie. Sollicitudin aliquam ultrices sagittis orci a. Vitae justo eget magna fermentum iaculis eu non diam. Consectetur purus ut faucibus pulvinar elementum integer enim. Tincidunt dui ut ornare lectus sit amet est placerat. Volutpat diam ut venenatis tellus. A iaculis at erat pellentesque. Viverra maecenas accumsan lacus vel facilisis volutpat. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Velit aliquet sagittis id consectetur.`;

const loremComment =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.';
