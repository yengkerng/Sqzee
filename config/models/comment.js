var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
   comment : String,
   author : String,
   authorId : { type : mongoose.Schema.Types.ObjectId , ref : "User"},
   forum : { type : mongoose.Schema.Types.ObjectId , ref : "Forum"},
   timeAgo: String,
   absTime : Date
});

module.exports = mongoose.model('Comment', commentSchema);
