var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var onicaresRouter = require('./routes/onicares');
var bodyParser = require('body-parser')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next){
	res.locals.connection = mysql.createConnection({
		host     : 'database-1.cmhiu4iekug7.ap-south-1.rds.amazonaws.com',
    user     : 'admin',
    port      :3306,
		password : 'nikolatesla123',
		database : 'onicarestest'
	});
	res.locals.connection.connect();
	next();
});
app.use('/', indexRouter);
app.use('/onicares', onicaresRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//databse connection
var mysql = require("mysql");

module.exports = app;
