const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {errorHandler, errorValidationHandlerMap} = require('../utils/helpers');

const User = require('../models/User.model');

// @route   GET api/user
// @desc    Get user data
// @access  Private
exports.getUser = async (req, res, next) => {
    try {
        // const user = await User.findById(req.user.id).select({password: 0});
        const user = await User.findById(req.user.id).select('-password -__v');
        if (!user) throw new Error(`User not found`);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// @route   POST api/user/signup
// @desc    POST create new user
// @access  Public
exports.signupUser = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            errorHandler(`Validation failed`, 400, errorValidationHandlerMap(validationErrors.array()));
        }
        const {name, email, password} = req.body;

        const existedUser = await User.findOne({email});
        if (existedUser) errorHandler(`User already exists`, 400);
        // {
        //     const error = new Error(`User already exists`);
        //     error.statusCode = 400;
        //     throw error;
        // }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = jwt.sign(
            {
                email: user.email,
                id: user._id.toString(),
            },
            process.env.JWT_SECRET_KEY,
            {expiresIn: '1d'},
        );

        user.password = undefined;
        user.__v = undefined;
        return res.status(201).json({token, user});
    } catch (error) {
        next(error);
    }
};

// @route   POST api/user
// @desc    POST login user
// @access  Public
exports.loginUser = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email}).exec();
        if (!user) errorHandler(`Wrong email`, 400, [{field: 'email', errorMessage: 'Wrong email'}]);

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) errorHandler(`Wrong password`, 400, [{field: 'password', errorMessage: 'Wrong password'}]);

        const token = jwt.sign(
            {
                email: user.email,
                id: user._id.toString(),
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            {expiresIn: '1d'},
        );

        user.password = undefined;
        user.__v = undefined;
        res.status(200).json({token, user});
    } catch (err) {
        next(err);
    }
};
