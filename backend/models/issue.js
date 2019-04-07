const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  status: String,
  owner: String,
  created: Date,
  effort: Number,
  completionDate: Date,
  title: String
});

module.exports = mongoose.model('Issue', IssueSchema);
