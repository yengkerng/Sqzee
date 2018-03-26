var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
   user : String,
   review : String,
   grade : String,
   class : String,
   grade_received : String,
   is_anonymous : Boolean,
   professor : [{ type: mongoose.Schema.Types.ObjectId , ref: 'Professor' }],
   professor_name : String,
   rating : String,     //This is either a difficulty rating for a class or it is a rating out of 4 for professors.
   upvotes : Number,
   downvotes : Number,
   timeAgo : String,
   hrsPerWeek : String,
   difficulty : String,


   //Mitchell added absTime because timeAgo is inconvenient to work with.
   //It is a JS date object, and if the review is from polyratings it is
   //converted to the first of the month at midnight. This converstion is
   //done/checked every time a review is loaded from the database on the
   //professor page or class page
   absTime : Date
});

module.exports = mongoose.model('Review', reviewSchema);
