var express = require('express');
var router = express.Router();

var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/blog", {native_parser:true});

//blog GET --------------------------------------

router.get('/blog/post-content/*', function(req, res){
	console.log("requested post content: " + req.url);
	var fs = require('fs');
	
	var reqPost = req.url.split("/").pop();
	var rootPath = __dirname.split("\\");
	var n = rootPath.pop();
	var reqFile = rootPath.join("\\") + '\\public\\blog\\posts\\' + reqPost + '.html';
	var resData = {	contentBody: "Oops! The requested post is currently unavailable." };
	
	fs.readFile(reqFile, function (err, fileContent) {
		if (!err) { 
			
			resData = {	contentBody: fileContent.toString()	}; 

			db.collection('posts').find({content: reqPost}).toArray(function(err, postData){
				resData.post_id	= postData[0]._id;
				resData.title = postData[0].title;
				resData.date = postData[0].date;
				resData.tags = postData[0].tags;
				res.json(resData);	
			});				
		
		}
		else{
			res.json(resData);				
		}
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
	console.log("get preview posts, page: "+ reqPage);
	db.collection('posts').find().sort({date: -1}).limit(pageSize).skip(toPage).toArray(function (err, posts){
		res.json(posts);
	});
});



router.get('/blog/post-comments/*', function(req, res){
	console.log("req for comments");
	var reqPost = req.url.split("/").pop();
	console.log(">>requesting comments for post_id" + reqPost);
	db.collection('comments').find({post_id: reqPost}).sort({_id: 1}).toArray(function(err, comments){
		console.log("  found " + comments.length + " comments");
		res.json(comments);
	});
});



//blog POST --------------------------------------

router.post('/blog/post-add-comment', function(req, res){
	console.log(">> Adding comment: ");
	console.log(req.body);
	
	db.collection('comments').insert({
		post_id: req.body.post_id,
		date: req.body.date,
		user: req.body.user,
		content: req.body.content
	}, function(err, result){	
		var rtn = true;
		if(err){ rtn = false; }
		res.json({rtn: rtn});	
	});

});


module.exports = router;
