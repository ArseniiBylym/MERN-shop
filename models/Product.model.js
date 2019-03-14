const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    name: {type: String, require: true, trim: true, maxlength: 50},
    description: {type: String, require: true, trim: true, maxlength: 300},
    price: {type: Number, require: true, min: 0},
    salePrice: {type: Number, require: false, min: 0},
    quantity: {type: Number, require: true, min: 0, default: 1},
    category: {type: String, requre: true, trim: true, maxlength: 20},
    subcategory: {type: String, require: false, trim: true, maxlength: 30},
    manufacture: {type: String, requre: false, trim: true, maxlength: 30},
    imgUrl: {type: String, require: false},
    reviews: [
        {
            author: {type: Schema.Types.ObjectId, ref: 'User', require: true},
            date: {type: Date, require: true},
            text: {type: String, reqire: true, maxlength: 200},
            rating: {type: Number, require: false, enum: [1, 2, 3, 4, 5]},
        },
    ],
});

module.exports = model('Product', productSchema);
