var express = require('express');
var router = express.Router();

var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/blog", {native_parser:true});

router.get('/', function(req, res){
  res.render('home/index', { title: 'Code | Josh Kirklin' });
});

router.get('/blog', function(req, res){
	var postData = {
		title: "",
		date: "",
		tags: [],
		content: "unread"
	};
	res.render('blog/index', {tPost: postData});
});

router.get('/blog/*', function(req, res){
	
	var reqURI = req.url.substr(6)
	
	db.collection('posts').find({content: reqURI}).toArray(function(err, postData){
		res.render('blog/index', {
			title: 'Code Blog | Josh Kirklin',
			tPost: postData[0]
		});
	});
	
});

module.exports = router;
