const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    name: {type: String, require: true, trim: true, maxlength: 50},
    description: {type: String, require: true, trim: true,},
    price: {type: Number, require: true, min: 0},
    quantity: {type: Number, require: true, min: 0, default: 1},
    category: {type: String, requre: true, trim: true, maxlength: 20},
    subCategory: {type: String, require: true},
    details: String,
    salePrice: Number,
    manufacture: String,
    imageUrl: String,
    reviews: [
        {
            author: {type: Schema.Types.ObjectId, ref: 'User', require: true},
            date: {type: Date, require: true},
            text: {type: String, reqire: true, maxlength: 200},
            raiting: {type: Number, enum: [1, 2, 3, 4, 5]},
        },
    ],
});

productSchema.query.byName = function(name) {
    return this.where({name: new RegExp(name, 'i')});
}

productSchema.virtual('averageRaiting').get(function () {
    const docsWithRaiting = this.reviews.filter(item => item.raiting)
    return docsWithRaiting.reduce((prev, current) => {
        return prev + current.raiting;
    }) / docsWithRaiting.length;
})

module.exports = model('Product', productSchema);
