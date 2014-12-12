var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



//database setup
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/blog", {native_parser:true});


//router setup
var routes = require('./routes/index');
var services = require('./routes/services');
var users = require('./routes/users');



//initialize app
var app = express();
	app.locals.pretty = true; //enforce formatted html output
	app.use(favicon(__dirname + 'public/favicon.ico'));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



//hook up middleware
app.use(function(req, res, next){
	req.db = db;
	next();
});

app.use('/', routes);
app.use('/services', services);
app.use('/users', users);



//error handling
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
