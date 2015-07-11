/*
	- vHost: Domain Server -
	
	joshkirklin.com
*/

var express = require('express');
var vhost = require('vhost');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));

app.use(vhost('code.joshkirklin.com', require('./hosts/code')));
app.use(vhost('games.joshkirklin.com', require('./hosts/games')));
app.use(vhost('*.joshkirklin.com', require('./hosts/www')));
app.use(vhost('joshkirklin.com', require('./hosts/www')));



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



app.listen(80);
console.log("vhost server listening on port 80 >>");

module.exports = app;
