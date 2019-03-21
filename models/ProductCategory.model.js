const {Schema, model} = require('mongoose');

const productCategorySchema = new Schema({
    categoryName: {type: String, require: true, trim: true, maxlength: 20},
    subCategories: [
        {
            name: {type: String, require: true},
            image: {type: String, require: false}
        }
    ]
        // {type: Array, require: true, default: []}],
});

module.exports = model('Product_category', productCategorySchema);
