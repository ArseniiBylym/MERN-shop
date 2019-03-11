const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    price: {type: Number, require: true},
    salePrice: {type: Number, require: false},
    quantity: {type: Number, require: true},
    category: {type: String, requre: true},
    subCategory: {type: String, require: false},
    manufacture: {type: String, requre: false},
});

module.exports = model('User', productSchema);
