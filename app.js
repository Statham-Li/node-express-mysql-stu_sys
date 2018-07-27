var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  //获取请求地址
  var url = req.originalUrl
  //判断cookies中是否有userId,如果有，则放行
  if (req.cookies.userId) {
    next()
  } else {
    // 如果没有，则判断是不是登录或者注册url
    if (url == "/users/login" || url == "/users/register") {
      next()
    }
    //都不是的话，则跳转到登录页
    else {
      res.redirect('/users/login')
    }
  }
}); 

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(404)
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(500)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
