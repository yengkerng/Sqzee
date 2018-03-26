$( document ).ready(function() {
      /*$(".ui.small.image").mouseover(
         function() {
            var classId = $(".ui.small.image").attr('id');
            console.log(classId);
            $("#"+classId+".ui.small.image").attr("src", "/misc/addicon2.png");
         })
      $(".ui.small.image").mouseout(
         function() {
            var classId = $(".ui.small.image").attr('id');
            $("#"+classId+".ui.small.image").attr("src", "/misc/addicon.png");
         })*/

      $("img.ui.small.image#deleteicon")
      .mouseover(function() {
            $(this).attr("src", "/misc/deleteicon2.png");
       })
       .mouseout(function() {
            if ($(this).attr("src") == "/misc/deleteicon2.png") {
               $(this).attr("src", "/misc/deleteicon.png");
            }
            else {
               $(this).attr("src", "/misc/addiconSuccess.png");
            }
        })
        .click(function() {
            $(this).attr("src", "/misc/addiconSuccess.png");

        });

      $("img.ui.small.image#addicon")
      .mouseover(function() {
            $(this).attr("src", "/misc/addIcon4.png");
       })
       .mouseout(function() {
            if ($(this).attr("src") == "/misc/addIcon4.png") {
               $(this).attr("src", "/misc/addIcon3.png");
            }
            else {
               $(this).attr("src", "/misc/addiconSuccess.png");
            }
        })
        .click(function() {
            $(this).attr("src", "/misc/addiconSuccess.png");

            /*console.log("clicked");
            $(this).before("<span class=\"glyphicon.glyphicon-ok\" width=\"25px;\"></span>");
            $(this).hide();*/
        });

      $('button#moreFriendsButton')
      .mouseover(function() {
         $(this).parent().attr("class", "dropdown open");
         $(this).attr("aria-expanded", "true");
      })
      .mouseout(function() {
         $(this).parent().attr("class", "dropdown");
         $(this).attr("aria-expanded", "false");
      });

      $('.oneClassRow')
      .mouseover(function() {
         var facebookFriends = $(this).find('button#moreFriendsButton');
         facebookFriends.parent().attr("class", "dropdown open");
         facebookFriends.attr("aria-expanded", "true");
      })
      .mouseout(function() {
         var facebookFriends = $(this).find('button#moreFriendsButton');
         facebookFriends.parent().attr("class", "dropdown");
         facebookFriends.attr("aria-expanded", "false");
      });

});
