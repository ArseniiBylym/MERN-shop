const {Schema, model} = require('mongoose');

const serviceSchema = new Schema({
    category: {type: String, requre: true, unique: true},
    serviceList: [
        {
            serviceName: {type: String, requre: true, unique: true},
            servicePrice: {type: Number, require: true},
        },
    ],
});

module.exports = model('Service', serviceSchema);
