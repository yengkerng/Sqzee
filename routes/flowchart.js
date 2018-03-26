var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var passport = require('passport');
router.use(bodyParser.json());


router.get('/',
   function(req, res, next){
      if (req.isAuthenticated()){
         next();
      }else{
         res.sendFile('/Users/yeng/sqzee/views/pages/flowchart/src/index.tpl.html')
      }
   },
   function(req, res) {
     //console.log("A user made a request..." );
      res.sendFile('/Users/yeng/sqzee/views/pages/flowchart/src/index.tpl.html');
   }
);
module.exports = router;
