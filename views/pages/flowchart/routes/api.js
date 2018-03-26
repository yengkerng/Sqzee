var express = require('express');
var bodyParser = require('body-parser');

//Mongoose models
var Test = require('../config/models/test');

var router = express.Router();

router.get('/', function(req, res) {

    //Get all database objects
    Test.find({ }, function(error, posts){
        if (error) {
          res.json( {success: 'false', error: error} );
        }
        res.json({success : 'true', test : posts });
    });
});

router.post('/', function(req, res) {

    //Create new Test object
    var newTest = Test({
      Time : Date.now()
   });

   //Save test object to database
   newTest.save(function(error) {
      if (error) {
          res.json( {success: 'false', error: error} );
      }
      console.log('Added database object');
      res.json( {success : 'true'} );
   });
});



module.exports = router;