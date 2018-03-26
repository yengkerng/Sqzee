$( document ).ready(function() {
   //PROFESSOR LIST
   $("#sortLastName").click(function () {
      sortList($('#listProfessorContents'), compareProfessors);
   });
   $("#sortDeparment").click(function () {
      sortList($('#listProfessorContents'), compareDepartments);
   });
   $("#sortRating").click(function () {
      sortList($('#listProfessorContents'), compareRatings);
   });

   //CLASS LIST
   $("#sortClass").click(function () {
      sortList($('#listClassContents'), compareClasses);
   });
   $("#sortClassLongName").click(function () {
      sortList($('#listClassContents'), compareClassLongName);
   });
   $("#sortEnrolledStudents").click(function () {
      sortList($('#listClassContents'), compareEnrolledStudents);
   });
   $("#sortUnits").click(function() {
     sortList($('#listClassContents'), compareUnits);
   });

   //SEARCH RESULTS

   //Professors
   /*$("#sortSearchLastName").click(function () {
      sortList($('#listProfessorContents'), compareProfessors);
   });
   $("#sortSearchDeparment").click(function () {
      sortList($('#listProfessorContents'), compareDepartments);
   });
   $("#sortSearchRating").click(function () {
      sortList($('#listProfessorContents'), compareRatings);
   });
*/
   //Classes
   /*$("#sortSearchClass").click(function () {
      sortList($('#listClassContents'), compareClasses);
   });
   $("#sortSearchEnrolledStudents").click(function () {
      sortList($('#listClassContents'), compareEnrolledStudents);
   });
   $("#sortClassLongName").click(function () {
      sortList($('#listClassContents'), compareClassLongName);
   });*/

});

class rowEntity {
  constructor(primaryName, secondName, num, entLink, units) {
    this.primaryName = primaryName;
    this.secondName = secondName;
    this.num = num;
    this.entLink = entLink;
    this.units = units;

    var split = primaryName.split(" ");
    this.firstName = split[0];
    this.lastName = split[split.length - 1];
    this
  }
}

function sortList(tableBody, comparator) {

   let PROFESSOR_NAME_CLASS = '.professor_name';
   let PROFESSOR_DEPART_CLASS = '.professor_depart';
   let DETAIL_CLASS = '.detailColumn';
   let DETAIL_UNIT = '.unitsColumn';

   var entityArray = [],
      tRows = tableBody.children(),
      rowCount = tRows.length,
      currRow, rowContent;
   var singleEntity;

   //BEGIN: filling array with row objects to be sorted
   //start at second row (first row is header text)
   for (currRow = 1; currRow < rowCount; currRow++) {
      rowContent = $(tRows[currRow]);
      console.log(rowContent);

      singleEntity = new rowEntity(rowContent.find($(PROFESSOR_NAME_CLASS)).text(),
         rowContent.find($(PROFESSOR_DEPART_CLASS)).text(),
         rowContent.find($(DETAIL_CLASS)).text(),
         rowContent.find($(PROFESSOR_NAME_CLASS)).attr('href'),
         rowContent.find($(DETAIL_UNIT)).text()
      );
      entityArray[currRow - 1] = singleEntity;

   }
   //END: filling array or row objects

   //BEGIN: sorting objects within array (depending on comparator)
   entityArray.sort(comparator);
   //END: sorting objects within array

   //BEGIN: filling table rows in order of objects in array
   for (currRow = 1; currRow < rowCount; currRow++) {
      rowContent = $(tRows[currRow]);
      singleEntity = entityArray[currRow - 1];

      rowContent.find($(PROFESSOR_NAME_CLASS)).text(singleEntity.primaryName);
      rowContent.find($(PROFESSOR_DEPART_CLASS)).text(singleEntity.secondName);
      rowContent.find($(DETAIL_CLASS)).text(singleEntity.num);
      rowContent.find($(PROFESSOR_NAME_CLASS)).attr('href', singleEntity.entLink);
      rowContent.find($(DETAIL_UNIT)).text(singleEntity.units)

   }
   //END: filling table rows in order or objects
}

//Helper comparator functions for sorting array
function compareProfessors(ent1, ent2) {
   if (ent1.lastName > ent2.lastName) {
      return 1;
   }
   else if (ent1.lastName < ent2.lastName) {
      return -1;
   }
   else {
      if (ent1.firstName > ent2.firstName) {
         return 1;
      }
      else if (ent1.firstName < ent2.firstName) {
         return -1;
      }
      else {
         return 0;
      }
   }
}

function compareDepartments(ent1, ent2) {
   if (ent1.secondName > ent2.secondName) {
      return 1;
   }
   else if (ent1.secondName < ent2.secondName) {
      return -1;
   }
   else {
      return compareProfessors(ent1, ent2);
   }
}

function compareRatings(ent1, ent2) {
   if (ent1.num > ent2.num) {
      return 1;
   }
   else if (ent1.num < ent2.num) {
      return -1;
   }
   else {
      return compareProfessors(ent1, ent2);
   }
}

function compareClasses(ent1, ent2) {
   if (ent1.primaryName > ent2.primaryName) {
      return 1;
   }
   else if (ent1.primaryName < ent2.primaryName) {
      return -1;
   }
   else {
      return 0;
   }
}

function compareEnrolledStudents(ent1, ent2) {
   if (ent1.num > ent2.num) {
      return 1;
   }
   else if (ent1.num < ent2.num) {
      return -1;
   }
   else {
      return compareClasses(ent1, ent2);
   }
}

function compareClassLongName(ent1, ent2) {
   if (ent1.secondName > ent2.secondName) {
      return 1;
   }
   else if (ent1.secondName < ent2.secondName) {
      return -1;
   }
   else {
      return compareClasses(ent1, ent2);
   }
}

function compareUnits(ent1, ent2) {
   let a = Number(ent1.units);
   let b = Number(ent2.units);
   if (!isNaN(a) && !isNaN(b)) {
      if (a > b) {
          return 1;
      }
      else if (a < b) {
          return -1; 
      }
      else {
        console.log("HERE " + a + " " + b);
          return compareClasses(ent1, ent2);
      }
   } else {
     if (isNaN(a)) {
       if (isNaN(b)) {
         let firstA = ent1.units.split(" ")[0];
         let firstB = ent2.units.split(" ")[0];
         if (firstA > firstB) {
           return 1;
         } else if (firstA < firstB){
           return -1;
         } else {
           return compareClasses(ent1, ent2);
         }
       }
       let firstDigit = ent1.units.split(" ")[0];
       if (firstDigit > b) {
         return 1;
       }
       else if (firstDigit < b) {
         return -1;
       }
       else {
         return 1;
       }
     }
    else if (isNaN(b)) {
       let firstDigit = ent2.units.split(" ")[0];
       if (a > firstDigit) {
         return 1;
       }
       else if (a < firstDigit) {
         return -1;
       }
       else {
         return -1;
       }
     } else {
       return -1;
     }
   }
}
