var mongoose = require('mongoose');

var forumSchema = mongoose.Schema({
   title : String,
   author : String,
   mainText: String,
   type: String,
   is_anonymous: Boolean,
   comments: [{ type: mongoose.Schema.Types.ObjectId , ref: 'Comment' }],
   upvotes: Number,
   downvotes: Number,
   timeAgo: String,
   class: String,

   facebookProfileUrl : String,

   absTime : Date
});

module.exports = mongoose.model('Forum', forumSchema);
