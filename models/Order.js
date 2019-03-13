const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
    customer: {type: Schema.Types.ObjectId, ref: 'User', require: true},
    productList: [
        {
            id: {type: Schema.Types.ObjectId, ref: 'Product', require: true},
            quantity: {type: Number, require: true, default: 1},
        },
    ],
    date: {type: Date, require: true},
    delliveryAddress: {type: String, require: true},
    paymentType: {type: String, require: true},
    status: {type: String, requre: true, default: 'in processing'},
});

module.exports = model('Order', orderSchema);
