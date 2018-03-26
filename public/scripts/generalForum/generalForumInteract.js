$( document ).ready(function() {

   /* START OF RIGHT SIDE CONTENT LOADING */
   /*function getPostComments(post_id, callback) {
      var pathname = window.location.pathname;
      var commentList = [];
      $.getJSON(pathname + "/" + post_id, function(data) {
         console.log("Inside the getJSON");
         $.each(data, function(n, val) {
            console.log(val);
            commentList.push(val);
         });
      }, "json").done( function(){
         console.log("Done with the getJSON");
         console.log(commentList);
         callback(commentList);
      });

   };*/

   /*function displayPostComments(commentList) {
      var commentSection = $('#commentSectionContainer');
      for (var i = 0; i < commentList.length; i++) {
         var commentContainer = document.createElement("div");
         $(commentContainer).addClass("commentContainer");


         var commentID = document.createElement("span");
         $(commentID).attr("id", "commmentID").text(commentList[i]._id).css("display", "none");

         var highLevelCommentContainer = document.createElement("div");
         $(highLevelCommentContainer).addClass("highLevelCommentContainer").add("comment");

         contentList = getCommentContent(commentList[i]);
         detailContent = contentList[1];
         textContent = contentList[0];

         //var replyButton = document.createElement("span");
         //$(replyButton).addClass("commentReplyButton");
         //$(replyButton).text("reply");
         //$(replyButton).click(function(e) {
            //console.log("Hello");
            //$(this).children('.commentReplyForm').show();
         //});

         var divider1 = document.createElement("span");
         $(divider1).text("-");
         $(divider1).attr("id", "separator");

         detailContent.append(divider1);
         //detailContent.append(replyButton);

         // Div container for text and details content
         var mainContentContainer = document.createElement("span");
         $(mainContentContainer).addClass("mainContentContainer");

         mainContentContainer.append(textContent);
         mainContentContainer.append(detailContent);

         // Div for upvote/downvote
         var voteContainer = document.createElement("span");
         $(voteContainer).addClass("voteContainer");


         var commentReplyForm = createCommentReplyForm();

         highLevelCommentContainer.append(voteContainer);
         highLevelCommentContainer.append(mainContentContainer);
         highLevelCommentContainer.append(commentReplyForm);
         // GET SUB COMMENTS

         subCommentsContainer = tComments(commentList[i]._id, displayPostSubcomments);
         commentContainer.append(highLevelCommentContainer);
         if (subCommentsContainer != undefined) {
            commentContainer.append(subCommentsContainer);
         }
         commentSection.append(commentContainer);
      }


   }*/

   /*
   $(document.body).on('click', 'span.commentReplyButton',function() {
      $('span.commentReplyInput').find('form.commentReplyForm').show();
   });*/

   /*function createCommentReplyForm() {
      var commentReplyInput = document.createElement("textarea");
      var comment_id = $(this).find('#commentID').text();
      $(commentReplyInput).addClass('postContentInput').attr("action", "/general-forum/"+comment_id+"/post").attr("id", "commentInput").attr("name", "content").attr("form", "generalPost3").attr("placeholder", "Write a reply...").prop("required", true);

      var commentReplyForm = document.createElement("form");
      $(commentReplyForm).attr("id", "generalPost3").attr("method", "post").addClass("commentReplyForm").addClass("commentInputForm");

      var submitButton = document.createElement("button");
      $(submitButton).attr("type", "submit").attr("form", "generalPost3").addClass("btn").addClass("btn-primary").text("Submit");

      var cancelButton = document.createElement("button");
      $(cancelButton).addClass("btn").addClass("btn-primary").attr("id", "replyCancel").text("Cancel").on('click', function() {
         $('.commentReplyForm').hide();
      });;


      var fieldset1 = document.createElement("fieldset");
      $(fieldset1).addClass("form-group");

      var fieldset2 = document.createElement("fieldset");
      $(fieldset2).addClass("form-group");

      fieldset1.append(commentReplyInput);
      fieldset2.append(submitButton);
      fieldset2.append(cancelButton);

      commentReplyForm.append(fieldset1);
      commentReplyForm.append(fieldset2);
      //$(commentReplyForm).css("display", "none");
      return commentReplyForm;
   } */


   /*function displayPostSubcomments(commentList) {
      var subCommentsContainer = document.createElement("div");
      $(subCommentsContainer).addClass("subCommentsContainer");
      for (var i = 0; i < commentList.length; i++) {
         var subComment = document.createElement("div");
         $(subComment).addClass("subComment")

         contentList = getCommentContent(commentList[i]);
         detailContent = contentList[1];
         textContent = contentList[0];

         //Div container for text and details content
         var mainContentContainer = document.createElement("span");
         $(mainContentContainer).addClass("mainContentContainer");

         mainContentContainer.append(textContent);
         mainContentContainer.append(detailContent);

         // Div for upvote/downvote
         var voteContainer = document.createElement("span");
         $(voteContainer).addClass("voteContainer");

         subComment.append(voteContainer);
         subComment.append(mainContentContainer);


         subCommentsContainer.append(subComment);
      }

      return subCommentsContainer;


   }*/


   /*function getCommentContent(commentObject) {
      // Div for text content
      var textContent = document.createElement("div");
      $(textContent).addClass("commentTextContent");
      $(textContent).text(commentObject.content);

      // Div for comment detail content
      var detailContent = document.createElement("div");
      $(detailContent).addClass("postDetails");

      var author = document.createElement("span");
      $(author).attr("id", "commentAuthor");
      $(author).text(commentObject.name);

      detailContent.append(author);

      var divider = document.createElement("span");
      $(divider).text("-");
      $(divider).attr("id", "separator");

      detailContent.append(divider);

      var timeContainer = document.createElement("span");
      $(timeContainer).attr("id", "commentTimeContainer");

      var time = document.createElement("span");
      $(time).attr("id", "timeData");

      var timeDescription = document.createElement("span");
      $(timeDescription).attr("id", "timeDescription");
      var dateFormat = obtainDateFormat(new Date(commentObject.absTime));

      if (dateFormat[1] == true) {
         $(timeDescription).text("hours ago");
      }

      $(time).text(dateFormat[0]);
      timeContainer.append(time);
      timeContainer.append(timeDescription);
      detailContent.append(timeContainer);

      return [textContent, detailContent];

   }*/

   /* START OF MOBILE OPTIMIZATION */
   if ($( window ).width() <= 850) {
      $('section.forum').css("width", "100%");
      $('span.commentsLink').hide();
      $('section.forumPost').css("display", "none").css("width", "100%");
      $('span.postContent').css({"width": "95%", "padding-right": "5px"});
      $('#closeIconContainer').hide();

      $('div.postCountNum').css({"font-size": "30px", "top": "40%"});
      $('div.postCount').css({"font-size": "16px", "top": "65%"});


      $(".forumPostBody").click(function(){
         $('section.forum').hide();
         $('section.forumPost').show();
         $('#backButton').show();

      });

      $("span#closeSidebarIcon").click(function() {
         $('section.forumPost').hide();
         $('section.forum').show();
      });
   }

   $('#backButton').click(function() {
      $('section.forumPost').hide();
      $('section.forum').show();
   });
   /* END OF MOBILE OPTIMIZATION */


   function obtainDateFormat(date) {
      var HOUR_PER_MILLISECOND = .00000027778;
      var MINUTES_PER_HOUR = 60;
      var currentTime = new Date().getTime();
      var diff = currentTime - date.getTime();
      var hoursPassed = diff * HOUR_PER_MILLISECOND;
      if (hoursPassed > 24) {
         return [date.toLocaleDateString(), "", false];
      }
      else if (hoursPassed < 1) {
         var minutes = hoursPassed * MINUTES_PER_HOUR;
         if (minutes < 1) {
            return ["right now", "", false];
         }
         else {
            return [Math.floor(minutes) / 1, "minutes ago", true];

         }
      }
      else {
         return [Math.floor(hoursPassed / 1), "hours ago", true];
      }
   }
   /* END OF RIGHT SIDE CONTENT LOADING */


   /* START OF PAGE TAB IMPLEMENTATION */
   $('ul.nav.nav-tabs.mainNav li a').click(function(e) {
      e.preventDefault();
      if ($(this).parent().attr("class") != "active") {
         //update post information
         getPosts(pathname, display);

         var activeTab = $('li.active').children().attr('href');

         //remove categories if switching to another tab
         if(activeTab === "#categories") {
             removeChildren($(activeTab));
         }
         else if(activeTab === "#myPosts") {
            removeChildren($(activeTab));
         }

         $('li.active').removeClass('active');
         $(activeTab).removeClass('in active');

         $(this).parent().addClass('active');

         var newActive = $(this).attr('href');
         $(newActive).addClass('in active');

         //handle categories
         if(newActive === "#categories") {
             displayCategories($(newActive));
         }
         else if (newActive === "#myPosts") {
            //displayMyPosts();
         }

      }

   });
   /* END OF PAGE TAB IMPLEMENTATION */

   /* START OF MY POSTS IMPLEMENTATION */
   function getMyPosts(post_id, callback) {
      var pathname = window.location.pathname;
      var myPost;
      $.getJSON(pathname + "/" + post_id + "/info", function(data) {
         myPost = data;
      }, "json").done(function() {
         callback(myPost);
      });

   };

   function displayMyPosts() {
      $('.myPostsContainer').show();
      console.log("displaying my posts");
      //$('.myPostsContainer').children().each(function() {
         //var post_id = $(this).find('span#postID').text();
         /*getMyPosts(post_id, function(myPost) {
            console.log(myPost);
         });*/
      //});

   }

   /* $("#generalPost").on("submit", function() {

     var content = $("#newPostInput").val();
     var anon = $("#anonymousPost").val();
     {
        // AJAX Code To Submit Form.
        $.ajax({
            type: "POST",
            url: "general-forum/post",
            data: {content: content, anon: anon},
            cache: false,
            success: function(result){
                window.location = "/general-forum";
            }
       });
     }
     return false;
   });
   */

   $('span.glyphicon.glyphicon-chevron-up#alreadyVoted')
   .mouseover(function() {
      $(this).parent().siblings('span.voteNotification#upCount').css("display", "inline-block");
   })
   .mouseout(function() {
      $(this).parent().siblings('span.voteNotification#upCount').css("display", "none");
   });


   $('span.glyphicon.glyphicon-chevron-up#upvote')
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

   $('span.glyphicon.glyphicon-chevron-down#alreadyVoted')
   .mouseover(function() {
      $(this).parent().siblings('span.voteNotification#downCount').css("display", "inline-block");
   })
   .mouseout(function() {
      $(this).parent().siblings('span.voteNotification#downCount').css("display", "none");
   });


   $('span.glyphicon.glyphicon-chevron-down#downvote')
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

   /* END OF MY POSTS IMPLEMENTATION */

   /* START OF CATEGORY IMPLEMENTATION */
   function displayCategories(container) {
      //Categories text
      var categories = document.createElement("text");
      $(categories).text("Categories");
      categories.style.cssText = "position: relative; left: 10px; top: 10px; display: visible; font-size: 40px; font-family: Trebuchet MS; color: #6E6E6E;";
      container.append(categories);

      var greekLife = document.createElement("li");
      var clubs = document.createElement("li");
      var academics = document.createElement("li");

      var currentEvents = document.createElement("li");
      var media = document.createElement("li");
      var comedy = document.createElement("li");
      var strayThoughts = document.createElement("li");
      var classof2021 = document.createElement("li");


      $(greekLife).attr("id", "greekLife");
      $(clubs).attr("id", "clubs");
      $(academics).attr("id", "academics");

      $(currentEvents).attr("id", "currentEvents");
      $(media).attr("id", "media");
      $(comedy).attr("id", "comedy");
      $(strayThoughts).attr("id", "strayThoughts");
      $(classof2021).attr("id", "classof2021");

      //Category name and post count
      var greekLeftSection = document.createElement("div");
      var clubLeftSection = document.createElement("div");
      var acadLeftSection = document.createElement("div");

      var currentLeftSection = document.createElement("div");
      var mediaLeftSection = document.createElement("div");
      var comedyLeftSection = document.createElement("div");
      var strayThoughtsLeftSection = document.createElement("div");
      var classOf2021LeftSection = document.createElement("div");

      $(greekLeftSection).add(clubLeftSection).add(acadLeftSection).add(currentLeftSection).add(mediaLeftSection).add(comedyLeftSection).add(strayThoughtsLeftSection).add(classOf2021LeftSection).addClass("leftSection");

      //Actual category text
      var greekCatText = document.createElement("div");
      var clubCatText = document.createElement("div");
      var acadCatText = document.createElement("div");

      var currentCatText = document.createElement("div");
      var mediaCatText = document.createElement("div");
      var comedyCatText = document.createElement("div");

      var strayThoughtsCatText = document.createElement("div");
      var classof2021CatText = document.createElement("div");

      //$(greekLeftSection).add(clubLeftSection).add(acadLeftSection).addClass("categoryTitle");
      $(greekCatText).add(clubCatText).add(acadCatText).add(currentCatText).add(mediaCatText).add(comedyCatText).add(strayThoughtsCatText).add(classof2021CatText).addClass("categoryTitle");

      $(greekCatText).text("Greek Life");
      $(clubCatText).text("Clubs");
      $(acadCatText).text("Academics");

      $(currentCatText).text("Current Events");
      $(mediaCatText).text("Media");
      $(comedyCatText).text("Comedy");
      $(strayThoughtsCatText).text("Stray Thoughts");
      $(classof2021CatText).text("Class of 2021");


      $(greekLeftSection).append(greekCatText);
      $(clubLeftSection).append(clubCatText);
      $(acadLeftSection).append(acadCatText);

      $(currentLeftSection).append(currentCatText);
      $(mediaLeftSection).append(mediaCatText);
      $(comedyLeftSection).append(comedyCatText);
      $(strayThoughtsLeftSection).append(strayThoughtsCatText);
      $(classOf2021LeftSection).append(classof2021CatText);

      //Post count
      var gPostCount = document.createElement("div");
      var cPostCount = document.createElement("div");
      var aPostCount = document.createElement("div");

      var cePostCount = document.createElement("div");
      var mPostCount = document.createElement("div");
      var comPostCount = document.createElement("div");
      var stPostCount = document.createElement("div");
      var c021PostCount = document.createElement("div");

      $(gPostCount).add(cPostCount).add(aPostCount).add(cePostCount).add(mPostCount).add(comPostCount).add(stPostCount).add(c021PostCount).addClass("postCount");

      var gPostCountNum = document.createElement("div");
      var cPostCountNum = document.createElement("div");
      var aPostCountNum = document.createElement("div");

      var cePostCountNum = document.createElement("div");
      var mPostCountNum = document.createElement("div");
      var comPostCountNum = document.createElement("div");
      var stPostCountNum = document.createElement("div");
      var c021PostCountNum = document.createElement("div");

      $(gPostCountNum).add(cPostCountNum).add(aPostCountNum).add(cePostCountNum).add(mPostCountNum).add(comPostCountNum).add(stPostCountNum).add(c021PostCountNum).addClass("postCountNum");


      if ($( window ).width() <= 850) {
         $(gPostCountNum).add(cPostCountNum).add(aPostCountNum).add(cePostCountNum).add(mPostCountNum).add(comPostCountNum).add(stPostCountNum).add(c021PostCountNum).css({"font-size": "30px", "top": "40%"});
         $(gPostCount).add(cPostCount).add(aPostCount).add(cePostCount).add(mPostCount).add(comPostCount).add(stPostCount).add(c021PostCount).css({"font-size": "16px", "top": "65%"});
      }


      /*var time = postsReady==-1 ? 200 : 0;

      setTimeout(function() {
        $(gPostCountNum).text(getPostCount("greekLife"));
        $(cPostCountNum).text(getPostCount("clubs"));
        $(aPostCountNum).text(getPostCount("academics"));
      }, time);*/

      $(gPostCount).add(cPostCount).add(aPostCount).add(cePostCount).add(mPostCount).add(comPostCount).add(stPostCount).add(c021PostCount).text("Topics");

      $(greekLeftSection).append(gPostCount, gPostCountNum);
      $(clubLeftSection).append(cPostCount, cPostCountNum);
      $(acadLeftSection).append(aPostCount, aPostCountNum);

      $(currentLeftSection).append(cePostCount, cePostCountNum);
      $(mediaLeftSection).append(mPostCount, mPostCountNum);
      $(comedyLeftSection).append(comPostCount, comPostCountNum);
      $(strayThoughtsLeftSection).append(stPostCount, stPostCountNum);
      $(classOf2021LeftSection).append(c021PostCount, c021PostCountNum);

      //Expand/collapse category + other possible uses
      var greekRightSection = document.createElement("div");
      var clubRightSection = document.createElement("div");
      var acadRightSection = document.createElement("div");

      var currentRightSection = document.createElement("div");
      var mediaRightSection = document.createElement("div");
      var comedyRightSection = document.createElement("div");
      var strayThoughtsRightSection = document.createElement("div");
      var classOf2021RightSection = document.createElement("div");

      $(greekRightSection).add(clubRightSection).add(acadRightSection).add(currentRightSection).add(mediaRightSection).add(comedyRightSection).add(strayThoughtsRightSection).add(classOf2021RightSection).addClass("rightSection");

      //Expand collapse icons
      var currentButton = "expand";
      var expand = 'url("https://i.imgur.com/3TlGBev.png")';
      var collapse = 'url("https://i.imgur.com/Kd1r7JS.png")';
      var expandCollapse = document.createElement("div");
      $(expandCollapse).attr('id', 'expandcollapse');

      $(expandCollapse).css('background-image', expand);

      if ($( window ).width() <= 850) {
         $(expandCollapse).css({"background-size": "35px", "margin-top": "10px"});
      }

      $(expandCollapse).click(function(e) {
         if($(this).css('background-image')===expand) {
             $(this).css('background-image', collapse);
             expandCategory($(this).parent().parent().attr('id'));
         } else {
             $(this).css('background-image', expand);
             collapseCategory($(this).parent().parent().attr('id'));
         }
      });

      $(greekRightSection).add(clubRightSection).add(acadRightSection).add(currentRightSection).add(mediaRightSection).add(comedyRightSection).add(strayThoughtsRightSection).add(classOf2021RightSection).append(expandCollapse);

      $(greekLife).append(greekLeftSection, greekRightSection);
      $(clubs).append(clubLeftSection, clubRightSection);
      $(academics).append(acadLeftSection, acadRightSection);

      $(currentEvents).append(currentLeftSection, currentRightSection);
      $(media).append(mediaLeftSection, mediaRightSection);
      $(comedy).append(comedyLeftSection, comedyRightSection);

      $(strayThoughts).append(strayThoughtsLeftSection, strayThoughtsRightSection);
      $(classof2021).append(classOf2021LeftSection, classOf2021RightSection);

      var allCategories = $(greekLife).add(clubs).add(academics).add(currentEvents).add(media).add(comedy).add(strayThoughts).add(classof2021);
      allCategories.addClass("list-unstyled category");
      container.append(allCategories);

      //dynamically resizing text
      /*var textSize = (greekLife.clientHeight-8) >= 30 ? "30px" : (greekLife.clientHeight-8) <= 12 ? "12px" : (greekLife.clientHeight-8)+"px";
      $(greekCatText).add(clubCatText).add(acadCatText).css("font-size", textSize);
      $(gPostCount).add(cPostCount).add(aPostCount).css("font-size", parseInt(textSize)/2+"px");
      $(gPostCount).add(cPostCount).add(aPostCount).css("top", "85%");

      $(window).resize(function(e) {
          textSize = textSize = (greekLife.clientHeight-8) >= 30 ? "30px" : (greekLife.clientHeight-8) <= 12 ? "12px" : (greekLife.clientHeight-8)+"px";
          $(greekCatText).add(clubCatText).add(acadCatText).css("font-size", textSize);
          $(gPostCount).add(cPostCount).add(aPostCount).css("font-size", parseInt(textSize)/2+"px");
          $(gPostCount).add(cPostCount).add(aPostCount).css("top", "85%");
      });*/
   }

   function removeChildren(container) {
       container.empty();
   }

   function expandCategory(category) {
      var parent = $('#'+category);
      var container = document.createElement('li');
      $(container).addClass('clonePosts');
      $(parent).append(container);

      if(category==="greekLife") {
          var greekPosts = filterPosts("greekLife");
          var clones = [];

          for(i=0; i<greekPosts.length; i++) {
              var tmp = $(greekPosts)[i].clone();
              clones.push(tmp);
          }
          $(container).append(clones);
          console.log(clones.length*185+5);
          $('#clubs').css('top', '+='+(clones.length*85+5)+'px');
          $('#academics').css('top', '+='+(clones.length*85+5)+'px');

          $('#currentEvents').css('top', '+='+(clones.length*85+5)+'px');
          $('#media').css('top', '+='+(clones.length*85+5)+'px');
          $('#comedy').css('top', '+='+(clones.length*85+5)+'px');
          $('#strayThoughts').css('top', '+='+(clones.length*85+5)+'px');
          $('#classof2021').css('top', '+='+(clones.length*85+5)+'px');


      } else if(category==="clubs") {
          var clubPosts = filterPosts("clubs");
          var clones = [];

          for(i=0; i<clubPosts.length; i++) {
              var tmp = $(clubPosts)[i].clone();
              clones.push(tmp);
          }
          $(container).append(clones);

          $('#academics').css('top', '+='+(clones.length*85+5)+'px');
          $('#currentEvents').css('top', '+='+(clones.length*85+5)+'px');
          $('#media').css('top', '+='+(clones.length*85+5)+'px');
          $('#comedy').css('top', '+='+(clones.length*85+5)+'px');
          $('#strayThoughts').css('top', '+='+(clones.length*85+5)+'px');
          $('#classof2021').css('top', '+='+(clones.length*85+5)+'px');

      } else if(category==="academics") {
          var acadPosts = filterPosts("academics");
          var clones = [];

          for(i=0; i<acadPosts.length; i++) {
              var tmp = $(acadPosts)[i].clone();
              clones.push(tmp);
          }
          $(container).append(clones);

          $('#currentEvents').css('top', '+='+(clones.length*85+5)+'px');
          $('#media').css('top', '+='+(clones.length*85+5)+'px');
          $('#comedy').css('top', '+='+(clones.length*85+5)+'px');
          $('#strayThoughts').css('top', '+='+(clones.length*85+5)+'px');
          $('#classof2021').css('top', '+='+(clones.length*85+5)+'px');

      } else if(category==="currentEvents") {
          var currentPosts = filterPosts("currentEvents");
          var clones = [];

          for(i=0; i<currentPosts.length; i++) {
              var tmp = $(currentPosts)[i].clone();
              clones.push(tmp);
          }

          $('#media').css('top', '+='+(clones.length*85+5)+'px');
          $('#comedy').css('top', '+='+(clones.length*85+5)+'px');
          $('#strayThoughts').css('top', '+='+(clones.length*85+5)+'px');
          $('#classof2021').css('top', '+='+(clones.length*85+5)+'px');

          $(container).append(clones);
      } else if(category==="media") {
          var mediaPosts = filterPosts("media");
          var clones = [];

          for(i=0; i<mediaPosts.length; i++) {
              var tmp = $(mediaPosts)[i].clone();
              clones.push(tmp);
          }

          $('#comedy').css('top', '+='+(clones.length*85+5)+'px');
          $('#strayThoughts').css('top', '+='+(clones.length*85+5)+'px');
          $('#classof2021').css('top', '+='+(clones.length*85+5)+'px');
          $(container).append(clones);
      } else if(category==="comedy") {
          var comedyPosts = filterPosts("comedy");
          var clones = [];

          for(i=0; i<comedyPosts.length; i++) {
              var tmp = $(comedyPosts)[i].clone();
              clones.push(tmp);
          }

          $('#strayThoughts').css('top', '+='+(clones.length*85+5)+'px');
          $('#classof2021').css('top', '+='+(clones.length*85+5)+'px');
          $(container).append(clones);
      } else if(category==="strayThoughts") {
          var strayPosts = filterPosts("strayThoughts");
          var clones = [];

          for(i=0; i<strayPosts.length; i++) {
              var tmp = $(strayPosts)[i].clone();
              clones.push(tmp);
          }


          $('#classof2021').css('top', '+='+(clones.length*85+5)+'px');
          $(container).append(clones);

      } else if(category==="classof2021") {
          var freshmenPost = filterPosts("classof2021");
          var clones = [];

          for(i=0; i<freshmenPost.length; i++) {
              var tmp = $(freshmenPost)[i].clone();
              clones.push(tmp);
          }
          $(container).append(clones);
      }

      $('.forumPostBody').click(function(e) {
         if ($( window ).width() <= 850) {
            $('section.forum').hide();
            $('section.forumPost').show();
            $('#backButton').show();
         }
         var postID = $(this).find("#postID").text();
         showRightSideItems();
         var post = getPost(postID);
         displayPostInfo(post);
         var comments = getPostComments(postID);
         displayCommentsInfo(comments);

      });
   }

   function collapseCategory(category) {
      var parent = $('#'+category);
      var postsRemoved = 0;

      if(category==="greekLife") {
          for(i=0; i<$(parent).children().length; i++) {
              var currentPost = $(parent).children()[i];

              if($(currentPost).attr('class')==='clonePosts') {
                  parent[0].removeChild(currentPost);
                  postsRemoved = currentPost.children.length;
              }
          }

          $('#clubs').css('top', '-='+(postsRemoved*85+5)+'px');
          $('#academics').css('top', '-='+(postsRemoved*85+5)+'px');

          $('#currentEvents').css('top', '-='+(postsRemoved*85+5)+'px');
          $('#media').css('top', '-='+(postsRemoved*85+5)+'px');
          $('#comedy').css('top', '-='+(postsRemoved*85+5)+'px');
          $('#strayThoughts').css('top', '-='+(postsRemoved*85+5)+'px');
          $('#classof2021').css('top', '-='+(postsRemoved*85+5)+'px');


      } else if(category==="clubs") {
          for(i=0; i<$(parent).children().length; i++) {
              var currentPost = $(parent).children()[i];

              if($(currentPost).attr('class')==='clonePosts') {
                  parent[0].removeChild(currentPost);
                  postsRemoved = currentPost.children.length;
              }
          }

          $('#academics').css('top', '-='+(postsRemoved*85+5)+'px');
          $('#currentEvents').css('top', '-='+(postsRemoved*85+5)+'px');
          $('#media').css('top', '-='+(postsRemoved*85+5)+'px');
          $('#comedy').css('top', '-='+(postsRemoved*85+5)+'px');
          $('#strayThoughts').css('top', '-='+(postsRemoved*85+5)+'px');
          $('#classof2021').css('top', '-='+(postsRemoved*85+5)+'px');
      } else if(category==="academics") {
          for(i=0; i<$(parent).children().length; i++) {
              var currentPost = $(parent).children()[i];

              if($(currentPost).attr('class')==='clonePosts') {
                  parent[0].removeChild(currentPost);
                  postsRemoved = currentPost.children.length;
              }
          }
          $('#currentEvents').css('top', '-='+(postsRemoved*85+5)+'px');
          $('#media').css('top', '-='+(postsRemoved*85+5)+'px');
          $('#comedy').css('top', '-='+(postsRemoved*85+5)+'px');
          $('#strayThoughts').css('top', '-='+(postsRemoved*85+5)+'px');
          $('#classof2021').css('top', '-='+(postsRemoved*85+5)+'px');

      } else if(category==="currentEvents") {
          for(i=0; i<$(parent).children().length; i++) {
              var currentPost = $(parent).children()[i];

              if($(currentPost).attr('class')==='clonePosts') {
                  parent[0].removeChild(currentPost);
                  postsRemoved = currentPost.children.length;
              }
          }
          $('#media').css('top', '-='+(postsRemoved*85+5)+'px');
          $('#comedy').css('top', '-='+(postsRemoved*85+5)+'px');
          $('#strayThoughts').css('top', '-='+(postsRemoved*85+5)+'px');
          $('#classof2021').css('top', '-='+(postsRemoved*85+5)+'px');

      } else if(category==="media") {
          for(i=0; i<$(parent).children().length; i++) {
              var currentPost = $(parent).children()[i];

              if($(currentPost).attr('class')==='clonePosts') {
                  parent[0].removeChild(currentPost);
                  postsRemoved = currentPost.children.length;
              }
          }

          $('#comedy').css('top', '-='+(postsRemoved*85+5)+'px');
          $('#strayThoughts').css('top', '-='+(postsRemoved*85+5)+'px');
          $('#classof2021').css('top', '-='+(postsRemoved*85+5)+'px');

      } else if(category==="comedy") {
          for(i=0; i<$(parent).children().length; i++) {
              var currentPost = $(parent).children()[i];

              if($(currentPost).attr('class')==='clonePosts') {
                  parent[0].removeChild(currentPost);
                  postsRemoved = currentPost.children.length;
              }
          }

          $('#strayThoughts').css('top', '-='+(postsRemoved*85+5)+'px');
          $('#classof2021').css('top', '-='+(postsRemoved*85+5)+'px');

      } else if(category==="strayThoughts") {
          for(i=0; i<$(parent).children().length; i++) {
              var currentPost = $(parent).children()[i];

              if($(currentPost).attr('class')==='clonePosts') {
                  parent[0].removeChild(currentPost);
                  postsRemoved = currentPost.children.length;
              }
          }

          $('#classof2021').css('top', '-='+(postsRemoved*85+5)+'px');

      } else if(category==="classof2021") {
          for(i=0; i<$(parent).children().length; i++) {
              var currentPost = $(parent).children()[i];

              if($(currentPost).attr('class')==='clonePosts') {
                  parent[0].removeChild(currentPost);
                  postsRemoved = currentPost.children.length;
              }
          }
      }
   }

   function filterPosts(category) {
      var filteredPosts = [];

      if(postsReady != -1) {
        for(i=0; i<posts.length; i++) {
            if(posts[i].categories[0]===category)
               filteredPosts.push(posts[i]);
        }
      }

      var filteredPostObjects = [];
      var postIds = [];

      for(i=0; i<$('.forumPostBody').length; i++) {
          for(j=0; j<filteredPosts.length; j++) {
              if(filteredPosts[j]._id == $('.forumPostBody').eq(i).children('span').text() && postIds.indexOf(filteredPosts[j]._id) == -1) {
                  postIds.push(filteredPosts[j]._id);
                  filteredPostObjects.push($('.forumPostBody').eq(i));
              }
          }
      }
      return filteredPostObjects;
   }

   /* END OF CATEGORY IMPLEMENTATION */

   /* START OF DYNAMIC RESIZE */

   var divider = document.createElement("div");
   divider.id = "divider";
   var fp = document.getElementsByClassName("forumPost")[0];
   var tc = document.getElementsByClassName("tab-content")[0];

   fp.style.height = $(".tab-content").height()+"px";

   var height = document.getElementsByClassName("sidebarBackground")[0].clientHeight + document.getElementsByClassName("individualPostHeader")[0].clientHeight;
   divider.style.cssText = "background-color: #D6D6D6; position: absolute; visibility:visible; width: 5px; left:"+fp.offsetLeft+"px; height:"+height+"px;";
   divider.style.borderLeft = divider.style.borderRight = "1px groove #C9C9C9";
   document.body.appendChild(divider);

   $('div#divider').hover(function(e) {
       divider.style.cursor = "ew-resize";
   });

   var startx = -1;
   var dividerSelected = false;

   $('div#divider').mousedown(function(e) {
       dividerSelected = true;
       startx = e.clientX;

       //block selection
       document.body.style.cssText = "user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;";
   });

   $(document.body).mouseup(function(e) {
       if(dividerSelected) {
            dividerSelected = false;
            startx = -1;

            //allow selection
            document.body.style.cssText = "user-select: auto; -webkit-user-select: auto; -moz-user-select: auto; -ms-user-select: auto;";
       }
   });

   //25% of page width
   var minWidth = .25*document.body.clientWidth;

   //30% of page width
   var minWidthLeft = .45*document.body.clientWidth

   $(document.body).mousemove(function(e) {
        if(dividerSelected) {
            var diff = e.clientX - startx;
            var navMenu = document.getElementsByClassName("navCotent")[0];

            //dont allow to go past page right side -> set minwidth if it does
            if(document.body.clientWidth-e.clientX > minWidth && e.clientX > minWidthLeft) {
                fp.style.width = (document.body.clientWidth-e.clientX)+"px";
                tc.style.width = e.clientX+"px";
                navMenu.style.width = tc.style.width;
                divider.style.left = e.clientX+"px";
                fp.style.left = e.clientX+"px"; //position the forumpost
            } else if(e.clientX <= minWidthLeft) { //dont allow to go past page left side
                fp.style.width = (document.body.clientWidth-minWidthLeft)+"px";
                tc.style.width = minWidthLeft+"px";
                navMenu.style.width = tc.style.width;
                divider.style.left = tc.style.width;
                fp.style.left = tc.style.width;
            } else {
                fp.style.width = minWidth+"px";
                tc.style.width = (document.body.clientWidth-minWidth)+"px";
                navMenu.style.width = tc.style.width;
                divider.style.left = (document.body.clientWidth-minWidth)+"px";
                fp.style.left = (document.body.clientWidth-minWidth)+"px";
            }

        }
   });

   $(window).resize(function() {
       $('#divider').css('left', fp.offsetLeft);
       $('#divider').css('height', fp.clientHeight);
   });

   /* END OF DYNAMIC RESIZE */

   /* POST INFO */

   var pathname = window.location.pathname;
   var postsReady = -1;
   var posts;


   function getPostCount(category) {
       var count = 0;
       if(postsReady!=-1) {
          for(i=0; i<posts.length; i++){
              if(posts[i].categories[0].toLowerCase().indexOf(category.toLowerCase()) != -1) {
                  count++;
              }
          }
       }
       return count;
   }

   function getPosts(pathname, callback) {
      postsReady = -1;
      $.getJSON(pathname+"/JSONPosts", "json").done(function(data) {
         callback(data.generalPosts);
      });
   };

   function display(postInfo) {
       posts = postInfo;
       postsReady = 1;
       $('.postCountNum:eq(0)').text(getPostCount("greekLife"));
       $('.postCountNum:eq(1)').text(getPostCount("clubs"));
       $('.postCountNum:eq(2)').text(getPostCount("academics"));
       $('.postCountNum:eq(3)').text(getPostCount("currentEvents"));
       $('.postCountNum:eq(4)').text(getPostCount("media"));
       $('.postCountNum:eq(5)').text(getPostCount("comedy"));
       $('.postCountNum:eq(6)').text(getPostCount("strayThoughts"));
       $('.postCountNum:eq(7)').text(getPostCount("classof2021"));

   }

    getPosts(pathname, display);

    /* END OF POST INFO */

    // ------------------------------------ //
    // ------------------------------------ //
    // ------------------------------------ //

    // START OF generalForumCommentDisplay.js

   //On-click event listener
   var highlightedPost = null;

   $(".forumPostBody").click(function(){
      var postID = $(this).find("#postID").text();

      showRightSideItems();

      var post = getPost(postID);

      displayPostInfo(post);

      var comments = getPostComments(postID);

      displayCommentsInfo(comments);

   });

   $("span#closeSidebarIcon").click(hideRightSideItems);

   // Helper functions
   function displayCommentsInfo(comments) {
      var commentSectionContainer = $("div#commentSectionContainer");

      for (var i = 0; i < comments.length; i++){
         var comment = comments[i];
         var id = comment._id;

         var commentContainer          = document.createElement("div");
         $(commentContainer).addClass("commentContainer").attr("id", id);
         var commentID                 = document.createElement("span");
         $(commentID).addClass("commentID").attr("id", id).text(id).css("display", "none");
         var highLevelCommentContainer = document.createElement("div");
         $(highLevelCommentContainer).addClass("highLevelCommentContainer").attr("id", id);  //.add("comment");
         var voteContainer             = document.createElement("span");
         $(voteContainer).addClass("voteContainer").attr("id", id);
         var mainContentContainer      = document.createElement("span");
         $(mainContentContainer).addClass("mainContentContainer").attr("id", id);
         var commentTextContent        = document.createElement("div");
         $(commentTextContent).addClass("commentTextContent").attr("id", id).text(comment.content);

         var string = anchorme($(commentTextContent).html());
         $(commentTextContent).html(string);

         var commentDetails            = document.createElement("div");
         $(commentDetails).addClass("commentDetails").attr("id", id);
         var commentAuthor             = document.createElement("span");
         $(commentAuthor).addClass("commentAuthor").attr("id", id).text(comment.name);
         var separator_1               = document.createElement("span");
         $(separator_1).addClass("separator").text("-");
         var commentTimeContainer      = document.createElement("span");
         $(commentTimeContainer).addClass("commentTimeContainer").attr("id", id);
         var timeData                  = document.createElement("span");
         $(timeData).addClass("timeData").attr("id", id);
         var timeDescription           = document.createElement("span");
         $(timeDescription).addClass("timeDescription").attr("id", id);
         //var separator_2               = document.createElement("span");
         //$(separator_2).addClass("separator").text("-");

         var dateFormat = obtainDateFormat(new Date(comment.absTime));

         if (dateFormat[2] == true) {
            $(timeDescription).text(dateFormat[1]);
            $(timeData).text(dateFormat[0]);
            $(timeDescription).text("hours ago");
         }
         else {
            console.log("Not true");
            $(timeData).text(dateFormat[0]);
         }

         /*var commentReplyForm          = document.createElement("form");
         $(commentReplyForm).addClass("commentReplyForm").attr("id", id).attr("name", id).attr("action", "/general-forum/" + id + "/postsubcomment").attr("method", "post");
         var form_group_1              = document.createElement("fieldset");
         $(form_group_1).addClass("form-group").attr("id", id);
         var commentContentInput       = document.createElement("textarea");
         $(commentContentInput).addClass("commentContentInput").attr("id", id).attr("name", "content").attr("form", id).attr("placeholder", "Write a reply...").prop("required", true);
         var form_group_2              = document.createElement("fieldset");
         $(form_group_2).addClass("form-group").attr("id", id);
         var btn                       = document.createElement("button");
         $(btn).addClass("btn").addClass("btn-primary").attr("id", id).attr("form", id).attr("type", "submit").text("Submit");

         var subCommentContainer       = getSubCommentContainer(id);

         form_group_1.append(commentContentInput);
         form_group_2.append(btn);
         commentReplyForm.append(form_group_1);
         commentReplyForm.append(form_group_2);
         */
         commentTimeContainer.append(timeData);
         commentTimeContainer.append(timeDescription);

         commentDetails.append(commentAuthor);
         commentDetails.append(separator_1);
         commentDetails.append(commentTimeContainer);
         //commentDetails.append(separator_2);

         mainContentContainer.append(commentTextContent);
         mainContentContainer.append(commentDetails);

         highLevelCommentContainer.append(voteContainer);
         highLevelCommentContainer.append(mainContentContainer);
         //highLevelCommentContainer.append(commentReplyForm);

         commentContainer.append(commentID);
         commentContainer.append(highLevelCommentContainer);
         //commentContainer.append(subCommentContainer);

         commentSectionContainer.append(commentContainer);

      }

   }

   function getSubCommentContainer(commentID) {
      var subCommentSectionContainer = document.createElement("div");
      $(subCommentSectionContainer).addClass("subCommentSectionContainer").attr("id", commentID);

      subcomments = getSubComments(commentID);
      if (subcomments == null){
         $(subCommentSectionContainer).css("display", "none");
         return subCommentSectionContainer;
      }

      for (var i = 0; i < subcomments.length; i++){
         var subcomment = subcomments[i];
         var id = subcomment._id;

         var subCommentContainer          = document.createElement("div");
         $(subCommentContainer).addClass("subCommentContainer").attr("id", id);
         var subCommentID                 = document.createElement("span");
         $(subCommentID).addClass("subCommentID").attr("id", id).text(id).css("display", "none");
         var highLevelSubCommentContainer = document.createElement("div");
         $(highLevelSubCommentContainer).addClass("highLevelSubCommentContainer").attr("id", id);  //.add("comment");
         var voteContainer                = document.createElement("span");
         $(voteContainer).addClass("voteContainer").attr("id", id);
         var mainSubContentContainer      = document.createElement("span");
         $(mainSubContentContainer).addClass("mainSubContentContainer").attr("id", id);
         var subCommentTextContent        = document.createElement("div");
         $(subCommentTextContent).addClass("subCommentTextContent").attr("id", id).text(subcomment.content);
         var subCommentDetails            = document.createElement("div");
         $(subCommentDetails).addClass("subCommentDetails").attr("id", id);
         var subCommentAuthor             = document.createElement("span");
         $(subCommentAuthor).addClass("subCommentAuthor").attr("id", id).text(subcomment.name);
         var separator_1                  = document.createElement("span");
         $(separator_1).addClass("separator").text("-");
         var subCommentTimeContainer      = document.createElement("span");
         $(subCommentTimeContainer).addClass("subCommentTimeContainer").attr("id", id);
         var timeData                     = document.createElement("span");
         $(timeData).addClass("timeData").attr("id", id).text(subcomment.absTime);
         var timeDescription              = document.createElement("span");
         $(timeDescription).addClass("timeDescription").attr("id", id).text("placeholder");
         var separator_2                  = document.createElement("span");
         $(separator_2).addClass("separator").text("-");

         subCommentTimeContainer.append(timeData);
         subCommentTimeContainer.append(timeDescription);

         subCommentDetails.append(subCommentAuthor);
         subCommentDetails.append(separator_1);
         subCommentDetails.append(subCommentTimeContainer);
         subCommentDetails.append(separator_2);

         mainSubContentContainer.append(subCommentTextContent);
         mainSubContentContainer.append(subCommentDetails);

         highLevelSubCommentContainer.append(voteContainer);
         highLevelSubCommentContainer.append(mainSubContentContainer);

         subCommentContainer.append(subCommentID);
         subCommentContainer.append(highLevelSubCommentContainer);

         subCommentSectionContainer.append(subCommentContainer);
      }

      console.log(subCommentSectionContainer);
      return subCommentSectionContainer

   }

   function getPostComments(postID){
      var comments = null;

      $.ajax({
         dataType : "json",
         url      : window.location.pathname + "/" + postID,
         async    : false,
         success  : function(data){
            comments = data;
         }
      });

      return comments;
   }

   function getSubComments(commentID){
      var subcomments = null;

      $.ajax({
         dataType : "json",
         url      : window.location.pathname + "/" + commentID + "/subcomments",
         async    : false,
         success  : function(data){
            subcomments = data;
         }
      });

      return subcomments;
   }

   function getCategory(postCategory) {
      if (postCategory != "") {
         if (postCategory == "greekLife") {
            return "Greek Life"
         } else if (postCategory == "clubs") {
            return "Clubs"
         } else if (postCategory == "academics") {
            return "Academics"
         } else if (postCategory == "currentEvents") {
            return "Current Events"
         } else if (postCategory == "media") {
            return "Media"
         } else if (postCategory == "comedy") {
            return "Comedy"
         } else if (postCategory == "strayThoughts") {
            return "Stray Thoughts"
         } else if (postCategory == "classof2021") {
            return "Class of 2021"
         }
      }
   }

   function loadProfilePic(post, postAuthorPicContainer) {
      if (post.facebookProfileURL != null) {

         var profilePicContainer = document.createElement("span");
         $(profilePicContainer).addClass("profilePicContainer");

         if (post.facebookPicture != "anon") {
            var postAuthorPic = document.createElement("div");
            $(postAuthorPic).addClass("postAuthorPic").attr("id", "imgCircle").css("background-image", "url("+post.facebookPicture+")");
            profilePicContainer.append(postAuthorPic);
         }
         else {
            var postAuthorPic = document.createElement("div");
            $(postAuthorPic).addClass("postAuthorPic").attr("id", "imgCircle").css("background-image", "url('https://img.clipartfest.com/be641b0b0ccd4980bb4efcb50f778468_jun-28-the-anonymous-free-anonymous-person-clipart_750-481.png')");
            profilePicContainer.append(postAuthorPic);
         }

         postAuthorPicContainer.append(profilePicContainer);

      }
   }

   function displayPostInfo(post){
      /*var sidebarPostContentText = $("div.sidebarPostContentText");
      var sidebarPostDetails     = $("div.sidebarPostDetails");*/
      var postDate               = $("div.timeData");
      var postDateDescription    = $("div.timeDescription")
      var postAuthor             = $("div.postAuthor");
      var commentInputContainer  = $("div.commentInputContainer");
      var commentSectionContainer = $("#commentSectionContainer");
      var categories             = $("span.postCategories#sidebarCategory");
      var postAuthorPicContainer = $('span.profileContainer#sidebarAuthorPic');
      var sidebarPostEventTitle = $("div.sidebarPostEventTitle");
      var sidebarPostOrganization = $("span.sidebarPostOrganization");
      var sidebarPostEventDescription = $("div.sidebarPostEventDescription");
      var eventDate = $("span.eventDate");
      var eventTime = $("div.eventTime");
      var eventLocation = $("span.eventLocation");

      postAuthorPicContainer.empty();
      loadProfilePic(post, postAuthorPicContainer);

      var str = post.content.replace(/(?:\r\n|\r|\n)/g, '<br/>');
      //sidebarPostContentText.html(str);
      sidebarPostEventTitle.text(post.event_title);
      sidebarPostOrganization.text(post.club_name);
      eventDate.text(post.event_date);
      eventTime.text(post.event_time);
      eventLocation.text(post.event_location);

      sidebarPostEventDescription.text(post.content);



      postDateDescription.empty();
      var dateFormat = obtainDateFormat(new Date(post.absTime));

      if (dateFormat[2] == true) {
         postDateDescription.text(dateFormat[1]);
         postDate.text(dateFormat[0]);
         //$(timeDescription).text("hours ago");
      }
      else {
         postDate.text(dateFormat[0]);
         postDateDescription.hide();
      }

      postAuthor.text(post.name);

      /*if (post.categories != "") {
         $('span.separator#categorySeparator').show();
         var category = getCategory(post.categories);
         categories.text(category);
      }
      */
      var commentInputForm = document.createElement("form");
      $(commentInputForm).addClass("commentInputForm").attr("id", post._id).attr("action", "/general-forum/" + post._id + "/post").attr("method", "post");
      var form_group_1     = document.createElement("fieldset");
      $(form_group_1).addClass("form-group commentInputContainer").attr("id", post._id);
      var commentInput     = document.createElement("textarea");
      $(commentInput).addClass("postContentInput").attr("id", post._id).attr("name", "content").attr("form", post._id).attr("placeholder", "Write a comment...").prop("required", true);
      //var form_group_2     = document.createElement("fieldset");
      //$(form_group_2).addClass("form-group commentSubmitButton").attr("id", post._id);
      var btn              = document.createElement("button");
      $(btn).addClass("btn").addClass("btn-primary commentSubmitButton").attr("id", post._id).attr("type", "submit").attr("form", post._id).text("Submit");

      form_group_1.append(commentInput);
      form_group_1.append(btn);
      //form_group_2.append(btn);

      commentInputForm.append(form_group_1);
      //commentInputForm.append(form_group_2);

      commentInputContainer.append(commentInputForm);

      //comment scroll in place
      //console.log(sidebarPostContentText);
      /*var offset = sidebarPostContentText.height();
      sidebarPostDetails.css('margin-top', offset+"px");
      offset += sidebarPostDetails.height();
      commentInputContainer.css('margin-top', offset+"px");
      offset += commentInputContainer.height();
      commentSectionContainer.css('margin-top', offset+"px");*/
   }

   function getPost(postID){
      var post = null;

      $.ajax({
         dataType : "json",
         url      : window.location.pathname + "/" + postID + "/info",
         async    : false,
         success  : function(data){
            post = data;
         }
      });

      return post;
   }

   function showRightSideItems(){
      var commentSectionContainer = $("div#commentSectionContainer");
      commentSectionContainer.empty();

      var commentInputContainer = $("div.commentInputContainer");
      commentInputContainer.empty();

      var sidebarBackground = $("div.sidebarBackground");
      if (sidebarBackground.css("display") == "block"){
         sidebarBackground.hide();
      }

      var closeSidebarIcon = $("span#closeSidebarIcon");
      if (closeSidebarIcon.css("display") == "none"){
         closeSidebarIcon.show();
      }

      var individualPostContainer = $("div.individualPostContainer");
      if (individualPostContainer.css("display") == "none"){
         individualPostContainer.show();
      }
   }

   function hideRightSideItems(){
      var commentSectionContainer = $("div#commentSectionContainer");
      commentSectionContainer.empty();

      var commentInputContainer = $("div.commentInputContainer");
      commentInputContainer.empty();

      var sidebarBackground = $("div.sidebarBackground");
      if (sidebarBackground.css("display") != "block"){
         sidebarBackground.show();
      }

      var closeSidebarIcon = $("span#closeSidebarIcon");
      if (closeSidebarIcon.css("display") != "none"){
         closeSidebarIcon.hide();
      }

      var individualPostContainer = $("div.individualPostContainer");
      if (individualPostContainer.css("display") != "none"){
         individualPostContainer.hide();
      }
   }

    // END OF generalForumCommentDisplay.js
});
