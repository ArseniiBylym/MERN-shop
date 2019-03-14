const {Schema, model} = require('mongoose');

const orderSchema = new Schema(
    {
        customer: {type: Schema.Types.ObjectId, ref: 'User', require: true},
        productList: [
            {
                id: {type: Schema.Types.ObjectId, ref: 'Product', require: true},
                quantity: {type: Number, require: true, default: 1},
            },
        ],
        delliveryAddress: {type: String, require: true},
        paymentType: {type: String, require: true, enum: ['privat24', 'receipt']},
        status: {type: String, requre: true, enum: ['processing', 'paid', 'sent', 'completed', 'rejected'], default: 'processing'},
    },
    {timestamps: true},
);

module.exports = model('Order', orderSchema);
