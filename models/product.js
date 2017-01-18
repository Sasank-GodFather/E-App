var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    _id: {type: Number},
    category: {type: String},
    item: {type: String},
    qty: {type: Number},
    type: {type: String},
    url: {type: String},
    description: {type: String},
    price: {type: Number}
},{collection:'products'});

module.exports = mongoose.model('Product', schema);