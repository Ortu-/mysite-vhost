var express = require('express');
var router = express.Router();

var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/blog", {native_parser:true});

exports.partials = function(req, res){
	console.log("get partial: partial" + req.url);
	res.render("partials" + req.url);
};

exports.index = function(req, res){
	console.log("default index|"+ req.url);
	res.render('main/index', { title: 'Code | Josh Kirklin' });
};