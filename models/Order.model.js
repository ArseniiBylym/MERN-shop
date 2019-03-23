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
        status: {type: String, requre: true, enum: ['processing', 'paid', 'sent', 'completed', 'rejected'], default: 'processing'},
    },
    {timestamps: true},
);

module.exports = model('Order', orderSchema);
