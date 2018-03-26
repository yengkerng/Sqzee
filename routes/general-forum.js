var express = require('express');
var bodyParser = require('body-parser');
var async = require('async');
var mongoose = require('mongoose');
var router = express.Router();

var GeneralForum = require('../config/models/generalForum');
var GeneralForumComment = require('../config/models/generalForumComment');
var GeneralForumCommentComment = require('../config/models/generalForumCommentComment');
var User = require('../config/models/user');
var Event = require('../config/models/timeline_event');

router.get('/',
   function(req, res, next){
      if (req.isAuthenticated()){
         next();
      } else {
         updateDisValue(function() {
            GeneralForum.find({ }, function(error, posts){
               if (error) throw error;
               sortPosts(posts, function(sortedPosts) {
                  res.render("pages/generalForum/generalForumPage", { loggedIn : false, generalPosts : sortedPosts });
               });
            });
         });
      }
   },
   function(req, res) {
      updateDisValue(function() {
         GeneralForum.find({ }, function(error, posts){
            if (error) throw error;
            sortPosts(posts, function(sortedPosts) {
               res.render("pages/generalForum/generalForumPage", { loggedIn : true, generalPosts : sortedPosts, user : req.user });
            });
         });
      });
   }
);

router.get('/JSONPosts', function(req, res) {
  updateDisValue(function() {
    GeneralForum.find({ }, function(error, posts){
      if (error) throw error;
      sortPosts(posts, function(sortedPosts) {
        res.json({ generalPosts : sortedPosts });
      });
    });
  });
});

router.post('/post', isLoggedIn, function(req, res) {
   var postedInfo = req.body;
   //var fullUrl = req.protocol + '://' + req.get('host') + "/general-forum";
   //console.log(fullUrl);
   var ip = req.headers['x-forwarded-for'];
   if (ip == undefined) {
      ip = "LOCALHOST";
   }

   var author = "";
   var userProfileUrl = "";

   if (postedInfo.anon === undefined) {
      author = req.user.name;              //placeholder for when we can pass in user names.
   }
   else {
      author = "Anonymous";
   }

   var category = [];
   if (postedInfo.category != undefined){
      category.push(postedInfo.category);
   }

   User.findById(req.user._id, function(error, user){
      if (error) throw error;

      if (user) {

         if (user.generalPosts == undefined) {
            user.generalPosts = [];
         }

         if (postedInfo.anon === undefined) {
           userProfileUrl = user.picture;
         }
         else {
           userProfileUrl = "anon";
         }

         var newGeneralPost = GeneralForum({
            name : author,
            userId : req.user._id,
            userIP : ip,
            absTime : Date.now(),
            categories : [ postedInfo.category ],
            event_time: postedInfo.event_time,
            event_location: postedInfo.event_location,
            event_date: postedInfo.event_date,
            club_name: postedInfo.club_name,
            event_title: postedInfo.event_title,
            content : postedInfo.content,
            upvotes : 0,
            downvotes : 0,
            disValue : 1,
            comments : [],
            facebookPicture: userProfileUrl,
            facebookProfileURL: req.user.picture
         });

         newGeneralPost.save(function(err) {
            if (err) throw err;

            user.generalPosts.push(newGeneralPost._id);

            newGeneralPost.facebookPicture = userProfileUrl;

            user.save(function(error){
               if (error) throw error;
               console.log(newGeneralPost.userIP + " posted a new general forum post.");
               res.redirect("/general-forum/");

            });

         });
      }
   });
   generate_post_general_event(postedInfo, req.user, req.headers.origin + "/" + "general-forum");
});

router.get('/:generalId/info', function(req, res){

   GeneralForum.findById(req.params.generalId, function(err, post){
      if (err) throw err;

      if (post) {
         res.json(post);
      }
   });
});

router.get('/:generalId', function(req, res){

   GeneralForum.findById(req.params.generalId, function(err, post){
      if (err) throw err;

      if (post) {
         var comments = [];
         async.forEach(post.comments,
            function(id, callback){
               GeneralForumComment.findById(id, function(e, comment){
                  if (e) throw e;

                  if (comment) {
                     comments.push(comment);
                  }
                  callback(e);
               });
            },
            function(error){
               if (error) throw error;
               res.json(comments);
            });
      }
   });
});

router.get('/:commentID/subcomments', function(req, res){

   GeneralForumComment.findById(req.params.commentID, function(err, comment){
      if (err) throw err;

      if (comment) {
         var subcomments = [];
         async.forEach(comment.comments,
            function(id, callback){
               GeneralForumCommentComment.findById(id, function(e, subcomment){
                  if (e) throw e;

                  if (subcomment) {
                     subcomments.push(subcomment);
                  }
                  callback(e);
               });
            },
            function(error){
               if (error) throw error;
               res.json(subcomments);
            });
      }
   });
});

router.post('/:generalId/post', isLoggedIn, function(req, res) {
   var postedInfo = req.body;
   var generalId = new mongoose.Types.ObjectId(req.params.generalId);

   var ip = req.headers['x-forwarded-for'];
   if (ip == undefined) {
      ip = "LOCALHOST";
   }

   var author = "";
   var userProfileUrl = "";


   if (postedInfo.anon === undefined) {
      author = req.user.name;              //placeholder for when we can pass in user names.
   }
   else {
      author = "Anonymous";
   }

   GeneralForum.findById(generalId, function(error, post){
      if (error) throw error;

      if (post) {

         User.findById(req.user._id, function(err, user){
            if (err) throw err;

            if (user){

               if (user.generalComment == undefined){
                  user.generalComment = [];
               }

               if (postedInfo.anon === undefined) {
                 userProfileUrl = user.picture;
               }
               else {
                 userProfileUrl = "anon";
               }

               var newGeneralPostComment = GeneralForumComment({
                  name : author,
                  userId : req.user._id,
                  userIP : ip,
                  absTime : Date.now(),
                  categories : [],
                  content : postedInfo.content,
                  upvotes : 0,
                  downvotes : 0,
                  disValue : 1,
                  facebookPicture: userProfileUrl,
                  responseTo : generalId,
                  comments : [],
                  facebookProfileURL: req.user.picture
               });

               newGeneralPostComment.save(function(err) {
                  if (err) throw err;

                  user.generalComment.push(newGeneralPostComment._id);
                  post.comments.push(new mongoose.Types.ObjectId(newGeneralPostComment._id));

                  user.save(function(r){
                     if (r) throw r;
                     post.save(function(e){
                        if (e) throw e;
                        console.log(newGeneralPostComment.userIP + " posted a new comment to a general forum post.");
                        res.redirect("/general-forum/");
                     });
                  });
               });
            }
         });
      }
   });
   generate_post_general_event(postedInfo, req.user, req.headers.origin + "/" + "general-forum");
});

router.post('/:commentId/postsubcomment', isLoggedIn, function(req, res) {
   var postedInfo = req.body;
   console.log(postedInfo);
   var commentId = new mongoose.Types.ObjectId(req.params.commentId);

   var ip = req.headers['x-forwarded-for'];
   if (ip == undefined) {
      ip = "LOCALHOST";
   }

   var author = "";

   if (postedInfo.anon === undefined) {
      author = req.user.name;              //placeholder for when we can pass in user names.
   }
   else {
      author = "Anonymous";
   }

   GeneralForumComment.findById(commentId, function(error, comment){
      if (error) throw error;

      if (comment) {

         User.findById(req.user._id, function(err, user){
            if (err) throw err;

            if (user) {

               if (user.generalCommentComment == undefined){
                  user.generalCommentComment = [];
               }

               var newGeneralPostCommentComment = GeneralForumCommentComment({
                  name : author,
                  userId : req.user._id,
                  userIP : ip,
                  absTime : Date.now(),
                  categories : [],
                  content : postedInfo.content,
                  upvotes : 0,
                  downvotes : 0,
                  disValue : 1,

                  responseTo : commentId,
               });

               newGeneralPostCommentComment.save(function(err) {
                  if (err) throw err;

                  user.generalCommentComment.push(newGeneralPostCommentComment._id);
                  comment.comments.push(new mongoose.Types.ObjectId(newGeneralPostCommentComment._id));

                  user.save(function(r){
                     if (r) throw r;

                     comment.save(function(e){
                        if (e) throw e;

                        console.log(newGeneralPostCommentComment.userIP + " posted a new comment to a general forum comment.");
                        res.redirect("/general-forum/");
                     });

                  });

               });
            }
         });
      }
   });
   generate_post_general_event(posted_info, user, req.headers.origin + "/" + "general-forum");
});

router.get('/saved_posts', isLoggedIn, function(req, res) {
	var posts = []
	User.findById(req.user._id, function(err, user) {
		if (err) {
			console.log(err);
			throw err;
		}
		async.each(user.savedPosts, function(id, callback) {
			GeneralForum.findById(id, function(err, post) {
				if (post) {
					posts.push(post);
				}
				callback(err);
			});
		}, function(err) {
			if (err) {
				console.log(err);
				throw err;
			}
			res.json({length : posts.length, posts : posts});
		});
	});
});

router.post('/delete_post/:generalForumID', isLoggedIn, function(req, res) {
	User.findById(req.user._id, function(err, user) {
		if (err) {
			console.log(err);
			throw err;
		}
		if (user) {
			GeneralForum.findById(req.params.generalForumID, function(err, forum_post) {
				if (forum_post.userId + "" == req.user._id + "") {
					GeneralForum.findOneAndRemove({_id : req.params.generalForumID}, function(err) {
						if (err) {
							console.log(err);
							throw err;
						}
							console.log(req.params.generalForumID + " was deleted successfully");
              res.redirect("/general-forum/");

					});
				}
			});
		}
	});
});

router.post('/save_post/:generalForumID', isLoggedIn, function(req, res) {
	User.findById(req.user._id, function(err, user) {
		if (err) {
			console.log(err);
			throw err;
		}
		if (user) {
			var id = new mongoose.Types.ObjectId(req.params.generalForumID);
			if (!user.savedPosts) {
				user.savedPosts = [];
			}
			if (user.savedPosts.indexOf(id) == -1) {
				user.savedPosts.push(id);
			}
			user.save(function(err) {
				if (err) {
					console.log(err);
					throw err;
				}
				console.log(req.user.id + " has a new saved post: " + id);
				res.redirect("/general-forum/");
			});
		}
	});
});

router.post('/remove_saved_post/:generalForumID', isLoggedIn, function(req, res){
	User.findById(req.user._id, function(err, user) {
		if (err) {
			console.log(err);
			throw err;
		}
		if (user) {
			var id = new mongoose.Types.ObjectId(req.params.generalForumID);
			if (!user.savedPosts) {
				user.savedPosts = [];
			}
			if (user.savedPosts.indexOf(id) != -1) {
				user.savedPosts.splice(user.savedPosts.indexOf(id), 1);
			}
			user.save(function(err) {
				if (err) {
					console.log(err);
					throw err;
				}
				console.log(req.user.id + " no longer has saved post: " + id);
				res.redirect("/general-forum/");
			});
		}
	});
});

router.post('/upvotePost/:generalPostId', isLoggedIn, function(req, res){

   GeneralForum.findById(req.params.generalPostId, function(error, post){
      if (error) throw error;

      if (post){
         User.findById(req.user._id, function(err, user){
            if (err) throw err;

            if (user){

               if (!user.upvotedGPosts){
                  user.upvotedGPosts = [];
               }
               console.log("Before pushing");
               user.upvotedGPosts.push(post._id);
               post.upvotes = post.upvotes + 1;
               console.log("After pushing");

               if (user.downvotedGPosts.indexOf(post._id) != -1) {
                  console.log("Get rid of downvote");
                  user.downvotedGPosts.splice(user.downvotedGPosts.indexOf(post._id), 1);
                  post.downvotes = post.downvotes - 1;
               }

               /*if (user.upvotedGPosts.indexOf(post._id) == -1) {
                  user.upvotedGPosts.push(post._id);
                  post.upvotes = post.upvotes + 1;
               }
               if (user.upvotedGPosts.indexOf(post._id) != -1) {
                  user.upvotedGPosts.splice(user.upvotedGPosts.indexOf(post._id), 1);
                  post.upvotes = post.upvotes - 1;
               }
               */

               user.save(function(e){
                  if (e) throw e;

                  post.save(function(er) {
                     if (er) throw er;
                     res.redirect("/general-forum/");
                  });
               });

            }
         });
      }
   });

   //res.redirect("/general-forum/");
   //generate_post_general_vote_event(req.user, req.headers.origin + "/" + "general-forum");
});

router.post('/downvotePost/:generalPostId', isLoggedIn, function(req, res){

   GeneralForum.findById(req.params.generalPostId, function(error, post){
      if (error) throw error;

      if (post){
         User.findById(req.user._id, function(err, user){
            if (err) throw err;

            if (user){

               if (!user.downvotedGPosts){
                  user.downvotedGPosts = [];
               }
               /*else if (user.downvotedGPosts.indexOf(post._id) != -1) {
                  user.downvotedGPosts.splice(user.downvotedGPosts.indexOf(post._id), 1);
                  post.downvotes = post.downvotes - 1;
               }*/
               console.log("Before pushing");
               user.downvotedGPosts.push(post._id);
               post.downvotes = post.downvotes + 1;
               console.log("After pushing");
               if (user.upvotedGPosts.indexOf(post._id) != -1) {
                  console.log("Get rid of upvote");
                  user.upvotedGPosts.splice(user.upvotedGPosts.indexOf(post._id), 1);
                  post.upvotes = post.upvotes - 1;
                  console.log("Subtracting upvote from post");
               }

               /*
               if (user.downvotedGPosts.indexOf(post._id) == -1) {
                  user.downvotedGPosts.push(post._id);
                  post.downvotes = post.downvotes + 1;
               }
               else {
                  user.downvotedGPosts.splice(user.downvotedGPosts.indexOf(post._id), 1);
                  post.downvotes = post.downvotes - 1;
               }
               */

               user.save(function(e){
                  if (e) throw e;

                  post.save(function(er) {
                     if (er) throw er;
                     res.redirect("/general-forum/");
                  });
               });

            }
         });
      }
   });

   //res.redirect("/general-forum/");
   //generate_post_general_vote_event(req.user, req.headers.origin + "/" + "general-forum");
});


router.post('/upvoteComment/:generalCommentId', isLoggedIn, function(req, res){

   GeneralForumComment.findById(req.params.generalCommentId, function(error, comment){
      if (error) throw error;

      if (comment){
         User.findById(req.user._id, function(err, user){
            if (err) throw err;

            if (user){

               if (!user.upvotedGComments){
                  user.upvotedGComments = [];
               }

               if (user.upvotedGComments.indexOf(comment._id) == -1) {
                  user.upvotedGComments.push(comment._id);
                  comment.upvotes = comment.upvotes + 1;
               }
               else {
                  user.upvotedGComments.splice(user.upvotedGComments.indexOf(comment._id), 1);
                  comment.upvotes = comment.upvotes - 1;
               }

               user.save(function(e){
                  if (e) throw e;

                  comment.save(function(er) {
                     if (er) throw er;
                     res.redirect("/general-forum/");
                  });
               });

            }
         });
      }
   });
   //generate_post_general_vote_event(req.user, req.headers.origin + "/" + "general-forum");
   res.redirect("/general-forum/");

});

router.post('/downvoteComment/:generalCommentId', isLoggedIn, function(req, res){

   GeneralForumComment.findById(req.params.generalCommentId, function(error, comment){
      if (error) throw error;

      if (comment){
         User.findById(req.user._id, function(err, user){
            if (err) throw err;

            if (user){

               if (!user.downvotedGComments){
                  user.downvotedGComments = [];
               }

               if (user.downvotedGComments.indexOf(comment._id) == -1) {
                  user.downvotedGComments.push(comment._id);
                  comment.downvotes = comment.downvotes + 1;
               }
               else {
                  user.downvotedGComments.splice(user.downvotedGComments.indexOf(comment._id), 1);
                  comment.downvotes = comment.downvotes - 1;
               }

               user.save(function(e){
                  if (e) throw e;

                  comment.save(function(er) {
                     if (er) throw er;
                     res.redirect("/general-forum/");
                  });
               });

            }
         });
      }
   });
   //generate_post_general_vote_event(req.user, req.headers.origin + "/" + "general-forum");
   res.redirect("/general-forum/");

});


router.post('/upvoteCommentComment/:generalCommentCommentId', isLoggedIn, function(req, res){

   GeneralForumCommentComment.findById(req.params.generalPostId, function(error, commentComment){
      if (error) throw error;

      if (post){
         User.findById(req.user._id, function(err, user){
            if (err) throw err;

            if (user){

               if (!user.upvotedGComComments){
                  user.upvotedGComComments = [];
               }

               if (user.upvotedGComComments.indexOf(commentComment._id) == -1) {
                  user.upvotedGComComments.push(commentComment._id);
                  commentComment.upvotes = commentComment.upvotes + 1;
               }
               else {
                  user.upvotedGComComments.splice(user.upvotedGComComments.indexOf(commentComment._id), 1);
                  commentComment.upvotes = commentComment.upvotes - 1;
               }

               user.save(function(e){
                  if (e) throw e;

                  commentComment.save(function(er) {
                     if (er) throw er;
                     res.redirect("/general-forum/");
                  });
               });

            }
         });
      }
   });
   //generate_post_general_vote_event(req.user, req.headers.origin + "/" + "general-forum");
   res.redirect("/general-forum/");

});

router.post('/downvoteCommentComment/:generalCommentCommentId', isLoggedIn, function(req, res){

   GeneralForum.findById(req.params.generalCommentCommentId, function(error, commentComment){
      if (error) throw error;

      if (commentComment){
         User.findById(req.user._id, function(err, user){
            if (err) throw err;

            if (user){

               if (!user.downvotedGComComments){
                  user.downvotedGComComments = [];
               }

               if (user.downvotedGComComments.indexOf(commentComment._id) == -1) {
                  user.downvotedGComComments.push(commentComment._id);
                  commentComment.downvotes = commentComment.downvotes + 1;
               }
               else {
                  user.downvotedGComComments.splice(user.downvotedGComComments.indexOf(commentComment._id), 1);
                  commentComment.downvotes = commentComment.downvotes - 1;
               }

               user.save(function(e){
                  if (e) throw e;

                  commentComment.save(function(er) {
                     if (er) throw er;
                     res.redirect("/general-forum/");
                  });
               });

            }
         });
      }
   });
   //generate_post_general_vote_event(req.user, req.headers.origin + "/" + "general-forum");
   res.redirect("/general-forum/");
});

function generate_post_general_event(posted_info, user, origin) {
   var event = Event({
      facebook_id : user.facebook_id,
      name : user.name,
      picture : user.picture,
      event_type : "general_forum_post",
      event_url : origin,
      date : Date.now()
   });
   event.save(function(error) {
      if (error) throw error;
   });
}

function generate_post_general_vote_event(user, origin) {
   var event = Event({
      facebook_id : user.facebook_id,
      name : user.name,
      picture : user.picture,
      event_type : "general_forum_vote",
      event_url : origin,
      date : Date.now()
   });
   event.save(function(error) {
      if (error) throw error;
   });
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.returnTo = req.path;
  res.redirect('/auth/facebook');
}

function updateDisValue(callback) {
  const oneWeekInMs = 604800000;
  const timeTillZero = oneWeekInMs  * 2;

  GeneralForum.find({ }, function(error, posts){
    if (error) throw error;
    async.each(posts, function (post, callback) {
      var datePassed = Date.now() - post.absTime;
      var mult = 1 - (datePassed/timeTillZero);
      post.disValue = mult * (post.upvotes - post.downvotes);
      if (post.disValue < 0) {
        post.disValue = 0;
      }
      GeneralForum.update({_id: post.id}, post, function(){});
      //console.log("Upvotes: " + post.upvotes + " Downvotes: " + post.downvotes);
      //console.log("disVal is  " + post.disValue);
      callback();
    },
    function(e){
      callback();
    });
  });
}

function sortPosts(posts, callback) {
  posts.sort(function(a, b) {
    if (b.disValue != a.disValue) {
      return (b.disValue - a.disValue);
    } else {
      return (b.absTime - a.absTime);
    }
  });
  callback(posts);
}

module.exports = router;
