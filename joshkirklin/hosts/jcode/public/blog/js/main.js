function BlogController() {

	//Init -----------------------------------------------------------------
	
	var app = this;
	
	this.readingList = [];
	
	//Constructor ----------------------------------------------------------
	
	this.init = function(){
		
		if(Modernizr.localstorage){
			var readingList = window.localStorage.getItem("bPosts")
			if(readingList){ 
				app.readingList = readingList.split(",");	
			}
		}
		
		app.getPostContent($('#post-content').html(), $('span.post-active-id').html());
		app.getPostPreviews(0);
		app.bindHandlers();
	}
	
	//UI handlers -------------------------------------------------------
	
	this.bindHandlers = function(){
		
		//hijack browser navigation controls
		if(Modernizr.history){
			window.onpopstate = function(e){
				if(e.state){ $('#post-body').html(e.state.html); }
			};
		}
		
	}
	
	this.bindPreviewHandlers = function(){
		$(function(){
			$(".recent-post").click(function(e) {
				e.preventDefault();
				
				//update active post header
				$('span.post-active-id').html($(this).children('.preview-post-id').html());
				$('span.post-date').html($(this).children('.preview-date').html());
				$('h1.post-title').html($(this).children('.preview-title-full').html());
				$('span.post-tags').html($(this).parent().next('.preview-tags').html());
				
				//update active post body
				var reqPost = $(this).parent().attr("href").split("/").pop();
				app.getPostContent(reqPost, $('span.post-active-id').html());
			});
		});	
	}

	//GET requests -------------------------------------------------------
	
	this.getPostContent = function(reqPost, reqID){

		if(reqPost == "unread"){
			//get next unread post
			var lastPost = app.readingList[0];
			if(!lastPost){ lastPost = "0"; }
			$.ajax({
				url: '/services/blog/next-post/' + lastPost,
				traditional: false,
				success: function (data){ window.location = '/blog/' + data.url; }
			});
		}
		
		window.scrollTo(0, 0);
		$('#post-content').hide();
		$('#loader').fadeIn('slow', function(){
			$.ajax({
				url: '/services/blog/post-content/' + reqPost,
				traditional: true,
				success: function (data) {
					$('#post-content').html(data.contentBody);
					$('#loader').fadeOut('fast', function(){
						$('#post-content').fadeIn('slow', function(){
							
							//update the DOM
							var bodyHTML = $('#post-body').html();
							var urlPath = "/blog/" + reqPost;
							if(Modernizr.history){
								window.history.pushState({"html": bodyHTML}, "", urlPath);						
							}
							
							//update reading list in localstorage
							app.addReadingList(reqID);
							
						});
					});
				}
			});
		});
	}
	
	this.getPostPreviews = function(reqPage){
		$.ajax({
			url: '/services/blog/preview-posts/' + reqPage,
			traditional: true,
			success: function (data) {
				if(data.length){
					//clear the old
					$('#recent-posts').html('');
					
					//add the new
					for(var i in data){
						app.addPreviewBlock(data[i]);
					}
					
					//update handlers
					app.bindPreviewHandlers();
				}
			}
		});		
	}
	
	//DOM Handling ----------------------------------------------------------------------
	
	this.addPreviewBlock = function(pData){
		var newPostBlock = '<a href="/blog/'+ pData.content +'"><div class="recent-post shadowed">';
			newPostBlock += 	'<div class="preview-post-id">'+ pData._id +'</div>';
			newPostBlock += 	'<div class="preview-date">'+ pData.date +'</div>';
			newPostBlock += 	'<div class="preview-title">'+ pData.previewTitle +'</div>';
			newPostBlock += 	'<div class="preview-title-full">'+ pData.title +'</div>';
			newPostBlock += 	'<div class="preview-content">'+ pData.preview +'</div>';
			newPostBlock += '</div></a>';
			
			newPostBlock += '<div class="preview-tags">';
				var isFirst = true;
				for(var t=0;t<pData.tags.length;t++){
					var tag = pData.tags[t];
					if(!isFirst){ newPostBlock += ', </a>'; }
					newPostBlock += '<a href="/blog/search/'+ tag +'">'+ tag;
					isFirst = false;
				}
			newPostBlock += '</a></div>';
		
		$('#recent-posts').append(newPostBlock);
		
	}
	
	//LocalStorage Handling -------------------------------------------------------------
	
	this.addReadingList = function(item){
		if(Modernizr.localstorage){
			if(!app.inReadingList(item)){
				app.readingList.push(item);
			}
			app.readingList.sort().reverse();
			window.localStorage.setItem("bPosts", app.readingList.join());
			//window.localStorage.removeItem("bPosts");
			//alert("read list now: " + app.readingList);
		}		
	}
	
	this.inReadingList = function(item){
		if(app.readingList.indexOf(item) !== -1){ return true; }
		return false;
	}
	
	//Execute Construction --------------------------------------------------------------
	
	this.init();
	
}

//Teach IE to not be stupid -------------------------------------------------------------

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

//Page Load -----------------------------------------------------------------------------

$(function(){
	var app = new BlogController();
});


