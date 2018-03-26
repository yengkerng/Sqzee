var express    = require("express");
var bodyParser = require("body-parser");
var async      = require("async");
var mongoose   = require("mongoose");
var _          = require("lodash");
var mongodb    = require("mongodb");
var Promise    = require("es6-promise").Promise;
var Class      = require("../config/models/class");
var User       = require("../config/models/user");
var Professor  = require("../config/models/professor");
var Review     = require("../config/models/review");
var Forum      = require("../config/models/forum");
var Comment    = require("../config/models/comment");
var Event      = require("../config/models/timeline_event");
var router     = express.Router();

router.get("/", class_list_logged_out, class_list_logged_in);
router.get("/getJSONClassList", json_class_list);
router.get("/:classDepartment-:classNumber", class_page_logged_out, class_page_logged_in);
router.get("/:classDepartment-:classNumber/getReviews", class_reviews);
router.get("/:classDepartment-:classNumber/getFriendsInClass", friends_list_logged_out, friends_list_logged_in);
router.get("/:classDepartment-:classNumber/:professor_id/getDepartmentAndRating", getDepartmentAndRating);
router.get("/:classDepartment-:classNumber/:forum_id/getComments", get_comments);
router.get("/classInfo/:classDepartment-:classNumber", class_info);
router.get("/getFlowcharts", get_flowcharts);
router.post("/saveFlowcharts", save_flowcharts);
router.post("/updateUsersEnrolledClasses", post_update_enrolled_classes);
router.post("/:classDepartment-:classNumber/postReview", post_review_logged_out, post_review_logged_in);


// Class List Page:
function class_list_logged_out(req, res, next) {
   if (req.isAuthenticated()) {
      next();
      return;
   }

   res.render("pages/classes/classList", { loggedIn : false });
}

function class_list_logged_in(req, res) {
   var enrolled_classes = [];

   async.each(req.user.enrolledClasses,
      function(id, callback){
         Class.findById(id, function(error, class_obj){
            if (error) throw error;
            if (class_obj) enrolled_classes.push(class_obj);
            callback(error);
         }).lean();
      },
      function(error) {
         res.render("pages/classes/classList", { loggedIn : true, user : req.user, enrolledList : enrolled_classes });
      }
   );
}

function json_class_list(req, res) {
   Class.find({ }, function(error, classes){
      if (classes) {
         res.json({"classes" : classes});
         return;
      }

      res.json({"classes" : []});
   }).lean();
}

function class_page_logged_out(req, res, next){
   if (req.isAuthenticated()) {
      next();
      return;
   }

   Class.findOne({ department : req.params.classDepartment, courseNum : req.params.classNumber}, function(error, class_obj){
      if (error) throw error;
      if (!class_obj) {
         res.redirect("/class/");
         return;
      }
      var professors = [];
      var forums = [];

      async.each(class_obj.currQrtProfessors,
         function(id, callback){
            Professor.findById(id, function(error, professor){
               if (professor && professor.name.indexOf("STAFF") == -1) {
                  professors.push(professor);
               }

               callback(error);
            }).lean();
         },
         function(error){
            if (error) throw error;

            async.each(class_obj.forumPosts,
               function(id, callback){
                  Forum.findById(id, function(error, forum_post){
                     if (forum_post) {
                        forums.push(forum_post);
                     }

                     callback(error);
                  }).lean();
               },
               function(error){
                  if (error) throw error;
                  res.render('pages/classes/classPage', { loggedIn : false, classObj : class_obj, profList : professors, forumPosts : forums} );
               }
            );
         }
      );
   }).lean();
}

function class_page_logged_in(req, res){
   Class.findOne({ department : req.params.classDepartment, courseNum : req.params.classNumber}, function(error, class_obj){
      if (error) throw error;
      if (!class_obj){
         res.redirect("/class/");
         return;
      }
      var professors = [];
      var forums = [];

      async.each(class_obj.currQrtProfessors,
         function(id, callback){
            Professor.findById(id, function(error, professor){
               if (professor && professor.name.indexOf("STAFF") == -1) {
                  professors.push(professor);
               }

               callback(error);
            }).lean();
         },
         function(error){
            if (error) throw error;

            async.each(class_obj.forumPosts,
               function(id, callback){
                  Forum.findById(id, function(error, forum_post){
                     if (forum_post) {
                        forums.push(forum_post);
                     }

                     callback(error);
                  }).lean();
               },
               function(error){
                  if (error) throw error;

                  get_users_in_class(class_obj._id + "").then(
                     function(enrolled_users) {
                        var friends_in_class = _.intersectionWith(enrolled_users, req.user.friends, is_equal_check);
                        var user_enrolled = (req.user.enrolledClasses.indexOf(class_obj._id + "") != -1);

                        res.render('pages/classes/classPage', { loggedIn : true, classObj : class_obj, profList : professors, forumPosts : forums, facebookFriends : friends_in_class, userIsEnrolled : user_enrolled, user: req.user});
                     }
                  ).catch(function(error){
                     if (error) throw error;
                  });
               }
            );
         }
      );
   }).lean();
}

function is_equal_check(friend_a, friend_b) {
   return friend_a.facebook_id == friend_b;
}

function class_reviews(req, res) {
   Review.find({ class : req.params.classDepartment + " " + req.params.classNumber}, function(error, reviews){
      if (error) throw error;
      if (reviews) {
         res.json({"reviews" : reviews});
         return;
      }

      res.json({"reviews" : []});

   }).lean();
}

// This is a MESS that can be fixed if the class object stored users.
function get_users_in_class(class_id_in) {
   return new Promise(function(resolve, reject) {
      User.find({}, function(error, users) {
         if (error) throw error;

         usersInClass = [];

         _(users).forEach(function (user) {

            _(user.enrolledClasses).forEach(function(classId) {

               if (class_id_in == classId) {
                  usersInClass.push(user);
                  return false;
               }

            });

         });

         resolve(usersInClass);
      });
   });
}

function friends_list_logged_out(req, res, next) {
   if (req.isAuthenticated()){
      next();
      return;
   }

   res.json({});
}

function friends_list_logged_in(req, res) {
   Class.findOne({department : req.params.classDepartment, courseNum : req.params.classNumber}, function(error, class_obj){
      if (error) throw error;
      if (!class_obj) {
         res.json({});
         return;
      }

      get_users_in_class(class_obj._id + "").then(
         function(enrolled_users) {
            var friends_in_class = _.intersectionWith(enrolled_users, req.user.friends, is_equal_check);

            res.json({ facebookFriends : friends_in_class });
         }
      ).catch(function(error){
         if (error) throw error;
      });

   }).lean();
}

function getDepartmentAndRating(req, res){
   Professor.findById(req.params.professor_id, function(error, professor){
      var rating = 0
      try {
      if (professor.actualRating == 0) {
        var rating = professor.polyRating;
      }
      else {
        var rating = professor.actualRating
      }

      if (professor) {
         res.json({"department" : professor.department, "rating" : rating});
         return;
      }
      res.json({"department" : "No Department Information", "rating" : "None"});

      }
      catch(e) {

      res.json({"department" : "No Department Information", "rating" : "None"});
      }

   }).lean();
}

function get_flowcharts(req, res) {
   User.findById(req.user._id, function(error, user){
      if (error) throw error;
      if (user == NULL){
         res.json(NULL);
         return;
      }

      res.json(user.flowchart);
   });
}

function save_flowcharts(req, res) {
   var flowchart = req.body.flowcharts;

   User.findById(req.user._id, function(error, user){
      if (error) throw error;

      if (user == NULL){
         return;
      }

      user.flowchart = flowchart;

      user.save(function(error){
         if (error) throw error;
      });

   });
}


function post_update_enrolled_classes(req, res) {
   var passed_in_classes = JSON.parse(req.body.classList);
   var user_id = req.user._id;

   User.findById(user_id, function(error, user){
      if (user) {
         user.enrolledClasses = [];

         async.each(passed_in_classes,
            function(id, callback){
               Class.findById(id, function(error, class_obj){
                  if (class_obj) {
                     user.enrolledClasses.push(class_obj);
                  }
                  callback(error);
               }).lean();
            },
            function(error){
               user.save(function(error){
                  if (error) throw error;
                  res.redirect("/class/");
               })
            }
         );
      } else {
         res.redirect("/class/");
      }

   });
}

function get_comments(req, res){
   Forum.findById(req.params.forum_id, function(error, forum){
      if (error) throw error;
      if (!forum) {
         res.json({"comments" : []});
         return;
      }

      var comments = [];

      async.each(forum.comments,
         function(id, callback){
            Comment.findById(id, function(error, comment){
               if (error) throw error;
               if (comment) comments.push(comment);

               callback(error);
            }).lean();
         },
         function(error){
            res.json({"comments" : comments});
         }
      );

   }).lean();
}

function class_info(req, res) {
   Class.findOne({courseNum: req.params.classNumber, department : req.params.classDepartment}, function(error, class_) {
      if (error) {
         throw error;
      }
      if (!class_) {
         res.json({});
      } else {
         res.json({"class_info" : class_});
      }
   });
}

function post_review_logged_out(req, res, next){
   if (req.isAuthenticated()) {
      next();
      return;
   }

   //This forces the user to log in if they are trying to post a review.
   req.session.returnTo = req.path;
   res.redirect("/auth/facebook");

}

function post_review_logged_in(req, res) {
   var posted_info = req.body;
   var class_info = [req.params.classDepartment, req.params.classNumber];
   var time_ago = generate_time_ago();
   var author = "";
   var anonymous = false;
   //var origin = req.protocol + '://' + req.get('host') + req.originalUrl;
   var origin = req.headers.origin + "/class/" + class_info[0] + "-" + class_info[1];
   if (posted_info.anon == undefined){
      author = req.user.name;
   } else {
      author = req.user.name;
      anonymous = true;
   }
   generate_new_review(res, posted_info, class_info, author, anonymous, time_ago);
   //generate_post_review_event(posted_info, req.user, req.headers.origin);
   generate_post_review_event(posted_info, req.user, origin, anonymous);

}

function generate_time_ago(){
   var date = new Date().toLocaleString("en-US").split(" ");
   var time_ago = date[0].slice(0, -1) + " " + date[1].slice(0, -3) + " " + date[2];

   return time_ago;
}

function generate_new_review(res, posted_info, class_info, author, anonymous, time_ago) {
   Professor.findOne({ name : posted_info.reviewProfessor }, function(error, professor){
      var prof_id;
      if (!professor) {
         prof_id = null;
      } else {
         prof_id = professor._id;
      }

      new_review = Review({
         user : author,
         rating : posted_info.rating,
         review : posted_info.review,
         professor_name : posted_info.reviewProfessor,
         professor : [prof_id],
         class : class_info[0] + " " + class_info[1],
         grade : posted_info.grade,
         hrsPerWeek : posted_info.hrsPerWeek,
         difficulty : posted_info.difficulty,
         is_anonymous : anonymous,
         timeAgo : time_ago,
         absTime : Date.now(),
         upvotes : 0,
         downvotes : 0
      });

      new_review.save(function(error){
         if (error) throw error;
      });

      if (professor) {
         compute_average_rating(professor._id, new_review._id);
      }

      compute_average_difficulty_and_time_spent(class_info, res, new_review._id);

   }).lean();
}

function generate_post_review_event(posted_info, user, origin, anonymous) {
   var event = Event({
      facebook_id : user.facebook_id,
      name : user.name,
      anonymous: anonymous,
      picture : user.picture,
      event_type : "review_post",
      event_url : origin,
      created : Date.now()
   });
   event.save(function(error) {
      if (error) throw error;
   });
}

function compute_average_rating(prof_id, review_id){
   Professor.findById(prof_id, function(error, professor){
      professor.reviews.push(review_id);
      var sum_ratings = 0;
      var num_valid_ratings = 0;

      async.each(professor.reviews,
         function(review_id, callback){
            Review.findById(review_id, function(error, review){
               if (error) throw error;
               if (review && review.rating && !isNaN(review.rating)){
                  sum_ratings += parseFloat(review.rating);
                  num_valid_ratings++;
               }
               callback(error);
            });
         },
         function(error){
            var average_rating = 0;
            if (num_valid_ratings > 0) {
               average_rating = (sum_ratings / num_valid_ratings).toFixed(2);
            }
            professor.actualRating = average_rating;
            professor.save(function(error){
               if (error) throw error;
            });
         }
      );
   });
}

function compute_average_difficulty_and_time_spent(class_info, res, new_review_id) {
   Class.findOne({ department : class_info[0], courseNum : class_info[1] }, function(error, class_obj){
      if (error) throw error;
      if (!class_obj) {
         res.redirect("/class/" + class_info[0] + "-" + class_info[1]);
         return;
      }

      class_obj.reviews.push(new_review_id);
      var sum_diff = 0;
      var sum_hrs_spent = 0;
      var num_valid_ratings = 0;

      async.each(class_obj.reviews,
         function(id, callback){
            Review.findById(id, function(error, review){
               if (error) throw error;
               if (review && review.hrsPerWeek && review.difficulty){
                  sum_hrs_spent += parseInt(review.hrsPerWeek, 10);
                  sum_diff += parseInt(review.difficulty, 10);
                  num_valid_ratings++;
               }
               callback(error);
            }).lean();
         },
         function(error){
            if (error) throw error;
            var average_difficulty = 0;
            var average_hrs_per_week = 0;

            if (num_valid_ratings > 0) {
               average_difficulty = (sum_diff / num_valid_ratings).toFixed(2);
               average_hrs_per_week = (sum_hrs_spent / num_valid_ratings).toFixed(2);
            }

            class_obj.rating = average_difficulty;
            class_obj.numHrs = average_hrs_per_week;
            class_obj.timeCommitment = average_hrs_per_week;
            class_obj.save(function(error){
               if (error) throw error;
               res.redirect("/class/" + class_obj.department + "-" + class_obj.courseNum);
            });
         }
      );
   });
}

module.exports = router;
