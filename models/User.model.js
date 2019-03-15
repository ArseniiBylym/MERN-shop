const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {type: String, require: [true, `Name is required`]},
    email: {
        type: String,
        require: [true, `Email is required`],
        unique: true,
        validate: {
            validator: v => {
                const regExp = /\S+@\S+\.\S+/;
                return regExp.test(v);
            },
            message: () => `Not valid email`,
        },
    },
    password: {type: String, require: true},
    isAdmin: {type: Boolean, require: true, default: false},
    isBanned: {type: Boolean, require: true, default: false},
    refreshToken: {type: String, require: false},
});

module.exports = model('User', userSchema);
