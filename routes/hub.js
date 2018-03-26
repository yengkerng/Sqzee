var express = require('express');
var router = express.Router();
var Class = require('../config/models/class');
var async = require('async');
var User = require('../config/models/user');
var Event = require('../config/models/timeline_event');
var _ = require('lodash');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

// router.get('/', isLoggedIn, function(req, res) {
//     var friends = req.user.friends;
//     Event.find({facebook_id : {$in : friends}}, function (err, events) {
//         converted_events = convertEventsToHTML(events);
//         res.json({'events' : converted_events});
//     });
// });

function convertEventsToHTML(events) {
    converted_events = [];
    _.sortBy(events, function(event) {
        return event.created + '';
    });
    _.forEach(events, function(event) {
        temp = "<p>" + event.name + " has ";
        if (event.event_type === "review_post") {
            temp += "posted a new class review.";
        } else if (event.event_type === "class_forum_post") {
            temp += "started a new post on the class forum.";
        } else if (event.event_type === "class_forum_reply") {
            temp += "replied to someone on the class forum.";
        } else if (event.event_type === "class_forum_vote") {
            temp += "voted on a class forum post.";
        } else if (event.event_type === "general_forum_post") {
            temp += "started a new post on the events forum.";
        } else if (event.event_type === "general_forum_vote") {
            temp += "voted on a post in the events forum.";
        } else if (event.event_type === "professor_review") {
            temp += "posted a new professor review.";
        }
        temp += "<br></br>"
        temp += " Check it out <a href='" + event.event_url + "'>here</a>.</p>";
        converted_events.push(temp);
    });
    return converted_events;
}

router.get('/',
    function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
           //console.log("User is trying to go to the hub... Not being logged in!");
            res.render('pages/hub/hub', { loggedIn: false, user: { "name": "NO USER", "picture": "./../../misc/professorPictures/placeholder.png", "education": { "school": "NO SCHOOL", "major": "NO MAJOR", "gradDate": "NO GRAD DATE" } }, enrolledClasses: {} });
        }
    },
    function (req, res) {
       //console.log("User is trying to go to the hub... Logged in as: " + req.user.name + '\n');
        ////console.log('User\'s enrolled classes: ');
        // req.user.enrolledClasses.forEach(function (enrolledClass) {
        //     Class.findById(enrolledClass, function (err, class0) {
        //        //console.log(class0.name);
        //     })
        // }, this);
        var enrolledClassList = [];
        async.each(req.user.enrolledClasses,
            function (id, callback) {
                Class.findById(id, function (error, enrolledClass) {
                    if (enrolledClass) {
                        enrolledClassList.push(enrolledClass);
                    }
                    callback(error);
                });
            },
            function(err) {
                if (err) throw err;
                enrolledClassList.sort(function(a,b){
                    if (a.department.localeCompare(b.department) == 0) {
                        return a.courseNum.localeCompare(b.courseNum);
                    } else {
                        return a.department.localeCompare(b.department)
                    }
                });
                var friends = req.user.friends;
                /*
                Event.find({facebook_id : {$in : friends}}, function (err, events) {
                    converted_events = convertEventsToHTML(events);
                    console.log(events);
                    //res.json({'events' : converted_events});
                    _.forEach(converted_events, function(event) {
                        console.log("Hello!");
                        console.log(event);
                    });
                    res.render('pages/hub/hub', { loggedIn: true, user: req.user, enrolledClasses: enrolledClassList, events : converted_events});
                });
                */
                Event.find({}, function (err, events) {
                    _.filter(events, function(event) {return friends.indexOf(event.facebook_id) != -1});
                    //converted_events = convertEventsToHTML(events);
                    //console.log(events);
                    //res.json({'events' : converted_events});
                    _.forEach(events, function(event) {
                    });
                    res.render('pages/hub/hub', { loggedIn: true, user: req.user, enrolledClasses: enrolledClassList, events : events});
                });
                //res.render('pages/hub/hub', { loggedIn: true, user: req.user, enrolledClasses: enrolledClassList});
            }
        );
    }
);

router.get('/delete_account', function(req, res, next) {
    if (req.isAuthenticated()) {
        console.log(req.user.facebook_id);
        User.findOne({facebook_id : req.user.facebook_id}, function(err, user) {
            console.log(user.facebook_id);
        });
    }
});

module.exports = router;
