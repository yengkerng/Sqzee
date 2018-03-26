$( document ).ready(function() {
   reviews = [];
   class singleReview {
     constructor(className, professor, grade, review, rating, timeAgo, user, upvotes, downvotes, tag, professorID) {
        this.className = className;
        this.professor = professor;
        this.grade = grade;
        this.review = review;
        this.rating = rating;
        this.timeAgo = timeAgo;
        this.user = user;
        this.upvotes = upvotes;
        this.downvotes = downvotes;
        this.tag = tag;
        this.professorID = professorID
     }
   }
   var linkClass = 0;
   var pathname = window.location.pathname;

   $('.classSideBar').click(function(e) {
      if($(e.target).attr('id')=='reviewLinkHeader') {
         refreshReviews($(e.target).parent('.classReviewSectionName'), $(e.target).text());
         showClasses();
      } else if($(e.target).hasClass('classReviewSectionName')) {
         refreshReviews($(e.target), $(e.target).find('#reviewLinkHeader').text());
         showClasses();
      }
   });

   function refreshReviews(e, name) {
      $('.reviewSection').find('.reviewSectionPosts').remove();
      var first = document.createElement("div");
      $(first).addClass('a');

      $('.reviewSection').append(first);
      $('.classReviewSectionName').css('background-color', '#FFF');
      e.css('background-color', '#ccf2ff');

      if (linkClass > 0) {
        $('.classContainerForReviews').find('.sectionHeader').empty();
      }

      var linkToClass = document.createElement("a");
      var split = name.split(" ")
      linkToClass.text = name;
      linkToClass.href = "https://www.sqzee.com/class/" + split[0] + "-" + split[1];
      $('.classContainerForReviews').find('.sectionHeader').append(linkToClass);
      linkClass = linkClass + 1;

      for(i=0; i<reviews.length; i++) {
         if(reviews[i][0] == name) {
            for(j=1; j<reviews[i].length; j++) {
               $('.reviewSection').append(createSingleReview(reviews[i][j]));
            }
         }
      }
      //$('.reviewSection').append($('.professorReviewSection#'+name));
   }

   function showClasses() {
     var className = $('.classContainerForReviews');
     className.css('display', 'block');
   }

   function getReviews(pathname, callback) {
      var flex = document.createElement("div");
      $(flex).addClass('flex');
      $('.classSideBar').append(flex);
      $('.loadingGif').prepend('<img id="loading" src="https://invitationdigital-res.cloudinary.com/image/upload/vc3/web/animated/spinner-200px.gif" style="width: 10%"/>');

      var reviewList = [];
      var departmentAndRatingArray = [];
      //console.log(pathname);
      $.getJSON(pathname + "/reviews", function(data) {
         $.each(data.reviews, function(n, val) {
            reviewContent = val[0];
            //var deptRatPath = "/"+reviewContent.professor[0]+"/getDepartmentAndRating";
            //var dept;
            //reviewContent.professorID = reviewContent.professor[0];
            single = new singleReview(reviewContent.class, reviewContent.professor_name, reviewContent.grade, reviewContent.review,
              reviewContent.rating, reviewContent.timeAgo, reviewContent.user, reviewContent.upvotes, reviewContent.downvotes, reviewContent.tag, reviewContent.professorID);
         reviewList.push(single);
         });
      }, "json").done(function() {
         //console.log("Actual reviews here");
         $("#loading").hide();
         callback(reviewList);
         $('.classReviewSectionName').first().find('a#reviewLinkHeader').trigger('click');
      });
   }

   function sortClass(reviewList) {
       var myMap = new Map();
       var professorName;
       var singleReview;
       var valueArray;

       for (var i = 0; i < reviewList.length; i++) {
          className = reviewList[i].className;
          singleReview = reviewList[i];

          //console.log(singleReview);
          if (myMap.get(className) != undefined) {
             myMap.get(className).push(singleReview);
             //console.log(className);
             //console.log(singleReview);
          }

          else {
             valueArray = [];
             valueArray.push(className);
             myMap.set(className, valueArray);
             myMap.get(className).push(singleReview);

          }

       }

       iterateOverClasses(myMap);
   }

   function iterateOverClasses(myMap) {
      for (var [key, value] of myMap) {
         if(value.length > 1)
          setReviewView(value, key);
      }
   }

   function setReviewView(reviews, className) {

      var singleReview;
      var classSection;
      var classSectionName;
      var sectionLink;
      var createdReview;

      var departmentName = reviews.name;
      var rating = reviews.rating;

      this.reviews.push(reviews);

      //console.log("HERE -- making reviews for " + professorName);

      ratingDiv = document.createElement("div");
      $(ratingDiv).addClass("ratingContainer").attr("id", rating);
      $(ratingDiv).text(rating);

      classSection = document.createElement("div");
      $(classSection).addClass("classReviewSection").attr("id", className);

      classSectionName = document.createElement("div");
      $(classSectionName).addClass("classReviewSectionName");

      department = document.createElement("div");
      $(department).addClass("departmentContainer").attr("id", rating);
      $(department).text(departmentName);
      //$(department).append(profSectionName)

      sectionLink = document.createElement("a");
      $(sectionLink).attr("name", className).attr("id", "reviewLinkHeader").text(className);
      $(classSectionName).append(sectionLink);

      $(classSection).append(classSectionName);
      //console.log(classSectionName);
      //$(profSection).append(department);

      var br = document.createElement('br');
      $(classSectionName).append(br);
      $(classSectionName).append(department);
      $(department).append(ratingDiv)

      $('.classSideBar').append($(classSectionName));
      //$('.reviewSection').append(profSection);
      var reviewCollection = $('ul.list-group#reviewsContainer');
      for (var i = 0; i < reviews.length; i++) {
         singleReview = reviews[i];

         createdReview = createSingleReview(singleReview);

         if ($(classSection).attr("id") == singleReview.className) {
            //$(profSection).append(createdReview);
            classSection.append(createdReview);
         }

      }

      $(reviewCollection).append(classSection);

   }


   function createSingleReview(review) {
      /* START -- CREATING RATING CONTAINER */
      var rating = document.createElement("div");
      $(rating).addClass("header").attr("id", "rating");
      if (review.rating != "PR") {
         $(rating).text(review.rating);
      }
      /* END */

      /* START -- CREATING GRADE CONTAINER */
      var grade = document.createElement("div");
      $(grade).addClass("header").attr("id", "grade").text("Grade: " + review.grade);
      /* END */

      /* START -- CREATING RATING COLORS CONTAINER */
      var ratingColors = document.createElement("img");
      $(ratingColors).attr("id", "circle").attr("src", "/misc/work/ratingColors/"+review.rating+".png");
      if (review.rating == "PR") {
         $(ratingColors).css("border-radius", "0px");
      }
      /* END */

      var middleContainer = document.createElement("div");
      $(middleContainer).addClass("middle").append(rating).append(grade);

      var leftContainer = document.createElement("div");
      $(leftContainer).addClass("left");
      $(leftContainer).append(ratingColors);

      var user = document.createElement("div");
      $(user).addClass("header").attr("id", "user");
      if (review.user != "Anonymous") {
         $(user).text(review.user);
      }


      var reviewTime = document.createElement("div");
      if (review.rating != "PR") {
         $(user).addClass("header").attr("id", "reviewTime").text(review.timeAgo);
      }
      else {
         $(user).addClass("header").attr("id", "reviewTime").text(review.timeAgo);

      }

      var rightContainer = document.createElement("div");
      $(rightContainer).addClass("right");
      $(rightContainer).append(user).append(reviewTime);

      var titleContainer = document.createElement("div");
      $(titleContainer).addClass("title");
      $(titleContainer).append(rightContainer).append(leftContainer).append(middleContainer);

      var description = document.createElement("div");
      $(description).addClass("description").attr("id", "reviewContent").text(review.review);

      var content = document.createElement("div");
      $(content).addClass("content").attr("id", "reviewTextContainer");
      $(content).append(description);


      var fullContainer = document.createElement("a");
      $(fullContainer).addClass("list-group-item").addClass("reviewSectionPosts");
      $(fullContainer).append(titleContainer).append(content);

      return fullContainer;

   }




   getReviews(pathname, sortClass);

   $('.classLink').localScroll({duration:2000});
});
