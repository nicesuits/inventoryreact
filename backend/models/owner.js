const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
  owner: String
});

module.exports = mongoose.model('Owner', OwnerSchema);
