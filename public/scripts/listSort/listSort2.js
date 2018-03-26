$( document ).ready(function() {
  //keeps track of ascending vs descending sort 
   var currentBtn = null;
   var currentBtnCount = 0;
   
   //FILTER LIST
   // 1 = Last Name
   // 2 = Rating
   // 3 = Department

   //PROFESSOR LIST
   $("#sortLastName").click(function () {
      if(currentBtnCount == 0 && currentBtn != null && currentBtn.is($(this))) {
         currentBtnCount = 1;
      } else {
         currentBtnCount = 0;
      }
      currentBtn = $(this);

      sortProfessors($('#listProfessorContents'), currentBtnCount, 1);
   });

   $("#sortRating").click(function () {
      if(currentBtnCount == 0 && currentBtn != null && currentBtn.is($(this))) {
         currentBtnCount = 1;
      } else {
         currentBtnCount = 0;
      }
      currentBtn = $(this);
      
      sortProfessors($('#listProfessorContents'), currentBtnCount, 2);
   });

   $("#sortDepartment").click(function () {
      if(currentBtnCount == 0 && currentBtn != null && currentBtn.is($(this))) {
         currentBtnCount = 1;
      } else {
         currentBtnCount = 0;
      }
      currentBtn = $(this);
      
      sortProfessors($('#listProfessorContents'), currentBtnCount, 3);
   });

   //FILTER LIST
   // 1 - Class Title
   // 2 - Class Name
   // 3 - # of Students
   // 4 - Units
   
   //CLASS LIST
   $("#sortClass").click(function () {
      if(currentBtnCount == 0 && currentBtn != null && currentBtn.is($(this))) {
         currentBtnCount = 1;
      } else {
         currentBtnCount = 0;
      }
      currentBtn = $(this);
      //$('#listClassContents')
      sortClasses($('.table_style').children().eq(1), currentBtnCount, 1);
   });
   $("#sortClassLongName").click(function () {
      if(currentBtnCount == 0 && currentBtn != null && currentBtn.is($(this))) {
         currentBtnCount = 1;
      } else {
         currentBtnCount = 0;
      }
      currentBtn = $(this);

      sortClasses($('.table_style').children().eq(1), currentBtnCount, 2);
   });
   $("#sortEnrolledStudents").click(function () {
      if(currentBtnCount == 0 && currentBtn != null && currentBtn.is($(this))) {
         currentBtnCount = 1;
      } else {
         currentBtnCount = 0;
      }
      currentBtn = $(this);

      sortClasses($('.table_style').children().eq(1), currentBtnCount, 3);
   });
   $("#sortUnits").click(function() {
     if(currentBtnCount == 0 && currentBtn != null && currentBtn.is($(this))) {
         currentBtnCount = 1;
      } else {
         currentBtnCount = 0;
      }
      currentBtn = $(this);

      sortClasses($('.table_style').children().eq(1), currentBtnCount, 4);
   });

   // class for professor name is .professor_name
   function sortProfessors(table, order, filter) {      
      tRows = table.children();
      rowCount = tRows.length;

      var tmp = $.map($(tRows).find('.professor_name'), function(n,i) {
         var dept = $(n).parent().parent().parent().parent().find('.professor_depart').text();
         var rating = $(n).parent().parent().parent().parent().parent().find('.detailColumn').text();

         return [[$(n).parent().parent().parent().parent().parent(), $(n).text(), rating, dept, i]];
      });

      var sortedList = tmp.mergeSort(function(a,b) {
         if(filter==1) {
            left = a[filter].split(" ")[a[filter].split(" ").length-1];
            right = b[filter].split(" ")[b[filter].split(" ").length-1];
         } else {
            left = a[filter];
            right = b[filter];
         }

         if(order == 0) {
            if(left < right) {
               return -1;
            } else if (left === right) {
               return 0;
            } else {
               return 1;
            }
         } else {
            if(left < right) {
               return 1;
            } else if (left === right) {
               return 0;
            } else {
               return -1;
            }
         }
      });

      //remove all child elements before appending sorted ones
      $('#listProfessorContents tr').slice(1).remove();

      for(i=0; i<sortedList.length; i++) {
         table.append(sortedList[i][0]);
      }
   }

   function sortClasses(table, order, filter) {      
      tRows = table[0];
      rowCount = tRows.length;

      var tmp = $.map($(tRows).find('.professor_name'), function(n,i) {
         var className = $(n).parent().parent().parent().parent().find('.professor_depart').text();
         var units = $(n).parent().parent().parent().parent().parent().find('.unitsColumn').text();
         return [[$(n).parent().parent().parent().parent().parent(), $(n).text(), className, null, units, i]];
      });

      var sortedList = tmp.mergeSort(function(a,b) {
         left = a[filter];
         right = b[filter];

         if(order == 0) {
            if(left < right) {
               return -1;
            } else if (left === right) {
               return 0;
            } else {
               return 1;
            }
         } else {
            if(left < right) {
               return 1;
            } else if (left === right) {
               return 0;
            } else {
               return -1;
            }
         }
      });

      //remove all child elements before appending sorted ones
      table.slice(1).remove();

      for(i=0; i<sortedList.length; i++) {
         table.append(sortedList[i][0]);
      }
   }

});