const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    price: {type: Number, require: true},
    salePrice: {type: Number, require: false},
    quantity: {type: Number, require: true, default: 1},
    category: {type: String, requre: true},
    subcategory: {type: String, require: false},
    manufacture: {type: String, requre: false},
    imgUrl: {type: String, require: false},
    reviews: {
        type: [
            {
                author: {type: String, require: true},
                date: {type: Date, require: true},
                text: {type: String, reqire: true},
                rating: {type: Number, require: false},
            },
        ],
        require: false,
        default: [],
    },
});

module.exports = model('Product', productSchema);
