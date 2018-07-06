const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: String,
  title: String,
  desc: String,
  price: Number,
  image: String,
}, { timestamps: true });


module.exports = mongoose.model('Product', ProductSchema);
