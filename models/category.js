const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: { type: String, unique: true, required: true}
}, { timestamp: true });

module.exports = mongoose.model('Category', CategorySchema);
