$( document ).ready(function() {

  $('a.ui.button#calculateGPA')
  .click(function() {
    console.log("YO");
    var units1 = convert(document.GradeGPA.units1.value);
  	var units2 = convert(document.GradeGPA.units2.value);
  	var units3 = convert(document.GradeGPA.units3.value);
  	var units4 = convert(document.GradeGPA.units4.value);
  	var units5 = convert(document.GradeGPA.units5.value);

  	TotalUnits = units1 + units2 + units3 + units4 + units5 + convert(document.GradeGPA.overallUnits.value);

  	document.GradeGPA.totalUnits.value = TotalUnits;

  	var gHigh1 = convert(document.GradeGPA.gradeHigh1.value);
  	var gHigh2 = convert(document.GradeGPA.gradeHigh2.value);
  	var gHigh3 = convert(document.GradeGPA.gradeHigh3.value);
  	var gHigh4 = convert(document.GradeGPA.gradeHigh4.value);
  	var gHigh5 = convert(document.GradeGPA.gradeHigh5.value);

    var gLow1 = convert(document.GradeGPA.gradeLow1.value);
  	var gLow2 = convert(document.GradeGPA.gradeLow2.value);
  	var gLow3 = convert(document.GradeGPA.gradeLow3.value);
  	var gLow4 = convert(document.GradeGPA.gradeLow4.value);
  	var gLow5 = convert(document.GradeGPA.gradeLow5.value);

    var totalGradeHigh = (gHigh1 * units1 + gHigh2 * units2 + gHigh3 * units3 + gHigh4 * units4 + gHigh5 * units5 +
     (convert(document.GradeGPA.overallUnits.value) * convert(document.GradeGPA.overallGPA.value)))/ TotalUnits;

     var totalGradeLow = (gLow1 * units1 + gLow2 * units2 + gLow3 * units3 + gLow4 * units4 + gLow5 * units5 +
      (convert(document.GradeGPA.overallUnits.value) * convert(document.GradeGPA.overallGPA.value)))/ TotalUnits;

    totalGradeHigh = totalGradeHigh.toFixed(3);
    totalGradeLow = totalGradeLow.toFixed(3);
    document.GradeGPA.gpaHigh.value = totalGradeHigh;
  	document.GradeGPA.gpaLow.value = totalGradeLow;

  });

  $('a.ui.button#calculate')
  .click(function() {

    var percent1 = convert(document.GradeCalc.Percent1.value);
  	var percent2 = convert(document.GradeCalc.Percent2.value);
  	var percent3 = convert(document.GradeCalc.Percent3.value);
  	var percent4 = convert(document.GradeCalc.Percent4.value);
  	var percent5 = convert(document.GradeCalc.Percent5.value);
    var percent6 = convert(document.GradeCalc.Percent6.value);



  	TotalPercent = percent1 + percent2 + percent3 + percent4 + percent5 + percent6;
    var result = TotalPercent.toString() + "%";

  	document.GradeCalc.TotalPercent.value = result;

  	var g1 = convert(document.GradeCalc.Grade1.value);
  	var g2 = convert(document.GradeCalc.Grade2.value);
  	var g3 = convert(document.GradeCalc.Grade3.value);
  	var g4 = convert(document.GradeCalc.Grade4.value);
  	var g5 = convert(document.GradeCalc.Grade5.value);
  	var g6 = convert(document.GradeCalc.Grade6.value);


  	var FinalGrade = ((g1 * percent1 / 100) + (g2 * percent2 / 100) + (g3 * percent3 / 100) + (g4 * percent4 / 100) + (g5 * percent5 / 100) + (g6 * percent6 / 100)) * 100 / TotalPercent;
    FinalGrade = FinalGrade.toFixed(1);
    var result = FinalGrade.toString() + "%";
  	document.GradeCalc.Grade.value = result;

  });


  function convert(input)
  {
  	if (input == "")
  		return 0;
  	else
  		return parseFloat(input);
  }

});
