$( document ).ready(function() {

      var addClassToggled = false;
      $('a.ui.button#addClass')
      .click(function() {

         if (!addClassToggled) {
            $('.addClassSearchContainer').css('display', 'block');
            $(this).children().text("Cancel");
            addClassToggled = true;
         }
         else {
            $('.addClassSearchContainer').css('display', 'none');
            $(this).children().text("Add Class");
            addClassToggled = false;
         }
         console.log("HI");
      });



});
