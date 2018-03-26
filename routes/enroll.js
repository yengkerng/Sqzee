var express = require('express');
var router = express.Router();
var Class = require('../config/models/class');

var bodyParser = require('body-parser');

router.use(bodyParser.json());

/*
router.get('/:classDepartment-:classNumber',
    function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
           //console.log("User is trying to enroll... Not being logged in!");
            res.redirect('/class/' + req.params.classDepartment + '-' + req.params.classNumber);
        }
    },
    function (req, res) {
       //console.log("User is trying to enroll... Logged in as: " + req.user.name);
        Class.findOne({ department: req.params.classDepartment, courseNum: req.params.classNumber }, function (err, passedInClass) {
            if (err) throw err;
            req.user.enrolledClasses.push(passedInClass);
            req.user.save(function (err) {
                if (err) throw err;
               //console.log("Updated user...");
                res.redirect('/forum/' + req.params.classDepartment + '-' + req.params.classNumber);
            });
        });
    }
);
*/

router.get('/:classDepartment-:classNumber',
    function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
           //console.log("User is trying to enroll... Not being logged in!");
            res.redirect('/class/' + req.params.classDepartment + '-' + req.params.classNumber);
        }
    },
    function (req, res) {
       //console.log("User is trying to enroll... Logged in as: " + req.user.name);
        Class.findOne({ department: req.params.classDepartment, courseNum: req.params.classNumber }, function (err, passedInClass) {
            if (err) throw err;
            var class_id = passedInClass._id + "";
            var index = index_of_enrolled_class(req.user, class_id);
            if (index == -1) {
                req.user.enrolledClasses.push(passedInClass);
                req.user.save(function (err) {
                    if (err) throw err;
                   //console.log("Updated user...");
                   res.redirect('/class/' + req.params.classDepartment + '-' + req.params.classNumber);

                });
            } else {
               //console.log("User is already enrolled in class");
            }
        });

    }
);

router.get('/:classDepartment-:classNumber/unenroll',
    function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
           //console.log("User is trying to enroll... Not being logged in!");
            res.redirect('/class/' + req.params.classDepartment + '-' + req.params.classNumber);
        }
    },
    function (req, res) {
       //console.log("User is trying to unenroll... Logged in as: " + req.user.name);
        Class.findOne({ department: req.params.classDepartment, courseNum: req.params.classNumber }, function (err, passedInClass) {
            if (err) throw err;
            var class_id = passedInClass._id + "";
            var index = index_of_enrolled_class(req.user, class_id);
            if (index == -1) {
               //console.log("User is not in class");
            } else {
               //console.log("Unenrolling user from class " + passedInClass._id);
                req.user.enrolledClasses.splice(index, 1);
                req.user.save(function (err) {
                    if (err) throw err;
                   //console.log("Updated user...");
                   res.redirect('/hub/');
                });
            }

            // res.redirect('/class/' + req.params.classDepartment + '-' + req.params.classNumber);


        });
    }
);

function index_of_enrolled_class(user, passed_in_class) {
  var class_index = -1;
  for (var i = 0; i < user.enrolledClasses.length; i++) {
   //console.log("Comparing " + user.enrolledClasses[i] + " and " + passed_in_class);
    if (user.enrolledClasses[i] + "" == passed_in_class + "") {
      class_index = i;
      break;
    }
  }
  return class_index;
}

module.exports = router;
