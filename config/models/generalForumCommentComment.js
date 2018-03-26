var mongoose = require('mongoose');

var generalForumCommentCommentSchema = mongoose.Schema({
   name : String,
   userId : { type : mongoose.Schema.Types.ObjectId, ref : "User"},
   userIP : String,
   absTime : Date,
   content : String,
   upVotes : Number,
   downVotes : Number,

   //responseTo is the id of the comment that this comment is commenting on. lol, that is a bit confusing. -Shane
   responseTo : { type : mongoose.Schema.Types.ObjectId, ref : "GeneralForumComment"},

   is_anonymous: Boolean
});

module.exports = mongoose.model('GeneralForumCommentComment', generalForumCommentCommentSchema);
