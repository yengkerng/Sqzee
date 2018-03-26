var mongoose = require('mongoose');

var generalForumCommentSchema = mongoose.Schema({
   name : String,
   userId : { type : mongoose.Schema.Types.ObjectId, ref : "User"},
   userIP : String,
   absTime : Date,
   content : String,
   upVotes : Number,
   downVotes : Number,

   //responseTo is the id of the post of comment that this comment is commenting on. lol, that is a bit confusing. -Shane
   responseTo : { type : mongoose.Schema.Types.ObjectId, ref : "GeneralForum"},
   comments : [{ type : mongoose.Schema.Types.ObjectId, ref : "GeneralForumComment"}],
   facebookProfileURL: String,

   is_anonymous: Boolean
   
});

module.exports = mongoose.model('GeneralForumComment', generalForumCommentSchema);
