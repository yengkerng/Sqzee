var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var async = require('async');

var Class = require('../config/models/class');
var Professor = require('../config/models/professor');

var Fuse = require('fuse');

router.use(bodyParser.json());

router.get('/', function(req, res) {
   res.render('pages/search/test');
});

router.post('/', function(req, res) {
   var dic = [];
   var depDic = [];
   var query = req.body.query;
   Class.find({ }, function(err, classes) {
      classes.forEach( function (class0) {
         dic.push(class0);
         //depDic.push(class0.department + ' ' + class0.courseNum);
      });

      Professor.find({ }, function(err, professors) {
         professors.forEach( function (professor) {
            dic.push(professor.name);
         });

         //console.log('dic is: ' + dic + '\n');
        //console.log('Query: ' + query + '\n');

         var matches = [];
         var depMatches = [];

         var options = {
            caseSensitive: false,
            shouldSort: true,
            keys: [
               "name"
            ]
         }

         var optionsDep = {
            caseSensitive: false,
            shouldSort: true,
            keys: [
               "department",
               "courseNum"
            ]
         }

         var fuse = new Fuse(dic, options);
         var fuseDep = new Fuse(dic, optionsDep);
         matches = fuse.search(query);
         depMatches = fuseDep.search(query);
         //depMatches = SearchDic(query, depDic, i);

         if (matches.length == 1) {
            Class.findOne({ name : matches[0].name }, function(error, class0){
               if (class0) {
                  res.redirect('/class/' + class0.department + "-" + class0.courseNum);
               } else {
                  Professor.findOne({ name: matches[0].name }, function(error, professor) {
                     if (professor) {
                        res.redirect('/professor/' + professor._id);
                     } else {
                        res.redirect('/index/error404');
                     }

                  });
               }
            });
         } else if (depMatches.length == 1) {
            res.redirect('/class/' + depMatches[0].department + "-" + depMatches[0].courseNum);

         } else {
            var objs = [];
            async.each(matches, function(el, cb) {
               Class.find({name : el.name}, function(error, classes) {
                  classes.forEach(function(class0) {
                     objs.push({type: 'class', obj: class0});
                  });
                  Professor.find({ name: el.name }, function(error, professors) {
                     professors.forEach(function(professor) {
                        objs.push({type: 'professor', obj: professor});
                     });
                     cb();
                  });
               });

            }, function(err) {
               async.each(depMatches, function(el, cb) {
                  Class.find({ department: depMatches.department, courseNum: depMatches.courseNum }, function(error, classes) {
                     classes.forEach(function(class0) {
                        objs.push({type: 'class', obj: class0});
                     });
                     cb();
                  });

               }, function(err) {

                  res.render("pages/search/results", { objs : objs});
               });
            });
         }

      });

   });

   //console.log("A user made a request... " + request.url);
});

module.exports = router;
