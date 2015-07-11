var express = require('express');
var router = express.Router();

var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/blog", {native_parser:true});

//blog GET --------------------------------------

router.get('/blog/get/post-content/*', function(req, res){
	//console.log("(api) " + req.url);
	var fs = require('fs');
	
	var reqPost = req.url.split("/").pop();
	var rootPath = __dirname.split("\\");
	var n = rootPath.pop();
	var reqFile = rootPath.join("\\") + '\\public\\blog\\posts\\' + reqPost + '.html';
	var resData = {	content: "Oops! The requested post is currently unavailable." };
	
	fs.readFile(reqFile, function (err, fileContent) {
		if (!err) { 
			
			resData = {'content': fileContent.toString() }; 

			db.collection('posts').find({content: reqPost}).toArray(function(err, postData){
				if(postData[0]){
					resData.post_id	= postData[0]._id;
					resData.title = postData[0].title;
					resData.date = postData[0].date;
					resData.tags = postData[0].tags;
					res.json(resData);
				}
				else{
					res.json({	content: "Oops! The requested post is currently unavailable." });
				}
			});				
		
		}
		else{
			res.json(resData);
		}
	});		
});


/*
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
*/


router.get('/blog/get/post-previews/*', function(req, res){
	//console.log("(api) " + req.url);
	var pageSize = 4;
	var reqPage = req.url.split("/").pop();
	var toPage = reqPage * pageSize;
	db.collection('posts').find().sort({date: -1}).limit(pageSize).skip(toPage).toArray(function (err, posts){
		res.json(posts);
	});
});



router.get('/blog/get/post-comments/*', function(req, res){
	//console.log("(api) " + req.url);
	var reqPost = req.url.split("/").pop();
	db.collection('comments').find({post_id: reqPost}).sort({_id: 1}).toArray(function(err, comments){
		
		//TODO: drop avatar field from comments, query by username. We could build it by username, but we will also want to query other user info like contact, post count?, rating?

		//set comment avatar
		for(var i = 0; i < comments.length; i++){
			if(comments[i].user.substr(0, 5) == "Guest"){
				comments[i].avatar = "avatar_guest.jpg"
			}
			else{
				//TEMP: just build it
				comments[i].avatar = "avatar_"+ comments[i].user +".jpg"
			}
		}
		
		res.json(comments);
	});
});



//blog POST --------------------------------------

router.post('/blog/post/add-comment', function(req, res){
	//console.log("(api) " + req.url);
	//console.log(req.body);
	
	var tDate = new Date();
	var y = tDate.getFullYear();
	var m = tDate.getMonth() + 1;
	var d = tDate.getDate();
	if(m < 10){ m = "0"+ m; }
	if(d < 10){ d = "0"+ d; }
	var useDate = y +"-"+ m + "-" + d
	
	db.collection('comments').insert({
		post_id: req.body.post_id,
		date: useDate,
		user: req.body.user,
		content: req.body.content
	}, function(err, result){	
		var rtn = useDate;
		if(err){ rtn = false; }
		res.json({rtn: rtn});	
	});

});

module.exports = router;
