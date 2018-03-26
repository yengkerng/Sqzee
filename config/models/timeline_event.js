var mongoose = require('mongoose');

var timeline_event_schema = mongoose.Schema({
   facebook_id : String,
   anonymous: Boolean, 
   picture : String,
   name : String,
   event_type : String,
   event_url : String,
   created: Date
});

module.exports = mongoose.model('Timeline_Event', timeline_event_schema);
/*
	event_type glossary:
	review_post -> class review
	class_forum_post -> class forum post
	class_forum_reply -> class forum reply
	class_forum_vote -> upvote or downvote for class forum post
	general_forum_post -> general forum post/comment
	general_forum_vote -> upvote or downvote for forum post/subpost/etc.
	professor_review -> professor review
*/
