const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, requre: true},
    password: {type: String, require: true},
    isAdmin: {type: Boolean, require: true, default: false},
    isBanned: {type: Boolean, require: true, default: false},
    cart: {type: Array, require: true, default: []},
    refreshToken: {type: String, require: false},
});

module.exports = model('User', userSchema);
