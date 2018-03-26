var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var async = require('async');

var fuzzy = require('fuzzy');
var leven = require('leven');

var Class = require('../config/models/class');
var Professor = require('../config/models/professor');

function SearchDic(query, dic, levenVal) {
   var results = fuzzy.filter(query, dic);
   var levenDown = results.filter(function(el) {
      var wordsInRes = el.string.split('[-\\s]');
      var wordsInQuery = query.split('[-\\s]');
      var retVal = false;
      wordsInRes.forEach(function(word) {
         wordsInQuery.forEach(function(qWord) {
            word = word.toLowerCase();
            qWord = qWord.toLowerCase();
           //console.log('Query Word: ' + qWord + '\n Result Word: ' + word + '\n Leven: ' + leven(qWord, word));
            if (qWord.length <= 3 - levenVal) {
               if (leven(qWord, word) == 0) {
                  retVal =  true;
               }
               if (word.includes(qWord)) {
                  //retVal = true;
               }
            } else {
               if (leven(qWord, word) <= levenVal) {
                  retVal =  true;
               }
               if (word.includes(qWord)) {
                  retVal = true;
               }
            }
         });
      });
      return retVal;
   });
   return levenDown.map(function(el) { return el.string; });
}

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
         dic.push(class0.name);
         depDic.push(class0.department + ' ' + class0.courseNum);
      });

      Professor.find({ }, function(err, professors) {
         professors.forEach( function (professor) {
            dic.push(professor.name);
         });

         //console.log('dic is: ' + dic + '\n');
        //console.log('Query: ' + query + '\n');

         var matches = [];
         var depMatches = [];
         var i = 0;
         while(matches.length + depMatches.length == 0 && i < 4) {
            matches = SearchDic(query, dic, i);
            depMatches = SearchDic(query, depDic, i);
            i++;
         }
        //console.log(matches);
        //console.log(depMatches);
         if (matches.length == 1) {
            Class.findOne({ name : matches[0] }, function(error, class0){
               if (class0) {
                  res.redirect('/class/' + class0.department + "-" + class0.courseNum);
               } else {
                  Professor.findOne({ name: matches[0] }, function(error, professor) {
                     if (professor) {
                        res.redirect('/professor/' + professor._id);
                     } else {
                        res.redirect('/index/404');
                     }

                  });
               }
            });
         } else if (depMatches.length == 1) {
            var depWords = depMatches[0].split(' ');
            var department = depWords[0];
            var courseNum = depWords[1];
            res.redirect('/class/' + department + "-" + courseNum);

         } else {
            var objs = [];
            async.each(matches, function(el, cb) {
               Class.find({name : el}, function(error, classes) {
                  classes.forEach(function(class0) {
                     objs.push({type: 'class', obj: class0});
                  });
                  Professor.find({ name: el }, function(error, professors) {
                     professors.forEach(function(professor) {
                        objs.push({type: 'professor', obj: professor});
                     });
                     cb();
                  });
               });

            }, function(err) {
               async.each(depMatches, function(el, cb) {
                  var words = el.split(' ');
                  var dep = words[0];
                  var num = words[1];
                  Class.find({ department: dep, courseNum: num }, function(error, classes) {
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
