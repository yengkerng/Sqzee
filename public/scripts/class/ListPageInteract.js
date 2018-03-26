$( document ).ready(function() {

   var classesChanged = false;

   class singleClass {
      constructor(name, department, courseNum, description, ge, units, rating, numHrs, timeCommitment, id, prevProfs, currProfs, nextProfs) {
         this.name = name;
         this.department = department;
         this.courseNum = courseNum;
         this.description = description;
         this.ge = ge;
         this.units = units;
         this.rating = rating;
         this.numHrs = numHrs;
         this.timeCommitment = timeCommitment;
         this.id = id;
         this.prevProfs = prevProfs;
         this.currProfs = currProfs;
         this.nextProfs = nextProfs;
      }
   }

   //$(".departmentsContainer").prepend('<img id="loading" src="https://invitationdigital-res.cloudinary.com/image/upload/vc3/web/animated/spinner-200px.gif" style="width: 10%"/>');
   $(".departmentsContainer").prepend('<img id="loading" src="loading.gif" style="width: 10%"/>');
   /* START OF CLASS LOADING IMPLEMENTATION */

   var pathname = window.location.pathname;
   function getClasses(pathname, callback) {
      var classContent;
      var classList = [];
      $.getJSON(pathname + "/getJSONClassList", function(data) {
         $.each(data.classes, function(n, val) {
            classContent = val;
            single = new singleClass(classContent.name, classContent.department, classContent.courseNum, classContent.description,
               classContent.ge, classContent.units, classContent.rating, classContent.numHrs, classContent.timeCommitment, classContent._id,
               classContent.previousQrtProfessors, classContent.currQrtProfessors, classContent.nextQtrProfessors);
            classList.push(single);
         });
      }, "json").done(function() {
         $("#loading").hide();
         callback(classList);
      });
   }

   function sortDepartments(classList) {
      var myMap = new Map();
      var departmentArray = [];
      var departmentName;
      var singleClass;
      var valueArray;
      for (var i = 0; i < classList.length; i++) {
         departmentName = classList[i].department;
         singleClass = classList[i];
         if (myMap.get(departmentName) != undefined) {
            myMap.get(departmentName).push(singleClass);
         }
         else {
            valueArray = [];
            valueArray.push(singleClass);
            myMap.set(departmentName, valueArray);
            departmentArray.push(departmentName);
         }
      }

      departmentArray.sort();

      iterateOverDepartments(myMap, departmentArray);
   }

   function iterateOverDepartments(myMap, departmentArray) {
      var value;

      for (var depart of departmentArray) {
         value = myMap.get(depart);
         value.sort();
         setDepartmentView(depart, value);
      }
   }

   function setDepartmentView(individualDepartment, classes) {
      var singleReview;
      var profSection;
      var profSectionName;
      var sectionLink;

      var createdReview;

      departmentName = document.createElement("span");
      $(departmentName).addClass("departmentName");
      $(departmentName).text(individualDepartment);

      departmentNameContainer = document.createElement("div");
      $(departmentNameContainer).addClass("departmentNameContainer");
      $(departmentNameContainer).append(departmentName);
      $(departmentNameContainer).click(function() {
         $(".departmentClassesContainer#"+individualDepartment).toggle();
         if ($(this).attr("class").indexOf("active") != -1) {
            $(this).removeClass("active");
         }
         else {
            $(this).addClass("active");
         }
      });

      departmentSection = document.createElement("div");
      $(departmentSection).addClass("departmentSection").attr("id", individualDepartment);
      $(departmentSection).append(departmentNameContainer);

      departmentClassesContainer = document.createElement("div");
      $(departmentClassesContainer).addClass("departmentClassesContainer").attr("id", individualDepartment);
      $(departmentClassesContainer).css("display", "none");

      var departmentsCollection = $('div.departmentsContainer');
      for (var i = 0; i < classes.length; i++) {
         singleClass = createSingleDepartmentClass(classes[i]);
         if ($(departmentClassesContainer).attr("id") == classes[i].department) {
            $(departmentClassesContainer).append(singleClass);
         }
      }

      $(departmentSection).append(departmentClassesContainer);

      $(departmentsCollection).append(departmentSection);

   }

   function createSingleDepartmentClass(singleClass) {
      var individualClassContainer;
      var classNameContainer;
      var className;
      var addIcon;
      var addIconContainer;

      classLink = document.createElement("a");
      $(classLink).addClass("classLink").attr("href", "/class/"+singleClass.department+"-"+singleClass.courseNum).text(singleClass.department + " " + singleClass.courseNum);

      className = document.createElement("span");
      $(className).addClass("className");
      $(className).attr({"data-className":singleClass.name, "data-units":singleClass.units,"data-rating":singleClass.rating,"data-numHrs":singleClass.numHrs});
      $(className).append(classLink);


      classNameContainer = document.createElement("span");
      $(classNameContainer).addClass("classNameContainer");
      $(classNameContainer).append(className);

      addIcon = document.createElement("img");
      $(addIcon).addClass("addClassIcon").attr({"src":"../misc/addIcon3.png", "width":"22px"});
      $(addIcon).mouseover(function() {
         //if ($(this).attr("class").indexOf("checked") == -1) {
         $(this).attr("src", "../misc/addIcon2.png");
         //}
      })
      .mouseout(function() {
         //if ($(this).attr("class").indexOf("checked") == -1) {
         $(this).attr("src", "../misc/addIcon3.png");
         //}
      })
      .click(function() {
         //$(this).attr("src", "../misc/checkmark.png").addClass("checked");
         if (!classesChanged) {
            $('.buttonSection').show();
            classesChanged = true;
         }
         var professors = singleClass.prevProfs + "," + singleClass.currProfs + "," + singleClass.nextProfs;
         var enrolledClassRow = createEnrolledClass(singleClass.id, singleClass.department, singleClass.courseNum,
            singleClass.name, singleClass.units, singleClass.rating, singleClass.numHrs, professors);
         $(".enrolledClassTableBody").append(enrolledClassRow);
         computeEnrolledStats();
      });

      addIconContainer = document.createElement("span");
      $(addIconContainer).addClass("addIconContainer");
      $(addIconContainer).append(addIcon);

      individualClassContainer = document.createElement("div");
      $(individualClassContainer).addClass("individualClassContainer");
      $(individualClassContainer).append(addIconContainer);
      $(individualClassContainer).append(classNameContainer);

      return individualClassContainer;
   }

   getClasses(pathname, sortDepartments);

   /* START OF ENROLLED CLASSES INTERACTION */
   $('tr.oneClassRow').mouseover(function() {
      $(this).find('td.enrolledUnitsColumn').hide();
      $(this).find('td.deleteColumn').show();
   })
   .mouseout(function() {
      $(this).find('td.deleteColumn').hide();
      $(this).find('td.enrolledUnitsColumn').show();
   });

   $('img.ui.small.image#deleteicon').mouseover(function() {
      $(this).attr("src", '/misc/deleteicon2.png');
   })
   .click(function() {
      if (!classesChanged) {
         $('.buttonSection').show();
         classesChanged = true;
      }
      $(this).parent().parent().remove(0);
      computeEnrolledStats();
   });

   function createEnrolledClass(classID, department, courseNum, className, units, rating, numHrs, profs) {
      var oneClassRow;
      var classDetailColumn;
      var classTitleContainer;
      var enrolledClassTitle;
      var enrolledClassName;
      var enrolledUnitsColumn;
      var deleteColumn;
      var deleteicon;

      enrolledClassTitle = document.createElement("a");
      $(enrolledClassTitle).addClass("enrolledClassTitle");
      $(enrolledClassTitle).attr("href","/class/" + department + "-" + courseNum).text(department + " " + courseNum);

      classTitleContainer = document.createElement("div");
      $(classTitleContainer).addClass("classTitleContainer");
      $(classTitleContainer).append(enrolledClassTitle);

      enrolledClassName = document.createElement("div");
      $(enrolledClassName).addClass("enrolledClassName").text(className);

      classDetailColumn = document.createElement("td");
      $(classDetailColumn).addClass("classDetailColumn");
      $(classDetailColumn).append(classTitleContainer).append(enrolledClassName);

      enrolledUnitsColumn = document.createElement("td");
      $(enrolledUnitsColumn).addClass("enrolledUnitsColumn").text(units);

      deleteicon = document.createElement("img");
      $(deleteicon).addClass("ui").addClass("small").addClass("image").attr("id", "deleteicon");
      $(deleteicon).attr("src","/misc/deleteicon.png").css("width", "22px");
      $(deleteicon).mouseover(function() {
         $(this).attr("src", '/misc/deleteicon2.png');
      })
      .click(function() {
         $(this).parent().parent().remove(0);
         computeEnrolledStats();
      });

      deleteColumn = document.createElement("td");
      $(deleteColumn).addClass("deleteColumn");
      $(deleteColumn).append(deleteicon);

      oneClassRow = document.createElement("tr");
      $(oneClassRow).addClass("oneClassRow").attr({"data-department":department,"data-courseNum":courseNum, "data-classID":classID, "data-className":className, "data-units":units,"data-rating":rating,
         "data-numHrs":numHrs, "data-profs":profs});
      $(oneClassRow).append(classDetailColumn).append(enrolledUnitsColumn).append(deleteColumn);
      $(oneClassRow).mouseover(function() {
         $(this).find('td.enrolledUnitsColumn').hide();
         $(this).find('td.deleteColumn').show();
      })
      .mouseout(function() {
         $(this).find('td.deleteColumn').hide();
         $(this).find('td.enrolledUnitsColumn').show();
      });

      return oneClassRow;


   }


   function computeEnrolledStats() {
      var totalUnits = computeTotalUnits();
      var classDifficulty;

      var timeHigh = 0;
      var timeLow = 0;
      var count = 0;
      var tmp = 0.0;
      var professorListString;
      var professorList;
      var className;
      var polyRating;
      var currProf = 0;
      var newList;
      var completeProfessorCount = 0;
      var enrolledClasses = $('.enrolledClassTableBody').children('.oneClassRow');
      if (enrolledClasses.length != 0) {
         completeProfessorCount = getProfessorCount(enrolledClasses);
        enrolledClasses.each(function() {
           classDifficulty = $(this).attr("data-rating");
           professorListString = $(this).attr("data-profs");
           className = $(this).attr("data-department") + "-" + $(this).attr("data-courseNum");
           professorList = professorListString.split(",");
           newList = [];
           for (var k = 0; k < professorList.length; k++) {
             if (!(professorList[k] === undefined || professorList[k] == null || professorList[k].length <= 0)) {
                newList.push(professorList[k]);
             }
           }
           for (var i = 0; i < newList.length; i++) {
             $.getJSON(pathname + "/" + className + "/" + newList[i] + "/getDepartmentAndRating", function(data) {
                if (isNaN(tmp)) {
                   tmp = 0.0;
                }
                polyRating = data.rating;
                if(!isNaN(parseFloat(polyRating)))
                {
                  tmp += parseFloat(polyRating);
                  if (parseFloat(polyRating) != 0) {
                     count++;
                  }

                }
                //tmp += parseFloat(polyRating);
                /*console.log(polyRating);
                if (polyRating != 0) {
                   ratings.push(parseFloat(polyRating));
                }*/
             }, "json").done(function() {
                if (isNaN(currProf)) {
                   currProf = 1;
                }
                else {
                   currProf++;
                }
                if (currProf == completeProfessorCount) {
                   calculateStats(tmp, count);
                }
                /*console.log(tmp);
                tmp += polyRating;
                //console.log(tmp + " " + count);
                if (polyRating != 0) {
                   count++;
                }*/
             });
           }

        });
      }
   }

   function getProfessorCount(enrolledClasses) {
      var profCount = 0;
      var newList;
      enrolledClasses.each(function() {
         professorListString = $(this).attr("data-profs");
         professorList = professorListString.split(",");
         newList = [];
         for (var k = 0; k < professorList.length; k++) {
           if (!(professorList[k] === undefined || professorList[k] == null || professorList[k].length <= 0)) {
             newList.push(professorList[k]);
           }
         }
         profCount += newList.length;

      });

      return profCount;
   }

   function calculateStats(tmp, count) {
      /*tmp = 0.0;
      count = ratings.length;
      for (var j = 0; j < ratings.length; j++) {
         tmp += ratings[j];
      }*/
      var totalUnits = computeTotalUnits();
      tmp = ((tmp/count) * 2.5).toFixed(2);
      timeLow = ((tmp) - (tmp)/2).toFixed(0);
      timeHigh = (timeLow * (3));

      $('.statsNumber#totalUnits').text(totalUnits);
      if (count == 0) {
         $('.statsNumber#avgDifficulty').text("N/A");
         $('.statsNumber#hoursPerWeek').text("N/A");
      } else {
         $('.statsNumber#avgDifficulty').text(tmp + " /10");
         $('.statsNumber#hoursPerWeek').text(timeLow + " - " + timeHigh);
      }
   }

   function computeTotalUnits() {
      var classUnits;
      var totalUnits = 0;

      $('.enrolledClassTableBody').children('.oneClassRow').each(function() {

         classUnits = $(this).find('.enrolledUnitsColumn').text();
         // In the case where units are, for example, "1-4": use the upper bound
         if (classUnits.indexOf('-') != -1) {
            classUnits = classUnits[classUnits.length - 1];
         }
         totalUnits += parseInt(classUnits);
      });
      return totalUnits;
   }

   function computeAverageDifficulty() {
      var averageDiff = 0;
      var classDifficulty;
      var classCount = 0;

      $('.enrolledClassTableBody').children('.oneClassRow').each(function() {

         classDifficulty = $(this).attr("data-rating");
         averageDiff += parseInt(classDifficulty);
         classCount++;

      });
      averageDiff = Math.ceil(averageDiff / classCount);

      return averageDiff;
   }

   function computeTimeStat() {
      var totalHrs = 0;
      var classHrs;

      $('.enrolledClassTableBody').children('.oneClassRow').each(function() {

         classHrs = $(this).attr("data-numHrs");
         // In the case where units are, for example, "1-4": use the upper bound
         if (classHrs.indexOf('-') != -1) {
            classHrs = classHrs[classHrs.length - 1];
         }
         totalHrs += parseInt(classHrs);
      });

      return totalHrs;
   }

   computeEnrolledStats();

   $('.ui.button#confirmClasses').click(function(){
      var classID;
      var classIDs = [];
      $('.enrolledClassTableBody').children('.oneClassRow').each(function() {
         classID = $(this).attr("data-classID");
         classIDs.push(classID);
      });

      $.ajax({
          url: '/class/updateUsersEnrolledClasses',
          type: 'POST',
          data: {"classList" : JSON.stringify(classIDs)},
          success: function() {
             location.reload();
          }
       });

   });


});
