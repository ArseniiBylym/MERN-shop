const {Schema, model} = require('mongoose');

const typeSchema = new Schema({
    group: {type: String, require: true, enum: ['orderStatus', 'dellivery', 'payment']},
    name: {type: String, requre: true, unique: true},
    value: {type: Number, required: true} 
})

module.exports = model('Type', typeSchema)