var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var passport = require('passport');
router.use(bodyParser.json());


router.get('/test',
   function(req, res, next) {
      if (req.isAuthenticated()){
         next();
      } else {
         res.render('pages/index/mainPage(in_progress)', {loggedIn : false});
      }
   },
   function(req, res){
      res.render('pages/index/mainPage(in_progress)', {loggedIn : true});
   }
);

router.get('/error404', function(req, res) {
  //console.log("User does not have a facebook account" + req.url);
   res.render('pages/index/error404');
});

router.get('/',
   function(req, res, next){
      if (req.isAuthenticated()){
         next();
      }else{
         res.render('pages/index/mainPage(launch)', {loggedIn : false})
      }
   },
   function(req, res) {
     //console.log("A user made a request..." );
      res.render('pages/index/mainPage(launch)', {loggedIn : true});
   }
);

router.get('/error', function(req, res) {
  //console.log("A user made a request... " + req.url);
   res.render('pages/index/error');
});



router.get('/info',
   function(req, res, next){
      if (req.isAuthenticated()){
         next();
      }else{
         res.render("pages/index/info", {loggedIn : false})
      }
   },
   function(req, res) {
     //console.log("A user made a request..." );
      res.render("pages/index/info", {loggedIn : true});
   }
);

router.get('/signin', function(req, res) {
  //console.log("A user made a request..." + req.url);
   //response.render("pages/index/about");
});

router.get('/profile', isLoggedIn, function(req, res) {
 //console.log(req.isAuthenticated());
 //console.log(req.user);
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.returnTo = req.path;
  res.redirect('/auth/facebook');
}

module.exports = router;
