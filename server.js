var express = require('express');
var path = require('path');
var routePrefix = "/ipWebServer/REST/"
var app = express();

app.use(express.logger('dev'));

// marker for `grunt-express` to inject static folder/contents
app.use(function staticsPlaceholder(req, res, next) {
  return next();
});

app.use(express.cookieParser());
app.use(express.session({ secret: 'i am not telling you' }));
app.use(express.bodyParser());

app.get(routePrefix+'ping', function(req, res) {
  
    res.send([{name:'server'}]);
});

app.get(routePrefix+'login', function(req, res) {
	console.log(req.query.userName)
    res.send([{name:'server'}]);
});

module.exports = app;