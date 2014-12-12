var express = require('express');
var router = express.Router();

var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/blog", {native_parser:true});



//get blog data --------------------------------------

router.get('/blog/post-content/*', function(req, res){
	var fs = require('fs');
	
	var reqPost = req.url.split("/").pop();
	var rootPath = __dirname.split("\\");
	var n = rootPath.pop();
	var reqFile = rootPath.join("\\") + '\\public\\blog\\posts\\' + reqPost + '.html';
	var resData = {contentBody: "Oops! The requested post is currently unavailable."};
	
	fs.readFile(reqFile, function (err, fileContent) {
		if (!err) { resData = {contentBody: fileContent.toString()}; }
		res.json(resData);
	});	
});



router.get('/blog/next-post/*', function(req, res){
	var lastPost = req.url.split("/").pop();
	if(lastPost == "0"){
		var postData = {
			title: "",
			date: "",
			tags: [],
			content: "introduction"
		};
		res.json({url: postData.content});
	}
	else{
		console.log("last: " + lastPost);
		db.collection('posts').find().sort({_id: 1}).toArray(function(err, posts){
			console.log("len: " + posts.length);
			for(var p = 0;p<posts.length;p++){
				console.log(posts[p]._id);
				if(posts[p]._id == lastPost){
					if(p == posts.length - 1){ 
						res.json({url: posts[p].content});
					}
					else{
						res.json({url: posts[p+1].content});
					}
				}
			}
		});
	}
});



router.get('/blog/preview-posts/*', function(req, res){
	
	var pageSize = 4;
	var reqPage = req.url.split("/").pop();
	var toPage = reqPage * pageSize;

	db.collection('posts').find().sort({date: -1}).limit(pageSize).skip(toPage).toArray(function (err, posts){
		res.json(posts);
	});
});



module.exports = router;
