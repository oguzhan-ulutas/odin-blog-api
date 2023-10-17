const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const indexRouter = require('./routes/index');
const blogApiRouter = require('./routes/blogApiV1'); // Import routes for "blog api v1" area of site

const app = express();

// Set mangoDB database
mongoose.set('strictQuery', false);

const mongoDB =
  'mongodb+srv://mkoulutas:PISrPqLGt8mgiwRR@cluster0.ighlcln.mongodb.net/?retryWrites=true&w=majority';

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Verify user if req. object has token
app.use((res, req, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'iKnowINeedToUseDotenvFile', (err, user) => {
      if (err) return res.sendStatus(403);
      req.currentUser = user;
    });
  }
  next();
});

app.use('/', indexRouter);
app.use('/blog-api/v1', blogApiRouter); // Add catalog routes to middleware chain.

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
