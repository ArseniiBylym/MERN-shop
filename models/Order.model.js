const {Schema, model} = require('mongoose');

const orderSchema = new Schema(
    {
        name: {type: String, require: true},
        email: {type: String, require: true},
        productList: [
            {
                _id: {type: Schema.Types.ObjectId, ref: 'Product', require: true},
                quantity: {type: Number, require: true, default: 1},
            },
        ],
        delliveryAddress: {type: String, require: true},
        delliveryService: {type: Number, require: true, enum: [1, 2]},
        details: {type: String, require: false},
        paymentType: {type: Number, require: true, enum: [1, 2]},
        status: {type: Number, requre: true, enum: [1, 2, 3, 4, 5, 6], default: 1},
    },
    {timestamps: true},
);

module.exports = model('Order', orderSchema);
