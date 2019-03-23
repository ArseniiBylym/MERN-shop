const {Schema, model} = require('mongoose');

const cartSchema = new Schema(
    {
        cart: [
            {
                product: {type: Schema.Types.ObjectId, ref: 'Product', require: true},
                quantity: {type: Number, require: true},
            },
        ],
    },
    {
        timestamps: true,
    },
);

module.exports = model('Cart', cartSchema);
