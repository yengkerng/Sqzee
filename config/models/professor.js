var mongoose = require('mongoose');

var professorSchema = mongoose.Schema({
   name : String,
   college : String,
   department : String,
   phoneNum : String,
   title : String,
   email : String,
   picture: String,
   rating: Number,
   numRatings: Number,
   polyRating: Number,
   numPolyRatings: Number,
   actualRating : Number,
   reviews: [{ type: mongoose.Schema.Types.ObjectId , ref: 'Review' }],
   nextQtrClasses: [{ type: mongoose.Schema.Types.ObjectId , ref: 'Class' }],
   currQrtClasses: [{ type: mongoose.Schema.Types.ObjectId , ref: 'Class' }],
   previousQrtClasses: [{ type: mongoose.Schema.Types.ObjectId , ref: 'Class' }]
});

module.exports = mongoose.model('Professor', professorSchema);
