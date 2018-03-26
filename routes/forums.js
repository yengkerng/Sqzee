var express = require('express');
var bodyParser = require('body-parser');
var async = require('async');
var mongoose = require('mongoose');
var Class = require('../config/models/class');
var Professor = require('../config/models/professor');
var Forum = require('../config/models/forum');
var User = require('../config/models/user');
var Comment = require('../config/models/comment');
var Event = require('../config/models/timeline_event');
//test
var router = express.Router();

router.get('/', function(req, res) {
   res.redirect("/class/");
});

router.get('/:className-:classNumber',
   function(req, res, next){
      if (req.isAuthenticated()){
         next();
      }else{
         Class.findOne({ department : req.params.className, courseNum : req.params.classNumber }, function(err, passedInClass) {
            if (err) throw err;

            var posts = [];
            var professors = [];

            if (passedInClass){
               async.each(passedInClass.forumPosts,
                  function(id, callback){
                     Forum.findById(id, function(error, post){
                        if (post){
                           posts.push(post);
                        }
                        callback(error);
                     });
                  },
                  function(error) {
                     async.each(passedInClass.nextQtrProfessors,
                        function(id, callback){
                           Professor.findById(id, function(error, professor){
                              if (professor){
                                 professors.push(professor);
                              }
                              callback(error);
                           });
                        },
                        function(error){
                           posts.sort(function(a, b){
                              return b.absTime - a.absTime;
                           });

                           res.render('pages/forum/classForum', { loggedIn : false, classObj : passedInClass, forumPosts : posts, profList : professors});
                        }
                     );
                  }
               );
            } else {
               res.redirect("/class/");
            }
         });
      }
   },function(req, res) {
      Class.findOne({ department : req.params.className, courseNum : req.params.classNumber }, function(err, passedInClass) {
         if (err) throw err;

         var posts = [];
         var professors = [];

         if (passedInClass){
            async.each(passedInClass.forumPosts,
               function(id, callback){
                  Forum.findById(id, function(error, post){
                     if (post){
                        posts.push(post);
                     }
                     callback(error);
                  });
               },
               function(error) {
                  async.each(passedInClass.nextQtrProfessors,
                     function(id, callback){
                        Professor.findById(id, function(error, professor){
                           if (professor){
                              professors.push(professor);
                           }
                           callback(error);
                        });
                     },
                     function(error){
                        posts.sort(function(a, b){
                           return b.absTime - a.absTime;
                        });

                        res.render('pages/forum/classForum', { loggedIn : true, classObj : passedInClass, forumPosts : posts, profList : professors});
                     }
                  );
               }
            );
         }else {
            res.redirect("/class/");
         }
      });
   }
);
/*
router.get('/:className-:classNumber/:postid',
   function(req, res, next){
      if (req.isAuthenticated()){
         next();
      }else{
         Class.findOne({ department : req.params.className, courseNum : req.params.classNumber }, function(err, passedInClass) {
            if (err) throw err;

            if (passedInClass){
               var id = new mongoose.Types.ObjectId(req.params.postid);
               var commentList = [];

               Forum.findById(id, function(error, post){
                  if (error) throw error;

                  async.forEach(post.comments,
                     function(id, callback){
                        Comment.findById(id, function(e, comment){
                           if (comment != null){
                              commentList.push(comment);
                           }
                           callback(e);
                        });
                     }, function(error){
                        commentList.sort(function(a, b){
                           return a.absTime - b.absTime;
                        });

                        res.render('pages/forum/entry/forumEntry', { loggedIn : false, classObj : passedInClass, postInfo : post, commentList : commentList});
                     }
                  );
               });
            }
         });
      }
   },function(req, res) {
      Class.findOne({ department : req.params.className, courseNum : req.params.classNumber }, function(err, passedInClass) {
         if (err) throw err;

         if (passedInClass){
            var id = new mongoose.Types.ObjectId(req.params.postid);
            var commentList = [];

            Forum.findById(id, function(error, post){
               if (error) throw error;

               User.findById(req.user._id, function(e, user){
                  var votedStatus = 0;

                  if (req.user.upvotedForumPosts.indexOf(id) != -1){
                     votedStatus = 1;
                  }
                  else if (req.user.downvotedForumPosts.indexOf(id) != -1){
                     votedStatus = -1;
                  }

                  async.forEach(post.comments,
                     function(id, callback){
                        Comment.findById(id, function(e, comment){
                           if (comment != null){
                              commentList.push(comment);
                           }
                           callback(e);
                        });
                     }, function(error){
                        commentList.sort(function(a, b){
                           return a.absTime - b.absTime;
                        });

                        res.render('pages/forum/entry/forumEntry', { loggedIn : true, user: req.user, classObj : passedInClass, postInfo : post, votedValue : votedStatus, commentList : commentList});
                     }
                  );
               });
            });
         }
      });
   }
);
*/
router.post('/:className-:classNumber/postForum', isLoggedIn, function(req, res) {
   var postedInfo = req.body;
   var timeAgo = new Date().toLocaleString('en-US').split(' ');

   timeAgo[0] = timeAgo[0].slice(0,-1);
   timeAgo[1] = timeAgo[1].slice(0,-3);
   timeAgo = timeAgo[0] + " " + timeAgo[1] + " " + timeAgo[2];

   var author = "";
   var origin = req.headers.origin + "/class/" + req.params.className + "-" + req.params.classNumber;
   if (postedInfo.anon === undefined) {
      author = req.user.name;              //placeholder for when we can pass in user names.
   }
   else {
      author = "Anonymous";
   }

   var newPost = Forum({
      title : postedInfo.postTitle,
      author : author,
      mainText : postedInfo.content,
      type : postedInfo.typeOfPost,
      upvotes : 0,
      downvotes : 0,
      timeAgo : timeAgo,
      absTime : Date.now(),
      class: req.params.className + " " + req.params.classNumber,
      facebookProfileUrl : ""
   });

   var userProfileUrl = "";

   newPost.save(function(err) {
      if (err) throw err;
     //console.log("New forum post added to database...");
   });

   Class.findOne({ department : req.params.className, courseNum : req.params.classNumber }, function(err, passedInClass) {
      if (err) throw err;

      passedInClass.forumPosts.push(newPost._id);

      User.findById(req.user._id, function(e, user){
         if (user != null){
            if (user.forumPosts == null){
               user.forumPosts = [];
            }

            user.forumPosts.push(newPost._id);

            if (postedInfo.anon === undefined) {
              userProfileUrl = user.picture;
            }
            else {
              userProfileUrl = "anon";

            }
            user.save(function(a){
               passedInClass.save(function(err){
                  if (err) throw err;
                  //console.log("Updated class...");
                  newPost.facebookProfileUrl = userProfileUrl;
                  newPost.save(function(err){
                     res.redirect("/class/" + req.params.className + "-" + req.params.classNumber + "/");
                  });
               });
            });
         }
      });
   });
   console.log(JSON.stringify(postedInfo, null, "    "));
   generate_post_class_forum_event(postedInfo, req.user, origin);
});


router.post('/:className-:classNumber/:postid/upvoted', isLoggedIn, function(req, res) {
   var id = req.params.postid;
   var origin = req.headers.origin + "/class/" + req.params.className + "-" + req.params.classNumber;
   Forum.findById( id, function(error, post){
      if (error) throw error;

      if (post != null){
         User.findById( req.user._id, function(e, user){
            if (user.upvotedForumPosts.indexOf(id) != -1){          //it was upvoted before. Needs to be set to un-voted.
               post.upvotes = post.upvotes - 1;

               var index = user.upvotedForumPosts.indexOf(id);      //Get the index.
               user.upvotedForumPosts.splice(index, 1);             //Remove it from the array.

            }
            else if (user.downvotedForumPosts.indexOf(id) != -1){   //it was downvoted before. Needs to be set to upvoted
               post.upvotes = post.upvotes + 1;
               post.downvotes = post.downvotes - 1;

               var index = user.downvotedForumPosts.indexOf(id);      //Get the index.
               user.downvotedForumPosts.splice(index, 1);             //Remove it from the array.
               user.upvotedForumPosts.push(id);
            }
            else {                                                      //it hasn't been voted on before.  Needs to be upvoted!
               post.upvotes = post.upvotes + 1;

               user.upvotedForumPosts.push(id);
            }

            user.save(function(err) {
               if (err) throw err;
              //console.log("Saving the user object...");
              post.save(function(err){
                 if (err) throw err;
                //console.log("Saving the forum now....");
                res.redirect("/forum/" + req.params.className + "-" + req.params.classNumber + "/" + req.params.postid);
              });
            });
         });
      }
   });
   generate_post_class_vote_event(req.body, req.user, origin);
});

router.post('/:className-:classNumber/:postid/downvoted', isLoggedIn, function(req, res) {
   var id = req.params.postid;
   var origin = req.headers.origin + "/class/" + req.params.className + "-" + req.params.classNumber;
   Forum.findById( id, function(error, post){
      if (error) throw error;

      if (post != null){
         User.findById( req.user._id, function(e, user){
            if (user.upvotedForumPosts.indexOf(id) != -1){
               post.upvotes = post.upvotes - 1;
               post.downvotes = post.downvotes + 1;

               var index = user.upvotedForumPosts.indexOf(id);
               user.upvotedForumPosts.splice(index, 1);
               user.downvotedForumPosts.push(id);
            }
            else if (user.downvotedForumPosts.indexOf(id) != -1){
               post.downvotes = post.downvotes - 1;

               var index = user.downvotedForumPosts.indexOf(id);      //Get the index.
               user.downvotedForumPosts.splice(index, 1);             //Remove it from the array.
            }
            else {
               post.downvotes = post.downvotes + 1;

               user.downvotedForumPosts.push(id);
            }

            user.save(function(err) {
               if (err) throw err;
              //console.log("Saving the user object...");
              post.save(function(err){
                 if (err) throw err;
                //console.log("Saving the forum now....");
                res.redirect("/forum/" + req.params.className + "-" + req.params.classNumber + "/" + req.params.postid);
              });
            });
         });
      }
   });
   generate_post_class_vote_event(req.body, req.user, origin);
});

router.post('/:className-:classNumber/:postid/reply', isLoggedIn, function(req, res) {
   var department = req.params.className;
   var courseNum = req.params.classNumber;
   var id = req.params.postid;

   var postedInfo = req.body;

   var timeAgo = new Date().toLocaleString('en-US').split(' ');

   timeAgo[0] = timeAgo[0].slice(0,-1);
   timeAgo[1] = timeAgo[1].slice(0,-3);
   timeAgo = timeAgo[0] + " " + timeAgo[1] + " " + timeAgo[2];
   var origin = req.headers.origin + "/class/" + req.params.className + "-" + req.params.classNumber;
   Forum.findById( id, function(error, post){
      if (error) throw error;
      if (post != null){

         var newComment = Comment({
            comment : postedInfo.comment,
            author : req.user.name,
            authorId : req.user._id,
            forum : post._id,
            timeAgo : timeAgo,
            absTime : Date.now()
         });

         newComment.save(function(err) {
            if (err) throw err;
         });

         post.comments.push(newComment._id);

         User.findById(req.user._id, function(e, user){
            if (user){
               if (user.comments == null){
                  user.comments = [];
               }

               user.comments.push(newComment._id);
            }

            user.save(function(a){
               post.save(function(err){
                  if (err) throw err;
                  //console.log("Saving the forum now....");
                  res.redirect("/class/" + req.params.className + "-" + req.params.classNumber + "/");
               });
            });
         });
      }
   });
   generate_post_class_reply_event(postedInfo, req.user, origin);
});

function generate_post_class_forum_event(posted_info, user, origin) {
   var event = Event({
      facebook_id : user.facebook_id,
      name : user.name,
      picture : user.picture,
      event_type : "class_forum_post",
      event_url : origin,
      created : Date.now()
   });
   event.save(function(error) {
      if (error) throw error;
   });
}

function generate_post_class_reply_event(posted_info, user, origin) {
   var event = Event({
      facebook_id : user.facebook_id,
      name : user.name,
      picture : user.picture,
      event_type : "class_forum_reply",
      event_url : origin,
      created : Date.now()
   });
   event.save(function(error) {
      if (error) throw error;
   });
}

function generate_post_class_vote_event(posted_info, user, origin) {
   var event = Event({
      facebook_id : user.facebook_id,
      name : user.name,
      picture : user.picture,
      event_type : "class_forum_vote",
      event_url : origin,
      created : Date.now()
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

module.exports = router;
