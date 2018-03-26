$( document ).ready(function() {

   class singleReview {
      constructor(className, grade, review, rating, timeAgo, user, upvotes, downvotes, tag) {
         this.className = className;
         this.grade = grade;
         this.review = review;
         this.rating = rating;
         this.timeAgo = timeAgo;
         this.user = user;
         this.upvotes = upvotes;
         this.downvotes = downvotes;
         this.tag = tag;
      }
   }


   var pathname = window.location.pathname;
   function getReviews(pathname, callback) {

      var reviewList = [];
      $.getJSON(pathname + "/reviews", function(data) {
         $.each(data.reviews, function(n, val) {
            reviewContent = val[0];
            single = new singleReview(reviewContent.class, reviewContent.grade, reviewContent.review,
               reviewContent.rating, reviewContent.timeAgo, reviewContent.user, reviewContent.upvotes, reviewContent.downvotes, val[1].tag);
            reviewList.push(single);
         });
      }, "json").done(function() {
         callback(reviewList);
      });
   }

   function setReviewView(reviews) {
      var reviewCollection = $('ul.list-group#reviewCollection');
      var current = "";
      var singleReview;
      for (var i = 0; i < reviews.length; i++) {
         var imageStyle = "";
         singleReview = reviews[i];

         if (singleReview.rating == "PR") {
            imageStyle = "style='border-radius:0px'";
            current = "<a class='list-group-item reviewSectionPosts'><div class='title'><div class='right'><div id='user' class='header'>"+singleReview.user+"</div><div id='reviewTime' class='header'>"+singleReview.timeAgo+"</div></div><div class='left'><img id='circle' src='/misc/work/ratingColors/"+singleReview.rating+".png' "+imageStyle+"/></div><div id='rating' class='header'>PolyRatings Review</div><div id='grade' class='header'>Grade Received: "+singleReview.grade+"</div></div><div class='content' id='reviewTextContainer'><div id='reviewContent' class='description'>"+singleReview.review+"</div></div></a>";
         } else {
            current = "<a class='list-group-item reviewSectionPosts'><div class='title'><div class='right'><div id='user' class='header'>"+singleReview.user+"</div><div id='reviewTime' class='header'>"+singleReview.timeAgo+"</div></div><div class='left'><img id='circle' src='/misc/work/ratingColors/"+singleReview.rating+".png' "+imageStyle+"/></div><div id='rating' class='header'>"+singleReview.rating+"</div><div id='grade' class='header'>"+singleReview.grade+"</div></div><div class='content' id='reviewTextContainer'><div id='reviewContent' class='description'>"+singleReview.review+"</div></div></a>";
         }

         $("div.classReviewSectionName:contains(" + singleReview.className + ")").parent().append(current);



         $(".professorReviewSection").each(function() {
            var count = $(this).children().length;
            if (count == 2) {
               $(this).find("div.noReviewsText").show();
            }
         });
         /*if ($("div.classReviewSectionName").text().indexOf(singleReview.className) != -1) {
            $("div.classReviewSectionName:contains("+singleReview.className+")").parent().append(current);
         }*/
         /*else {

            $("div.classReviewSection").append("<div class='classReviewSection'><div class='classReviewSectionName'>"+singleReview.className+"</div></div>");
            $("div.classReviewSectionName:contains("+singleReview.className+")").parent().append(current);
         }*/
      }
   }

   getReviews(pathname, setReviewView);

   $('.classLink').localScroll({duration:2000});
});
