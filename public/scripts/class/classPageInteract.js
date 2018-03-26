$( document ).ready(function() {

   loadClassForum();
   reviews = [];
   hideClassForum();
   clearProfessors();


   //Click on reviews tab
   $("a[href$='#reviews']").unbind("click").bind("click",function(e) {
      //Change Resources to Teachers and hide forum posts
      $('.classSideBar').find('.sectionHeader').text("Professors");
      var flex = document.createElement("div");
      $(flex).addClass('flex');
      $('.classSideBar').append(flex);
      hideClassForum();
      clearProfessors();
      hideDescription();
      reviews = [];
      showProfessors();

      $('.loadingGif').prepend('<img id="loading" src="https://invitationdigital-res.cloudinary.com/image/upload/vc3/web/animated/spinner-200px.gif" style="width: 10%"/>');

      getReviews(pathname, sortProfessors);

   });

   //Click on description tab

   $("a[href$='#description']").click(function(e) {
      $('.classSideBar').find('.sectionHeader').text("Professors");
      clearReviews();
      hideClassForum();
      clearProfessors();
      loadDescription();
   });

   //Click on forum tab
   $("a[href$='#forum']").click(function(e) {
      $('.classSideBar').find('.sectionHeader').text("Post Details");
      loadClassForum();
      clearReviews();
      clearProfessors();
      hideDescription();
      //loadClassForum();
   });

   /*********** REVIEWS  **********************/

   function clearProfessors() {
      if($('.classSideBar').find('.professorReviewSectionName').length > 0) {
         $('.professorReviewSectionName').remove();
      }
      var professorName = $('.professorContainerForReviews');
      professorName.css('display', 'none');

   }

   function showProfessors() {
     var professorName = $('.professorContainerForReviews');
     professorName.css('display', 'block');
   }

   $('.classSideBar').click(function(e) {
      if($(e.target).attr('id')=='reviewLinkHeader') {
         refreshReviews($(e.target).parent('.professorReviewSectionName'), $(e.target).text());
         showProfessors();
      } else if($(e.target).hasClass('professorReviewSectionName')) {
         refreshReviews($(e.target), $(e.target).find('#reviewLinkHeader').text());
         showProfessors();
      }
   });

   function refreshReviews(professor, name) {
      $('.reviewSection').find('.reviewSectionPosts').remove();
      var first = document.createElement("div");
      $(first).addClass('a');

      $('.reviewSection').append(first);

      $('.professorReviewSectionName').css('background-color', '#FFF');
      professor.css('background-color', '#ccf2ff');
      $('.professorContainerForReviews').find('.sectionHeader').text(name);


      for(i=0; i<reviews.length; i++) {
         if(reviews[i][0] == name) {
            for(j=1; j<reviews[i].length; j++) {
               $('.reviewSection').append(createSingleReview(reviews[i][j]));
            }
         }
      }
      //$('.reviewSection').append($('.professorReviewSection#'+name));
   }

   function clearReviews() {
        $('.reviewSectionPosts').remove();
   }

   /*********** END OF REVIEWS  **********************/

   /*********** DESCRIPTION  **********************/

   function loadDescription() {
     var description = $('.descriptionContainer');
     var professorList = $('.professorList')
     //$('.classSideBar').find('.sectionHeader').css('display', 'block');

     professorList.css('display', 'block');
     description.css('display', 'block');
   }

   function hideDescription() {
     var description = $('.descriptionContainer');
     var professorList = $('.professorList')
     //$('.classSideBar').find('.sectionHeader').css('display', 'none');

     professorList.css('display', 'none');
     description.css('display', 'none');
   }

   /*********** END OF DESCRIPTION  **********************/

   /*********** FORUM  **********************/


   function loadClassForum() {
      var posts = $('.forumPostBody');
      var postNewTopic = $('.forumPostHeader');
      var postTopic = $('.outsideForm');

      posts.css('display', 'block');
      postNewTopic.css('display', 'block');
      postTopic.css('display', 'block');
   };

   function hideClassForum() {
      if($('.individualPostContainer').length > 0) {
        $('.individualPostContainer').remove();
      }

      var posts = $('.forumPostBody');
      var postNewTopic = $('.forumPostHeader');
      var postTopic = $('.outsideForm');

      posts.css('display', 'none');
      postNewTopic.css('display', 'none');
      postTopic.css('display', 'none');

      if($('.classSideBar').find('.replyToClone').length > 0) {
        $('.classSideBar').find('.replyToClone').remove();
      }
   }

   //function sortPosts(posts) {

   //}


   $('.forumPostBody').find('a.titleForForum').click(function(e) {
      e.stopImmediatePropagation();

      var sideBar = $('.classSideBar');
      displayComment($(this).offsetParent(), sideBar);
   });

   function sortComments(subs) {
      var sortedSubs = [];
      var dates = [];

      subs.children().each(function(i, el) {
         var date = $(el).find('.subcommentTime').text().split(" ")[0];
         var year = parseInt(date.split("/")[2]);
         var month = parseInt(date.split("/")[0]);
         var day = parseInt(date.split("/")[1]);

         var hour = parseInt($(el).find('.subcommentTime').text().split(" ")[1].split(":")[0]);
         var min = parseInt($(el).find('.subcommentTime').text().split(" ")[1].split(":")[1]);
         var AM = $(el).find('.subcommentTime').text().split(" ")[2];

         if(AM == "PM")
            hour += 12;

         var d = new Date(year, month, day, hour, min);
         dates.push(d);
      });

      dates.sort(function(a,b) {
         return a - b;
      });

      for(j = 0; j < dates.length; j++) {
         subs.children().each(function(i, el) {
            var date = $(el).find('.subcommentTime').text().split(" ")[0];
            var year = parseInt(date.split("/")[2]);
            var month = parseInt(date.split("/")[0]);
            var day = parseInt(date.split("/")[1]);

            var hour = parseInt($(el).find('.subcommentTime').text().split(" ")[1].split(":")[0]);
            var min = parseInt($(el).find('.subcommentTime').text().split(" ")[1].split(":")[1]);
            var AM = $(el).find('.subcommentTime').text().split(" ")[2];

            if(AM == "PM")
               hour += 12;

            var d = new Date(year, month, day, hour, min);
            if(dates[j].getTime() === d.getTime()) {
               sortedSubs.push(el);
            }
         });
      }

      subs.children().remove();
      for(i = 0; i < sortedSubs.length; i++) {
         subs.append(sortedSubs[i]);
      }
   }

   
   function displayComment(comment, parent) {
      if($('.individualPostContainer').length > 0) {
        $('.individualPostContainer').remove();
      }

      if($('.classSideBar').find('.replyToClone').length > 0) {
        $('.classSideBar').find('.replyToClone').remove();
      }

      $('.classSideBar').find('.sectionHeader').css('display', 'block');

      var id = comment.find('.postId').text();
      //console.log(id);
      var postContent = comment.find('.postContent').text();

      var str = postContent.replace(/(?:\r\n|\r|\n)/g, '<br/> <br/>');

      var title = comment.find('a.titleForForum').text();
      var author = comment.find('div.nameForForum').text();
      var timeStamp = comment.find('.timeStamp').text();


      var container = document.createElement("div");
      $(container).addClass('individualPostContainer');

      var postText = document.createElement("div");
      $(postText).addClass('sidebarPostContentText');
      $(postText).html(str);
      //$(postText).text(str);

      var userInfo = document.createElement("div");
      $(userInfo).addClass('sidebarPostDetails');
      $(userInfo).text(author+" - "+timeStamp);

      var parentComment = document.createElement("div");
      $(parentComment).addClass('parentCommentContainer');

      $(parentComment).append($(postText), $(userInfo));
      $(container).append(parentComment);

      // START OF SUBCOMMENTS //

      var comments = getPostComments(id);

      var classForumComments = comments[0];
      var classAuthor = comments[1];
      var classTimeStamp = comments[2];

      var lengthComments = comments[0].length;

      var subs = document.createElement("div");
      $(subs).addClass('subcommentsContainer');

      for (var i = 0; i < lengthComments; i++) {
        var commentDisplay = document.createElement("div");
        $(commentDisplay).addClass("individualSubcommentContainer");

        var separator = document.createElement("span");
        $(separator).addClass("separator").text(" - ");

        var br = document.createElement("br");

        var commentText = document.createElement("div");
        $(commentText).text(classForumComments[i]);

        var authorDisplay = document.createElement("span");
        $(authorDisplay).addClass("subcommentPostDetails");
        $(authorDisplay).text(classAuthor[i]);

        var timeDisplay = document.createElement("span");
        $(timeDisplay).addClass("subcommentTime");
        $(timeDisplay).text(classTimeStamp[i]);

        $(authorDisplay).append($(separator));
        $(authorDisplay).append($(timeDisplay));

        $(commentDisplay).append(commentText, br, authorDisplay);
        $(subs).append(commentDisplay);
      }

      sortComments($(subs));
      $(parentComment).append(subs);

      var second = document.createElement("div");
      $(second).addClass('b');

      parent.append($(second));

      parent.append($(container));

      loadResponseBox(id);
      //console.log("Title: "+title+"\nPost Content: "+postContent+"\nId: "+id+"\nAuthor: "+author);
   }

   function loadResponseBox(postId) {
      //console.log($('.replyTo').length);

      var sideBar = $('.classSideBar');
      var responseForm = $('.replyTo').find('.postId:contains('+postId+')').parent();
      var responseFormCopy = responseForm.clone();
      responseFormCopy.attr('class', 'replyToClone');

      sideBar.append(responseFormCopy);
      responseFormCopy.css('display','block');
   }

   function getPostComments(postID, type){
      var comments = [];
      var author = [];
      var timeAgo = [];
      var result = [];
      var result2;

      var action = $.ajax({
         dataType : "json",
         url      : pathname + "/" + postID + "/getComments",
         async    : false,
         success  : function(data){
           for (var i = 0 ; i < data.comments.length; i++) {
             comments.push(data.comments[i].comment.substring(2));
             author.push(data.comments[i].author);
             timeAgo.push(data.comments[i].timeAgo);
             result2 = data.comments[i];
           }
            //console.log(data.comments.comment);
            //comments = data.comments.comment;
         }
      });

      //console.log("array" + comments);
      result[0] = comments;
      result[1] = author;
      result[2] = timeAgo;
      //console.log(result2);
      return result;
   }


   $('#newForumPost').submit(function(e) {
      e.stopImmediatePropagation();
      e.preventDefault();

      var className = $('#courseInfo').text();
      var dept = className.substring(0,className.indexOf(" "));
      var courseNum = className.substring(className.indexOf(" ")+1);

      SubForm(dept, courseNum);
   });

   function SubForm (dept, courseNum){
    $.ajax({
        url:'/forum/' + dept + "-" + courseNum + '/postForum',
        type:'post',
        data:$('#newForumPost').serialize(),
        success:function(){
            location.reload();
        }
    });
   }


   /*********** END FORUM *******************/

   /*********** START OF FACEBOOK FRIEND IMPLEMENTATION **********/

   class singleFacebookFriend {
      constructor(name, profilePic) {
         this.name = name;
         this.profilePic = profilePic;
      }
   }

   var pathname = window.location.pathname;

   function getFacebookFriends(pathname, callback) {
      var facebookFriends = [];
      $.getJSON(pathname + "/getFriendsInClass", function(data) {
         $.each(data.facebookFriends, function(n, val) {
            var single = new singleFacebookFriend(val.name, val.picture);
            facebookFriends.push(single);
         });
      }, "json").done(function() {
         callback(facebookFriends);
      });
   };

   function setFriendsTable(facebookFriends) {
      var facebookTable = $('#facebookFriendsBody');
      var current = "";
      var overflow = false;
      for (var i = 0; i < facebookFriends.length; i++) {
         if (i > 5) {
            $('.seeMoreFriendsContainer').show();
            overflow = true;
         }
         if (i != 0 && i % 3 == 0) {
            current += "</tr>"
            facebookTable.append(current);
            if (overflow) {
               var current = "<tr class='overflowFriendRow'>";
            }
            else {
               var current = "<tr>";
            }

         }
         var friend = facebookFriends[i];
         var oneFriendColumn = "<td class='singleFriendColumn'><div class='facebookFriendPic'><img class='profilePic' style='background-image:url("+ friend.profilePic + ")'></div><div class='facebookFriendName'>" + friend.name + "</div></td>";
         current += oneFriendColumn;
      }

      facebookTable.append(current);
   }

   var checkit = window.check_var;
    if(checkit === undefined){ //file never entered. the global var was not set.
        window.check_var = 1;
    }
    else {
      getFacebookFriends(pathname, setFriendsTable);
    }





   $('.seeMoreFriendsContainer')
   .click(function() {
      if ($(this).text() == 'Show more...') {
         $('.overflowFriendRow').show();
         $(this).text("Show less...");
      }
      else if ($(this).text() == 'Show less...') {
         $('.overflowFriendRow').hide();
         $(this).text("Show more...");
      }
   });



   /*********** END OF FACEBOOK FRIEND IMPLEMENTATION **********/

   /*********** START OF DROP BUTTON IMPEMENTATION **********/

   $('a.ui.button#enrolled')
   .mouseover(function() {
      $(this).children().text("DROP");
      $(this).css("background-color", "#ca3047");
   })
   .mouseout(function() {
      $(this).children().text("ENROLLED!");
      $(this).css("background-color", "#44748a");
   });



   /*********** END OF DROP BUTTON IMPEMENTATION **********/


   /*********** START OF REVIEWS TAG IMPEMENTATION **********/

   $('div#reviewTag').each(function () {
      if ($(this).text() == ("CONSTRUCTIVE")) {
         $(this).css("color", "#87E293");
      }
      else if ($(this).text() == ("DISPUTED")) {
         $(this).css("color", "#f4d942");
      }
      else if ($(this).text() == ("UNHELPFUL")) {
         $(this).css("color", "#ff4c4c");
      }
   });


   $('span.glyphicon.glyphicon-triangle-top#alreadyVoted')
   .mouseover(function() {
      $(this).parent().siblings('span.voteNotification#upCount').css("display", "inline-block");
   })
   .mouseout(function() {
      $(this).parent().siblings('span.voteNotification#upCount').css("display", "none");
   });


   $('span.glyphicon.glyphicon-triangle-top#upvote')
   .mouseover(function() {
      $(this).parent().siblings('span.voteNotification#upCount').css("display", "inline-block");
   })
   .mouseout(function() {
      $(this).parent().siblings('span.voteNotification#upCount').css("display", "none");
   })
   .click(function() {
      $(this).css("color", "#87E293");
      $(this).parent().siblings('span.voteNotification#upNotify').fadeToggle("slow");
   });

   $('span.glyphicon.glyphicon-triangle-bottom#alreadyVoted')
   .mouseover(function() {
      $(this).parent().siblings('span.voteNotification#downCount').css("display", "inline-block");
   })
   .mouseout(function() {
      $(this).parent().siblings('span.voteNotification#downCount').css("display", "none");
   });


   $('span.glyphicon.glyphicon-triangle-bottom#downvote')
   .mouseover(function() {
      $(this).parent().siblings('span.voteNotification#downCount').css("display", "inline-block");
   })
   .mouseout(function() {
      $(this).parent().siblings('span.voteNotification#downCount').css("display", "none");
   })
   .click(function() {
      $(this).css("color", "#ff4c4c");
      $(this).parent().siblings('span.voteNotification#downNotify').fadeToggle("slow");
   });

   /*********** END OF REVIEWS TAG IMPEMENTATION **********/

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

   class ProfessorReview {
      constructor(professor_id, review_id) {
         this.professor_id = professor_id;
         this.review_id = review_id;
      }
   }

   var pathname = window.location.pathname;

   function getReviews(pathname, callback) {
      var reviewList = [];
      var departmentAndRatingArray = [];
      //console.log(pathname);
      $.getJSON(pathname + "/getReviews", function(data) {
         $.each(data.reviews, function(n, val) {
            reviewContent = val;
            //var deptRatPath = "/"+reviewContent.professor[0]+"/getDepartmentAndRating";
            //var dept;
            reviewContent.professorID = reviewContent.professor[0];
            single = new singleReview(reviewContent.class, reviewContent.professor_name, reviewContent.grade, reviewContent.review,
              reviewContent.rating, reviewContent.timeAgo, reviewContent.user, reviewContent.upvotes, reviewContent.downvotes, reviewContent.tag, reviewContent.professorID);
         reviewList.push(single);
         });
      }, "json").done(function() {
         //console.log("Actual reviews here");
         $("#loading").hide();
         callback(reviewList);
         $('.professorReviewSectionName').first().find('a#reviewLinkHeader').trigger('click');
      });
   }





   /*function getReviews(pathname, callback) {
      var profList = [];

      $.getJSON(pathname + "/reviews", function(data) {
         $.each(data.reviews, function(n, val) {
            reviewContent = val;
            //singleReview = new ProfessorReview(reviewContent.professor[0], reviewContent._id);
            profList.push(reviewContent.professor[0]);
         });
      }, "json").done(function() {
         callback(profList);
      });
   }

   function getReviews(pathname, callback) {
      var profList = [];
      var reviewContent;

      $.ajax({
         dataType : "json",
         url      : window.location.pathname + "/getReviews",
         async    : true,
         success  : function(data){
            $.each(data.reviews, function(n, val) {
               reviewContent = val;
               //singleReview = new ProfessorReview(reviewContent.professor[0], reviewContent._id);
               profList.push(reviewContent.professor[0]);
            });
         },
         complete: callback(profList);
      });

   }

   function sortProfessorReviewIDs(profList) {
      var conciseProfList = [];
      for (var i = 0; i < profList.length; i++) {
         if (conciseProfList.indexOf(profList[i]) == -1 && profList[i] != undefined) {
            conciseProfList[i] = profList[i];
         }
      }
      createProfessorSections(conciseProfList);
   }*/

   function sortProfessors(reviewList) {
      var myMap = new Map();
      var professorName;
      var singleReview;
      var valueArray;

      for (var i = 0; i < reviewList.length; i++) {
         professorName = reviewList[i].professor;
         singleReview = reviewList[i];
         //console.log(singleReview);
         if (myMap.get(professorName) != undefined) {
            myMap.get(professorName).push(singleReview);
         }

         else {
            valueArray = [];
            valueArray.push(professorName);
            myMap.set(professorName, valueArray);
            myMap.get(professorName).push(singleReview);

         }
      }

      iterateOverProfessors(myMap);
   }

   function iterateOverProfessors(myMap) {
      for (var [key, value] of myMap) {
         if(value.length > 1)
          if (key != "NO NAME") {
          setReviewView(value, key);
          }
      }
   }

   /*function createProfessorSections(profList, callback) {
      for (var i = 0; i < profList.length; i++) {
         getProfessorReviews(profList[i], setReviewView);
      }
   }

   function getProfessorReviews(profId, callback) {
      var pathname = window.location.pathname;
      var professorName;
      var review;
      var single;
      reviewList = [];
      $.getJSON(pathname + "/reviews/" + profId, function(data) {
         professorName = data.professor_name;
         $.each(data.reviews, function(n, val) {
            review = val;
            //review = reviewContent.reviews;
            single = new singleReview(review.class, data.professor_name, review.grade, review.review,
               review.rating, review.timeAgo, review.user, review.upvotes, review.downvotes, review.tag);
            reviewList.push(single);
         });
      }, "json").done(function() {
         callback(reviewList, professorName);
      });

   }

   function getProfessorReviews(profId, callback) {

   }
*/

   function setReviewView(reviews, professorName) {
      var singleReview;
      var profSection;
      var profSectionName;
      var sectionLink;
      var createdReview;

      var departmentName;
      var rating;

      if(reviews[1] != null) {
        departmentName = getDepartmentAndRating(reviews[1].professorID)[0];
        rating = getDepartmentAndRating(reviews[1].professorID)[1];
      }

      this.reviews.push(reviews);

      //console.log("HERE -- making reviews for " + professorName);

      ratingDiv = document.createElement("div");
      $(ratingDiv).addClass("ratingContainer").attr("id", rating);
      $(ratingDiv).text(rating);

      profSection = document.createElement("div");
      $(profSection).addClass("professorReviewSection").attr("id", professorName);

      profSectionName = document.createElement("div");
      $(profSectionName).addClass("professorReviewSectionName");

      department = document.createElement("div");
      $(department).addClass("departmentContainer").attr("id", rating);
      $(department).text(departmentName);
      //$(department).append(profSectionName)

      sectionLink = document.createElement("a");
      $(sectionLink).attr("name", professorName).attr("id", "reviewLinkHeader").text(professorName);
      $(profSectionName).append(sectionLink);

      $(profSection).append(profSectionName);
      //$(profSection).append(department);

      var br = document.createElement('br');

      $(profSectionName).append(br);
      $(profSectionName).append(department);
      $(department).append(ratingDiv)

      $('.classSideBar').append($(profSectionName));
      //$('.reviewSection').append(profSection);
      var reviewCollection = $('ul.list-group#reviewsContainer');
      for (var i = 0; i < reviews.length; i++) {
         singleReview = reviews[i];

         createdReview = createSingleReview(singleReview);

         if ($(profSection).attr("id") == singleReview.professor) {
            //$(profSection).append(createdReview);
            profSection.append(createdReview);
         }

      }

      $(reviewCollection).append(profSection);

   }

   function getDepartmentAndRating(professorID){
      var array = new Object();
      var department = null;
      var rating = null;
      console.log(professorID);
      if(professorID != undefined) {

        $.ajax({
           dataType : "json",
           url      : pathname + "/" + professorID + "/getDepartmentAndRating",
           async    : false,
           success  : function(data){
             array[0] = data.department;
             array[1] = data.rating;
             //console.log(name);
           }
        });
      }
      return array;
   }




/*
   function creaetRobustSingleReview(review) {


      var title = document.createElement("div");
      $(title).addClass("tile");


      var description = document.createElement("div");
      $(description).addClass("description").addClass("classReviewContent").attr("id", "rating").text(review[0].review);

      var content = document.createElement("div");
      $(content).addClass("content").attr("id", "reviewTextContainer");
      $(content).append(description);

      var reviewTagVoteContainer = document.createElement("div");
      $(reviewTagVoteContainer).addClass("reviewTagVoteContainer");




      var lowerContentContainer = document.createElement("div");
      $(lowerContentContainer).addClass("lowerContentContainer");
      $(lowerContentContainer).append(content);
   }*/

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
         var datePosted = new Date(review.absTime);
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


  $('a.ui.button#calculate').click(function() {

    var percent1 = convert(document.GradeCalc.Percent1.value);
  	var percent2 = convert(document.GradeCalc.Percent2.value);
  	var percent3 = convert(document.GradeCalc.Percent3.value);
  	var percent4 = convert(document.GradeCalc.Percent4.value);
  	var percent5 = convert(document.GradeCalc.Percent5.value);
  	var extraCredit = convert(document.GradeCalc.Percent6.value);



  	TotalPercent = percent1 + percent2 + percent3 + percent4 + percent5;
    var result = TotalPercent.toString() + "%";

  	document.GradeCalc.TotalPercent.value = result;

  	var g1 = convert(document.GradeCalc.Grade1.value);
  	var g2 = convert(document.GradeCalc.Grade2.value);
  	var g3 = convert(document.GradeCalc.Grade3.value);
  	var g4 = convert(document.GradeCalc.Grade4.value);
  	var g5 = convert(document.GradeCalc.Grade5.value);
  	var extraCredit_grade = convert(document.GradeCalc.Grade6.value);


  	var FinalGrade = ((g1 * percent1 / 100) + (g2 * percent2 / 100) + (g3 * percent3 / 100) + (g4 * percent4 / 100) + (g5 * percent5 / 100) + (extraCredit_grade * extraCredit / 100)) * 100 / TotalPercent;
    FinalGrade = FinalGrade.toFixed(1);
    var result = FinalGrade.toString() + "%";
  	document.GradeCalc.Grade.value = result;

  });

  function convert(input)
  {
  	if (input == "")
  		return 0;
  	else
  		return parseFloat(input);
  }



/*
   function setReviewView(reviews) {
      var reviewCollection = $('ul.list-group#reviewCollection');
      var current = "", lowerContent = "";
      var singleReview;
      var professorSections;

      for (var i = 0; i < reviews.length; i++) {
         var deleteContent = "";
         var lowerCotent = "";
         var reviewVotingCotent = "";
         var imageStyle = "";
         var rating = "";
         singleReview = reviews[i];

         if (singleReview.rating == "PR") {
            imageStyle = "style='border-radius:0px'";
            current = "<a class='list-group-item reviewSectionPosts'><div class='title'><div class='right'><div id='user' class='header'>"+singleReview.user+"</div><div id='reviewTime' class='header'>"+singleReview.timeAgo+"</div></div><div class='left'><img id='circle' src='/misc/work/ratingColors/"+singleReview.rating+".png' "+imageStyle+"/></div><div id='rating' class='header'>PolyRating Review</div><div id='rating' class='header'>Grade Received: "+singleReview.grade+"</div></div><div class='lowerContentContainer'><div id='reviewTextContainer' class='content'><div class='description classReviewContent'>"+singleReview.review+"</div></div><div class='reviewTagVoteContainer'>"+reviewVotingCotent+"</div>"+deleteContent+"</div></a>";
         } else {
            current = "<a class='list-group-item reviewSectionPosts'><div class='title'><div class='right'><div id='user' class='header'>"+singleReview.user+"</div><div id='reviewTime' class='header'>"+singleReview.timeAgo+"</div></div><div class='left'><img id='circle' src='/misc/work/ratingColors/"+singleReview.rating+".png' "+imageStyle+"/></div><div id='rating' class='header'>"+singleReview.rating+"</div><div id='rating' class='header'>Grade Received: "+singleReview.grade+"</div></div><div class='lowerContentContainer'><div id='reviewTextContainer' class='content'><div class='description classReviewContent'>"+singleReview.review+"</div></div><div class='reviewTagVoteContainer'>"+reviewVotingCotent+"</div>"+deleteContent+"</div></a>";
         }

         var output = $("div.professorReviewSectionName:contains(" + singleReview.professor + ")").parent();
         console.log(output);
         $("div.professorReviewSectionName:contains(" + singleReview.professor + ")").parent().append(current);
         if ($("div.professorReviewSectionName").text().indexOf(singleReview.professor) != -1) {
            $("div.classReviewSectionName:contains("+singleReview.className+")").parent().append(current);
         }

      }

      $(".professorReviewSection").each(function() {
         var count = $(this).children().length;
         if (count == 2) {
            $(this).find("div.noReviewsText").show();
         }
      });

   }*/


   //getReviews(pathname, sortProfessors);

//   $('.professorLink').localScroll({duration:2000});






});
