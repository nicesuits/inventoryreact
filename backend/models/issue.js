const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  status: String,
  ownerId: String,
  created: Date,
  effort: Number,
  completionDate: Date,
  title: String
});

module.exports = mongoose.model('Issue', issueSchema);
