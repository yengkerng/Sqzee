var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var async = require('async');
var _ = require('lodash');

var User = require('../config/models/user');
var Event = require('../config/models/timeline_event');
require('datejs');

var router = express.Router();

router.get('/', isLoggedIn, function(req, res) {
    var friends = req.user.friends;
    Event.find({facebook_id : {$in : friends}}, function (err, events) {
        converted_events = convertEventsToHTML(events);
        res.json({'events' : converted_events});
    });
});

function convertEventsToHTML(events) {
	converted_events = [];
	_.sortBy(events, function(event) {
		return event.created + '';
	}).forEach(events, function(event) {
		temp = "<p>" + event.name + " has ";
		if (event.event_type === "review_post") {
			temp += "posted a new class review.";
		} else if (event.event_type === "class_forum_post") {
			temp += "posted something on the class forum.";
		} else if (event.event_type === "class_forum_reply") {
			temp += "replied to someone on the class forum.";
		} else if (event.event_type === "class_forum_vote") {
			temp += "voted on a class forum post.";
		} else if (event.event_type === "general_forum_post") {
			temp += "posted something on the general forum.";
		} else if (event.event_type === "general_forum_vote") {
			temp += "voted on something in the general forum.";
		} else if (event.event_type === "professor_review") {
			temp += "posted a new professor review.";
		}
		temp += " Check it out <a href='" + event.event_url + "'>here</a>.</p>";
		converted_events.push(temp);
	});
	return converted_events;
}

/*
	var timeline_event_schema = mongoose.Schema({
	   facebook_id : {type: String, unique : true},
	   name : String,
	   event_type : String,
	   event_url : String,
	   created: Date
	});

	event_type glossary:
	review_post -> class review
	class_forum_post -> class forum post
	class_forum_reply -> class forum reply
	class_forum_vote -> upvote or downvote for class forum post
	general_forum_post -> general forum post/comment
	general_forum_vote -> upvote or downvote for forum post/subpost/etc.
	professor_review -> professor review
*/

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.returnTo = req.path;
    res.redirect('/auth/facebook');
}

module.exports = router;