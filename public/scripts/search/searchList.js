$( document ).ready(function() {

   //CHECK IF NO RESULTS FOUND
   //HandleNoResults('#listProfessorContents', '#professorResults');
   //HandleNoResults('#listClassContents', '#classResults');
   HandleNoResults('#listProfessorContents', '#professorResults', '#listClassContents', '#classResults');

});

function HandleNoResults(tableSelector, type) {
   var resultTable, resultRows, rowNum;

   resultTable = $(tableSelector);
   resultRows = resultTable.children();
   //profHeader = professorTable.children($('.columnHeaders'));
   rowNum = resultRows.length;

   if (rowNum < 2) {
      $('#sortButtonWrapper').remove();
      $('table.table_style'+type).after('<div class="noResultsColumn">No Results Found</div>');
   }
}

function HandleNoResults(professorTable, typeProf, classTable, typeClass) {
   var resultProfTable, resultProfRows, rowNumProf;
   var resultClassTable, resultClassRows, rowNumClass;

   resultProfTable = $(professorTable);
   resultProfRows = resultProfTable.children();
   rowNumProf = resultProfRows.length;

   resultClassTable = $(classTable);
   resultClassRows = resultClassTable.children();
   rowNumClass = resultClassRows.length;

   if (rowNumProf < 2 && rowNumClass < 2) {
      $('#sortButtonWrapper').remove();
      $('#sortButtonWrapper').remove();
      $('table.table_style'+typeProf).after('<div class="noResultsColumn">No Results Found</div>');
      $('table.table_style'+typeClass).after('<div class="noResultsColumn">No Results Found</div>');
   }

   else {
      if (rowNumProf < 2) {
         $('#sortButtonWrapper').remove();
         $(professorTable).remove();
         $('section.titleContainer').css("height", "68px");
      }

      if (rowNumClass < 2) {
         $('#sortButtonWrapper').remove();
         $(classTable).remove();
      }
   }
}
