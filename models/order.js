var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    custName: {type: String, required: true},
    custAddress: {type: String, required: true},
    custNumber: {type: String, required: true},
    custEmail: {type: String, required: true},
    paymentId: {type: String, required: true},
    cart: {type: Object, required: true}
});

module.exports = mongoose.model('Order', schema);