const {body} = require('express-validator/check');

exports.loginValidation = [
    body('email')
        .exists()
        .trim()
        .isEmail()
        .withMessage(`Email is not correct`),
    body('password')
        .trim()
        .isLength({min: 3})
        .withMessage(`Password should contains 3 symbols at least`),
];

exports.signupValidation = [
    body('name')
        .exists()
        .trim()
        .isLength({min: 1})
        .withMessage(`User name is required`),
    body('email')
        .exists()
        .trim()
        .isEmail()
        .withMessage(`Email is required`),
    body('password')
        .trim()
        .isLength({min: 3})
        .withMessage(`Password is required and should contains 3 symbols at least`),
    body('confirmPassword').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Passwords are not matched');
        }
        return true;
    }),
];
