$( document ).ready(function() {

   //On-click event listener
   var highlightedPost = null;

   $("li.list-group-item.forumPostBody").click(function(){
      //console.log("hi");
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
         var commentDetails            = document.createElement("div");
         $(commentDetails).addClass("commentDetails").attr("id", id);
         var commentAuthor             = document.createElement("span");
         $(commentAuthor).addClass("commentAuthor").attr("id", id).text(comment.name);
         var separator_1               = document.createElement("span");
         $(separator_1).addClass("separator").text("-");
         var commentTimeContainer      = document.createElement("span");
         $(commentTimeContainer).addClass("commentTimeContainer").attr("id", id);
         var timeData                  = document.createElement("span");
         $(timeData).addClass("timeData").attr("id", id).text(comment.absTime);
         var timeDescription           = document.createElement("span");
         $(timeDescription).addClass("timeDescription").attr("id", id).text("placeholder");
         var separator_2               = document.createElement("span");
         $(separator_2).addClass("separator").text("-");

         var commentReplyForm          = document.createElement("form");
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

         commentTimeContainer.append(timeData);
         commentTimeContainer.append(timeDescription);

         commentDetails.append(commentAuthor);
         commentDetails.append(separator_1);
         commentDetails.append(commentTimeContainer);
         commentDetails.append(separator_2);

         mainContentContainer.append(commentTextContent);
         mainContentContainer.append(commentDetails);

         highLevelCommentContainer.append(voteContainer);
         highLevelCommentContainer.append(mainContentContainer);
         highLevelCommentContainer.append(commentReplyForm);

         commentContainer.append(commentID);
         commentContainer.append(highLevelCommentContainer);
         commentContainer.append(subCommentContainer);

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

   function displayPostInfo(post){
      var sidebarPostEventTitle = $("div.sidebarPostEventTitle");
      var sidebarPostOrganization = $("div.sidebarPostOrganization");
      var sidebarPostEventInfo = $("div.sidebarPostEventInfo");
      var postDate               = $("div.postDate");
      var postAuthor             = $("div.postAuthor");
      var commentInputContainer  = $("div.commentInputContainer");

      sidebarPostContentText.text(post.event_title);
      console.log(post.event_title);
      sidebarPostOrganization.text(post.club_name);
      postDate.text(post.absTime);
      postAuthor.text(post.name);




      var commentInputForm = document.createElement("form");
      $(commentInputForm).addClass("commentInputForm").attr("id", post._id).attr("action", "/general-forum/" + post._id + "/post").attr("method", "post");
      var form_group_1     = document.createElement("fieldset");
      $(form_group_1).addClass("form-group").attr("id", post._id);
      var commentInput     = document.createElement("textarea");
      $(commentInput).addClass("commentInput").attr("id", post._id).attr("name", "content").attr("form", post._id).attr("placeholder", "Write a comment...").prop("required", true);
      var form_group_2     = document.createElement("fieldset");
      $(form_group_2).addClass("form-group").attr("id", post._id);
      var btn              = document.createElement("button");
      $(btn).addClass("btn").addClass("btn-primary").attr("id", post._id).attr("type", "submit").attr("form", post._id).text("Submit");

      form_group_1.append(commentInput);
      form_group_2.append(btn);

      commentInputForm.append(form_group_1);
      commentInputForm.append(form_group_2);

      commentInputContainer.append(commentInputForm);
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

});
