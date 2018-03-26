var mongoose = require('mongoose');

var testSchema = mongoose.Schema({
   Time : Date
});

module.exports = mongoose.model('Test', testSchema);