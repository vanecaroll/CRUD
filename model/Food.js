const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Food = new Schema({
  restaurant: {
    type: String
  },
  price: {
    type: Number
  },
  food_name: {
    type: String
  },
  drink_name: {
    type: String
  }
},{
    collection: 'food'
});

module.exports = mongoose.model('Food', Food);