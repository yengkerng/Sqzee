var mongoose = require('mongoose');

var generalForumSchema = mongoose.Schema({
   name : String,
   userId : { type : mongoose.Schema.Types.ObjectId, ref : "User"},
   userIP : String,
   absTime : Date,
   categories : [ String ],
   event_time: String,
   event_location: String,
   event_date: String,
   club_name: String,
   event_title: String,
   content : String,
   upvotes : Number,
   downvotes : Number,
   disValue: Number,
   comments : [{ type : mongoose.Schema.Types.ObjectId, ref : "GeneralForumComment"}],
   facebookProfileURL: String,
   facebookPicture: String,
   is_anonymous: Boolean
});

module.exports = mongoose.model('GeneralForum', generalForumSchema);
