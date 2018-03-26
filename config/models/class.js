var mongoose = require('mongoose');

var classSchema = mongoose.Schema({
   name : String,
   department : String,
   courseNum: String,
   description : String,
   ge : String,
   units : String,
   nextQtrProfessors: [{ type: mongoose.Schema.Types.ObjectId , ref: 'Professor' }],
   currQrtProfessors: [{ type: mongoose.Schema.Types.ObjectId , ref: 'Professor' }],
   previousQrtProfessors: [{ type: mongoose.Schema.Types.ObjectId , ref: 'Professor' }],
   rating: Number,
   numRatings: Number,
   numHrs: Number,
   timeCommitment: Number,

   forumPosts : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Forum'}],
   reviews : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
});

module.exports = mongoose.model('Class', classSchema);