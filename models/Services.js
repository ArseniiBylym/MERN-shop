const {Schema, model} = require('mongoose');

const serviceSchema = new Schema({
    name: {type: String, require: true},
    price: {type: Number, require: true},
    category: {type: String, requre: true},
});

module.exports = model('Service', serviceSchema);
