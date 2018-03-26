var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
  facebook_id : {type: String, unique : true},
  token : String,
  email : String,
  gender: String,
  name : String,
  friends : [String],
  education : {
    school : String,
    gradDate : String,
    major : String,
  },
  isAnonymous : Boolean,
  picture : String,
  enrolledClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class'}],

  forumPosts : [{ type : mongoose.Schema.Types.ObjectId, ref : "Forum"}],
  upvotedForumPosts : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Forum'}],
  downvotedForumPosts : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Forum'}],

  upvotedReviews : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
  downvotedReviews : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
  savedPosts : [{ type: mongoose.Schema.Types.ObjectId, ref: 'GeneralForum'}],

  generalPosts : [{ type : mongoose.Schema.Types.ObjectId, ref : "GeneralForum" }],
  generalComment : [{ type : mongoose.Schema.Types.ObjectId, ref : "GeneralForumComment" }],
  generalCommentComment : [{ type : mongoose.Schema.Types.ObjectId, ref : "GeneralForumCommentComment"}],

  upvotedGPosts : [{ type : mongoose.Schema.Types.ObjectId, ref : 'GeneralForum'}],
  downvotedGPosts : [{ type : mongoose.Schema.Types.ObjectId, ref : 'GeneralForum'}],
  upvotedGComments : [{ type : mongoose.Schema.Types.ObjectId, ref : "GeneralForumComment"}],
  downvotedGComments : [{ type : mongoose.Schema.Types.ObjectId, ref : "GeneralForumComment"}],
  upvotedGComComments : [{ type : mongoose.Schema.Types.ObjectId, ref : "GeneralForumCommentComment"}],
  downvotedGComComments : [{ type : mongoose.Schema.Types.ObjectId, ref : "GeneralForumCommentComment"}],

  comments : [{ type : mongoose.Schema.Types.ObjectId, ref : 'Comment'}],

  flowchart : String
});

module.exports = mongoose.model("User", userSchema);
