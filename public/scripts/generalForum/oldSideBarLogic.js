/* START OF SIDEBAR IMPLEMENTATION */
   //var highlightedPost;

   /*$('li.list-group-item.forumPostBody').click(function(e) {

      $('div.individualPostContainer').show();
      $('div.sidebarBackground').hide();
      $('span#closeSidebarIcon').show();

      if (highlightedPost != null) {
         $(highlightedPost).removeAttr('style');
      }

      $(this).css("background-color", "#eeeeee");
      highlightedPost = this;
      $('div#commentSectionContainer').empty();

      var post_id = $(this).find('#postID').text();
      getPostComments(post_id, displayPostComments);

      var postContentText = $(this).find('.postContentText').text();
      var postDate = $(this).find('.postDate').text();
      var postAuthor = $(this).find('.postAuthor').text();

      $('div.commentInputContainer .commentInputForm').attr("action", "/general-forum/"+post_id+"/post");
      $('div#individualPostContent .sidebarPostContentText').text(postContentText);
      $('div#individualPostContent .postDate').text(postDate);
      $('div#individualPostContent .postAuthor').text(postAuthor);
   });*/

   /* ON CLICK EVENT FOR SUB COMMENTING */
/*   $('#commentSectionContainer').on('click', '.commentReplyButton', function() {
      console.log("here");
      $('#commentReplyForm').show();
   });

   $('#commentSectionContainer').on('click', "#replyCancel", function() {
      $("#commentReplyForm").hide();
   });*/

   /*$('span#closeSidebarIcon').click(function(e) {
      $(this).hide();
      $('div#commentSectionContainer').empty();
      $('div.individualPostContainer').hide();
      $(highlightedPost).removeAttr('style');
      $('div.sidebarBackground').show();
   });*/

   /* END OF SIDEBAR IMPLEMENTATION */