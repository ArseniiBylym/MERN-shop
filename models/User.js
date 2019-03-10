const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, requre: true},
    password: {type: String, require: true},
    isAdmin: {type: Boolean, require: true},
    isBanned: {type: Boolean, require: true},
    cart: {type: Array, require: true}
});

module.exports = model('User', userSchema);
