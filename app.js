var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var port = process.env.PORT || 3000;
// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//
//
//// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});

//// error handler
//app.use(function(err, req, res, next) {
//  // set locals, only providing error in development
//  res.locals.message = err.message;
//  res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//  // render the error page
//  res.status(err.status || 500);
//  res.render('error');
//});

app.get('/', function(req, res){
  res.render("index");
});
app.use('/register',require('./routes/register'));
app.use('/login',require('./routes/login'));
app.use('/view',require('./routes/view'));
app.use('/update',require('./routes/update'));
app.use('/maps',require('./routes/maps'));
app.use('/pie',require('./routes/pie'));
app.use('/startscript',require('./routes/startscript'));
//require('./routes')(app);
app.listen(port,function(){
  console.log("Server is using gulp and is up at : "+ port);
});

module.exports = app;
