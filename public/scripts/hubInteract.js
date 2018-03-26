$(document).ready(

   function() {
      var desiredTab, desiredContent;
      desiredTab = $(".classSelect a");
      desiredTab.on('click', function(e) {
         desiredContent = $(this).attr("href");
         $(".classArea" + desiredContent).show().siblings().hide();

         $(this).addClass("active").siblings().removeClass("active");

         e.preventDefault(e);
      });
   }

);
