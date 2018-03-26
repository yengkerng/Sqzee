var express = require('express');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var configDB = require('./config/database');
var session = require('express-session');

//Switch this var to true before pushing to Heroku branch.
//Also this is gleobally available, so be careful
//t


isProduction = false;
//isProduction = true;

mongoose.connect(configDB.url);
mongoose.connection.on('error', function(){

});

//import routes
var index = require('./routes/index');
var classes = require('./routes/classes');
var professors = require('./routes/professors');
var forum = require('./routes/forums');
var hub = require('./routes/hub');
var search = require('./routes/search');
var enroll = require('./routes/enroll');
var general_forum = require('./routes/general-forum');
var timeline_event = require('./routes/timeline');
var forceSSL = require('express-force-ssl');
var fs = require('fs');
var hskey = fs.readFileSync("SSL/server.key");
var hscert = fs.readFileSync("SSL/sqzee.com.crt")

var options = {
    key: hskey,
    cert: hscert
};
var app = express();

//force SSL redirect
if(isProduction) {
  app.use(function(req, res, next) {
    if((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
        return res.redirect('http://' + req.get('Host') + req.url);
    }
    else
        next();
});
}


// FIXED: These two lines need to be here in order for posting to work properly.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var passport = require('passport');
app.use(session({secret : "camelcase > underscore", secure: false}));
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.set('port', (process.env.PORT || 8080));

app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

//add middleware for routes
app.use('/', index);
app.use('/class', classes);
app.use('/professor', professors);
app.use('/forum', forum);
app.use('/hub', hub);
app.use('/search', search);
app.use('/enroll', enroll);
app.use('/general-forum', general_forum);
app.use('/timeline_event', timeline_event);

app.get('/auth/facebook', function(req, res, next){
      //I tried for hours to figure out a clean way to go this. This line was the best I could find.
      req.session.returnTo = req.headers.referer.slice(21);
      passport.authenticate('facebook', {
         scope: ['public_profile', 'email',
         'user_education_history', 'user_friends']
      })(req, res, next);
   }
);

app.get('/auth/facebook/callback',
   passport.authenticate('facebook', {
      successReturnToOrRedirect: '/hub',
      failureRedirect: '/error'
   })
);

app.get('/auth/facebooknoredirect', function(req, res, next){

      //I tried for hours to figure out a clean way to go this. This line was the best I could find.
      passport.authenticate('facebook', {
         scope: ['public_profile', 'email',
         'user_education_history', 'user_friends']
      })(req, res, next);
   }
);

app.get('/auth/facebooknoredirect/callback',
   passport.authenticate('facebook', {
      successReturnToOrRedirect: '/hub',
      failureRedirect: '/error'
   })
);

app.get('/logout', function(req, res) {
 //console.log("logging out");
  req.logout();
  res.redirect('/');
});

app.listen(app.get('port'), function() {
   console.log('Node app is running on port', app.get('port'));
});

//This has to be at the end. It is a redirect in case a URL is incorrect.
app.get('*', function(request, response){
 //console.log(request['socket']['remoteAddress']);
 //console.log("A user requested a BAD URL... " + request.url);
  response.redirect("/");
});
