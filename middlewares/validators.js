const {body} = require('express-validator/check');

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
        .withMessage(`Email is required and should be a valid email`),
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

exports.productCreateValidation = [
    body('name')
        .exists()
        .trim()
        .isLength({min: 3, max: 50})
        .withMessage(`Name is required and should contains from 3 to 50 symbols`),
    body('description')
        .trim()
        .isLength({min: 5, max: 200})
        .withMessage(`Description is required and should contains from 5 to 200 symbols`),
    body('price')
        .isNumeric()
        .withMessage(`Price is required and should be a number`),
    body('category')
        .trim()
        .isLength({min: 3, max: 20})
        .withMessage(`Category is required and should contains from 3 to 20 symbols`),
    // body('imgUrl')
    //     .isBase64()
    //     .withMessage(`Immage should be converted to base64 format`),
];

exports.productUpdateValidation = [
    body('name')
        .trim()
        .isLength({min: 3, max: 50})
        .withMessage(`Name is should contains from 3 to 50 symbols`),
    body('description')
        .trim()
        .isLength({min: 5, max: 200})
        .withMessage(`Description is should contains from 5 to 200 symbols`),
    body('price')
        .isNumeric()
        .withMessage(`Price is should be a number`),
    body('category')
        .trim()
        .isLength({min: 3, max: 20})
        .withMessage(`Category is should contains from 3 to 20 symbols`),
    // body('imgUrl')
    //     .isBase64()
    //     .withMessage(`Immage should be converted to base64 format`),
];
