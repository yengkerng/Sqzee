var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var async = require('async');

var Class = require('../config/models/class');
var Professor = require('../config/models/professor');
var Review = require('../config/models/review');
var Event = require('../config/models/timeline_event');
require('datejs');

var router = express.Router();

router.get('/',
   function(req, res, next){
      if (req.isAuthenticated()){
         next();
      }else{
         Professor.find({  }, function(err, professors) {
            if (err) throw err;
           //console.log("Rendering class list page...");
            res.render("pages/professors/listProfessors", { loggedIn : false, profList : professors});
         }).lean();
      }
   },function(req, res) {
      Professor.find({  }, function(err, professors) {
         if (err) throw err;
        //console.log("Rendering class list page...");
         res.render("pages/professors/listProfessors", { loggedIn : true, profList : professors});
      }).lean();
   }
);

router.get('/:professorId',
   function(req, res, next){
      //if (req.isAuthenticated()){
      //   next();
      //}else{
         var profId = new mongoose.Types.ObjectId(req.params.professorId);

         Professor.findById(profId, function(err, professor) {
            if (professor){
               console.log(professor.name);
               console.log(professor.reviews);
               if (err) throw err;

               var classes = [];
               var reviews = [];

               var allClassList = professor.nextQtrClasses.concat(professor.currQrtClasses.concat(professor.previousQrtClasses))

               async.each( allClassList,//professor.nextQtrClasses,
                  function(id, callback){
                     Class.findById(id, function(error, classObj){
                        if (classObj){
                           classes.push(classObj);
                        }
                        callback(error, callback);
                     });
                  },
                  function(error) {
                     Review.find({"professor" : [professor._id]}, function(e, reviewObjs){
                        async.each(reviewObjs,
                           function(reviewObj, callback){
                              if (reviewObj){
                                //convert polyrating date to abs date if missing
                                 if(!reviewObj.absTime) {
                                   reviewObj.absTime = Date.parse(reviewObj.timeAgo);
                                   Review.update({_id: reviewObj.id}, reviewObj, function(){});
                                 }
                                 reviews.push(reviewObj);
                                 //console.log(reviewObj);
                              }
                              //console.log("DONE.")
                              callback(e);
                           },
                           function(e){
                              //console.log("IN END.")
                              reviews.sort(function(a, b) {
                                 return b.absTime - a.absTime;
                              });
                              console.log(reviews);

                              var ratingsVal = parseFloat( ((professor.rating + professor.polyRating)/(professor.numRatings + professor.numPolyRatings)).toFixed(2) )
                              res.render('pages/professors/professorPage', { loggedIn : req.isAuthenticated()/*false*/, profObj : professor, classList : classes, reviewList : reviews, ratingsVal : ratingsVal});
                           }
                        );
                     });
                  }
               );
            }else{
               res.redirect('/professor/')
            }
         });
      //}
   },function(req, res) {
      var profId = new mongoose.Types.ObjectId(req.params.professorId);

      Professor.findById(profId, function(err, professor) {
         if (err) throw err;

         var classes = [];
         var reviews = [];

         if (professor){
            async.each(professor.nextQtrClasses,
               function(id, callback){
                  Class.findById(id, function(error, classObj){
                     if (classObj){
                        classes.push(classObj);
                     }
                     callback(error);
                  });
               },
               function(error) {
                  async.each(professor.reviews,
                     function(id, callback){
                        Review.findById(id, function(e, reviewObj){
                           if (reviewObj){
                             if(!reviewObj.absTime) {
                                    reviewObj.absTime = Date.parse(reviewObj.timeAgo);
                                    Review.update({_id: reviewObj.id}, reviewObj, function(){});
                                  }
                              reviews.push(reviewObj);
                             //console.log(reviewObj);
                           }
                           callback(e);
                        }).lean();
                     },
                     function(e){
                        reviews.sort(function(a, b) {
                          //console.log("b.abs= " + b.absTime + " a.abs= " + a.absTime + "\n");
                            return b.absTime - a.absTime;
                        });
                       //console.log("Rendering professor page with classes from " + professor.name);

                       var ratingsVal = parseFloat( ((professor.rating + professor.polyRating)/(professor.numRatings + professor.numPolyRatings)).toFixed(2) )
                        res.render('pages/professors/professorPage', { loggedIn : true, profObj : professor, classList : classes, reviewList : reviews, ratingsVal : ratingsVal});
                     }
                  );
               }
            );
         }else{
            res.redirect('/professor/')
         }
      });
   }
);

router.post('/:professorId/postReview', isLoggedIn, function(req, res) {
   var postedInfo = req.body;
  //console.log(postedInfo);

   var timeAgo = new Date().toLocaleString('en-US').split(' ');

   timeAgo[0] = timeAgo[0].slice(0,-1);
   timeAgo[1] = timeAgo[1].slice(0,-3);
   //timeAgo = timeAgo[0];
   timeAgo = timeAgo[0] + " " + timeAgo[1] + " " + timeAgo[2];


   var author = "";
   var origin = req.headers.origin + "/professor/" + req.params.professorId;
   var anonymous = false;
   if (postedInfo.anon == undefined){
      author = req.user.name;              //placeholder for when we can pass in user names.
   }
   else{
      author = req.user.name;
      anonymous = true;
   }

   var profId = [];
   profId.push(new mongoose.Types.ObjectId(req.params.professorId));
   var profName;
   Professor.findById(profId[0], function(err, profObj) {
      if (err) throw err;
      console.log(profObj);
      profName = profObj.name;


      console.log("Professor Name: " + profName);
      /*NEW REVIEW TO BE PUSHED*/
      newReview = Review({
        user : author,
        rating : postedInfo.rating,
        review : postedInfo.review,
        professor_name : profName,
        professor : profId[0],
        class : postedInfo.reviewClass,
        grade : postedInfo.grade,
        hrsPerWeek : postedInfo.hrsPerWeek,
        difficulty : postedInfo.difficulty,
        is_anonymous : anonymous,
        timeAgo : timeAgo,
        absTime : Date.now(),
        upvotes : 0,
        downvotes : 0
      });

      newReview.save(function(e) {
       if (e){
          console.log(e);
          throw e;
       }
       console.log("New review added to database...");
      });

      var classReviewed = postedInfo.reviewClass.split(" ");
      console.log("Class included in review " + classReviewed[0] + " " + classReviewed[1]);
      Class.findOne({ department : classReviewed[0], courseNum : classReviewed[1]}, function(err, classObj) {
         if (err) {
            console.log(err);
            throw err;
         }
         //Confused why we're making two reviews (see above) so I commented this out
         /*
         newReview = Review({
           user : author,
           rating : postedInfo.rating,
           review : postedInfo.review,
           professor_name : profName,
           professor : profId[0],
           class : postedInfo.reviewClass,
           grade : postedInfo.grade,
           hrsPerWeek : postedInfo.hrsPerWeek,
           difficulty : postedInfo.difficulty,
           is_anonymous : postedInfo.anon,
           timeAgo : timeAgo,
           absTime : Date.now(),
           upvotes : 0,
           downvotes : 0
        });

         newReview.save(function(e) {
          if (e){
             console.log(e);
             throw e;
          }
          console.log("New review added to database...");
       });*/
         classObj.reviews.push(newReview._id);

         var ratingOld = classObj.rating;
         var numRatingsOld = classObj.numRatings;
         var newToAdd = newReview.difficulty;

         var ratingNew = add_to_average(ratingOld, newToAdd, numRatingsOld);
         var numRatingsNew = numRatingsOld + 1;

         classObj.numRatings = numRatingsNew;
         console.log("newToAdd: " + newToAdd);
         console.log("ratingOld: " + ratingOld);
         console.log("ratingNew: " + ratingNew);
         classObj.rating = ratingNew;

         var hrsOld = classObj.timeCommitment;
         var numHrsOld = classObj.numHrs;
         var newToAdd = newReview.hrsPerWeek;

         var hrsNew = add_to_average(hrsOld, newToAdd, numHrsOld);
         var numHrsNew = numHrsOld + 1;

         classObj.numHrs = numHrsNew;
         classObj.timeCommitment = hrsNew;



         classObj.save(function(err){
            if (err) throw err;
           //console.log("Updated class... " + classObj + " .... " + newReview);
           console.log("Class " + classReviewed[0] + " " + classReviewed[1] + " has a new review");
         });

      });
      // Adding review to classObj


      //Professor.findById(profId[0], function(err, profObj) {
         //if (err) throw err;

   //});
   // Adding review to classObj

   //Class.findOne({}, function(err, _class) {});

   //Professor.findById(profId[0], function(err, profObj) {
      //if (err) throw err;


      profObj.reviews.push(newReview._id);

      var numRatings = profObj.numRatings + 1;
      var rating = profObj.rating;

      var newAverage = rating + ((parseFloat(newReview.rating) - rating)/numRatings);

      profObj.numRatings = numRatings;
      profObj.rating = parseFloat(newAverage.toFixed(2));

      profObj.actualRating = (profObj.polyRating) * (profObj.numPolyRatings / (profObj.numPolyRatings + profObj.numRatings) ) + (profObj.rating) * (profObj.numRatings / (profObj.numPolyRatings + profObj.numRatings) );
      profObj.actualRating = parseFloat(profObj.actualRating.toFixed(2));

      profObj.save(function(err){
         if (err) throw err;
        //console.log("Updated professor... ");
         res.redirect("/professor/" + profObj._id);
      })
      //});
   });
   /*
   var newReview = Review({
      user : author,
      rating : postedInfo.rating,
      review : postedInfo.review,
      class : postedInfo.reviewClass,
      grade : postedInfo.grade,
      professor_name : profName,
      professor : profId,
      timeAgo : timeAgo,
      absTime: Date.now()
   });

   newReview.save(function(e) {
      if (e){
         throw e;
      }
     //console.log("New review added to database...");
   });
   */


   //Adding reivew to classObj

   generate_post_professor_review_event(postedInfo, req.user, origin);
});

//www.sqzee.com/professors/5000ASDF94JNASDFNKJAKLSD/review_count

router.get('/:professorId/review_count', function(req, res) {

   var profId = new mongoose.Types.ObjectId(req.params.professorId);

   Professor.findById(profId, function(err, professor) {
      res.json({professor_name : professor.name, review_count : professor.reviews.length});
   });

});

router.get('/:professorId/reviews', function(req, res) {
   //if (!req.isAuthenticated()) {
  //    res.json({});
   //}
   //var profId = mongoose.mongo.BSONPure.ObjectID.fromHexString(req.params.professorId);
   Professor.findById(req.params.professorId, function(err, professor) {
      if (err) {
         console.log(err);
         throw err;
      }
      if (!professor) {
         res.json({});
      }
      var reviews = [];

      Review.find({"professor" : [professor._id]}, function(error, reviewObjs){
         async.each(reviewObjs,
            function(review, callback){
               if (review){
                  if(!review.absTime) {
                     review.absTime = Date.parse(review.timeAgo);
                     Review.update({_id: review.id}, review, function(){});
                  }

                  if (review.upvotes + review.downvotes < 3){
                     reviews.push([review, "NEW"]);
                  }

                  else if (review.upvotes == review.downvotes){
                     reviews.push([review, "DISPUTED"]);
                  }

                  else if (review.upvotes > review.downvotes){
                     if ( (parseFloat(review.downvotes) / parseFloat(review.upvotes)) < 0.8 ){
                        reviews.push([review, "CONSTRUCTIVE"]);
                     }
                     else {
                        reviews.push([review, "DISPUTED"]);
                     }
                  }

                  else if (review.downvotes > review.upvotes){
                     if ( (parseFloat(review.upvotes) / parseFloat(review.downvotes)) < 0.75 ){
                        reviews.push([review, "UNHELPFUL"]);
                     }
                     else {
                        reviews.push([review, "DISPUTED"]);
                     }
                  }

               }
               callback(error);
            },
            function(err){
               reviews.sort(function(a, b) {
                  return b[0].absTime - a[0].absTime;
               });
               console.log(reviews);
               res.json({"reviews" : reviews});
            }
         );

      });

      /*async.each(professor.reviews,
         function(id, callback){
            Review.findById(id, function(error, review){
               if (review){
                  if(!review.absTime) {
                     review.absTime = Date.parse(review.timeAgo);
                     Review.update({_id: review.id}, review, function(){});
                  }

                  if (review.upvotes + review.downvotes < 3){
                     reviews.push([review, "NEW"]);
                  }

                  else if (review.upvotes == review.downvotes){
                     reviews.push([review, "DISPUTED"]);
                  }

                  else if (review.upvotes > review.downvotes){
                     if ( (parseFloat(review.downvotes) / parseFloat(review.upvotes)) < 0.8 ){
                        reviews.push([review, "CONSTRUCTIVE"]);
                     }
                     else {
                        reviews.push([review, "DISPUTED"]);
                     }
                  }

                  else if (review.downvotes > review.upvotes){
                     if ( (parseFloat(review.upvotes) / parseFloat(review.downvotes)) < 0.75 ){
                        reviews.push([review, "UNHELPFUL"]);
                     }
                     else {
                        reviews.push([review, "DISPUTED"]);
                     }
                  }

               }
               callback(error);
            }).lean();
         }, function(err) {
            reviews.sort(function(a, b) {
               return b[0].absTime - a[0].absTime;
            });
            console.log(reviews);
            res.json({"reviews" : reviews});
      });*/
   });
});

function generate_post_professor_review_event(posted_info, user, origin) {
   var event = Event({
      facebook_id : user.facebook_id,
      name : user.name,
      picture : user.picture,
      event_type : "professor_review",
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

function add_to_average(ratingOld, newToAdd, numRatingsOld){

   var ratingNew = ratingOld + ((newToAdd - ratingOld)/(numRatingsOld + 1));

   return parseFloat(ratingNew.toFixed(2));

}

function compute_average_rating(professor_id) {
   Professor.findById(professor_id, function(err, prof) {
      var sumRatings = 0;
      var numValidRatings = 0;
      for (var i = 0; i < prof.reviews.length; i++) {

      }
      async.each(prof.reviews,
         function(review_id, callback) {
            Review.findById(review_id, function(err, review) {
               if (review) {
                  if (review.rating && !isNaN(review.rating)) {
                     sumRatings += parseFloat(review.rating);
                     numValidRatings++;
                  }
               }
            });
      }, function(error) {
         var average_rating = 0;
         if (numValidRatings > 0) {
            average_rating = sumRatings / numValidRatings;
         }
         return average_rating;
         /*prof.actualRating = average_rating;
         prof.save(function(err) {
            if (err) {
               console.log(err);
               throw err;
            }
            console.log("Updated " + professor_id);
         });
         */
      });
   });
}

module.exports = router;
