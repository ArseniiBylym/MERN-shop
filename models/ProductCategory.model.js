const {Schema, model} = require('mongoose');

const productCategorySchema = new Schema({
    categoryName: {type: String, require: true},
    // subCategories: [{type: String, require: true}],
    subCategories: {type: Array, require: true, default: []},
});

module.exports = model('Product_category', productCategorySchema);
