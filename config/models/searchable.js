var mongoose = require('mongoose');

var searchableSchema = mongoose.Schema({
   searchable: [String],
   depSearchable: [String],
   whenCreated: String
});

module.exports = mongoose.model('Searchable', searchableSchema);
