const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {objectWithoutKeys} = require('../utils/helpers');

const User = require('../models/User');

// @route   GET api/user
// @desc    Get user data
// @access  Private
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select({password: 0});
        res.status(200).json(user);
    } catch (error) {
        error.message = `Can't get user data from database`;
        next(error);
    }
};

// @route   POST api/user/signup
// @desc    POST create new user
// @access  Public
exports.signupUser = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({msg: `Validation failed`, errors: validationErrors.array()});
    }
    const {name, email, password} = req.body;

    try {
        const existedUser = await User.findOne({email});
        if (existedUser) {
            const error = new Error(`User already exists`);
            error.statusCode = 400;
            throw error;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        const token = jwt.sign(
            {
                email: savedUser.email,
                id: savedUser._id.toString(),
            },
            process.env.JWT_SECRET_KEY,
            {expiresIn: '1h'},
        );
        return res.status(201).json({
            token,
            user: objectWithoutKeys(savedUser._doc, ['password', '__v']),
        });
    } catch (error) {
        next(error);
    }
};

// @route   POST api/user
// @desc    POST login user
// @access  Public
exports.loginUser = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({msg: `Validation failed`, errors: validationErrors.array()});
    }
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            const error = new Error(`Wrong email`);
            error.statusCode = 400;
            throw error;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            const error = new Error('Wrong password');
            error.statusCode = 400;
            throw error;
        }

        const token = jwt.sign(
            {
                email: user.email,
                id: user._id.toString(),
            },
            process.env.JWT_SECRET_KEY,
            {expiresIn: '1h'},
        );

        res.status(200).json({
            token,
            user: objectWithoutKeys(user._doc, ['password', '__v']),
        });
    } catch (error) {
        next(error);
    }
};
