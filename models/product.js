var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    _id: {type: Number, required: true},
    category: {type: String, required: true},
    item: {type: String, required: true},
    qty: {type: Number, required: true},
    type: {type: String, required: true},
    url: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true}
});

module.exports = mongoose.model('Product', schema);