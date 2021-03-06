const {validationResult} = require('express-validator/check');

const Product = require('../models/Product.model');

exports.getProduct = async (req, res, next) => {
    const {category, subCategory, name, saleProduct} = req.query;
    let products = [];
    let totalCount = 0;
    try {
        if (saleProduct) {
            products = await Product.find({salePrice: {$gt: 0}}).select('name price salePrice imageUrl category subCategory').exec();
        } else if (name) {
            products = await Product.find().byName(name).select('name price imageUrl category subCategory').exec();
        } else if (category && subCategory) {
            products = await Product.find({category, subCategory}).select('-description -details -reviews -__v').exec();
        } else if (category && !subCategory) {
            products = await Product.find({category}).select('name price imageUrl category').exec();
        } else {
            products = await Product.find().select('name price imageUrl').exec();
        }
        totalCount = products.length;
        res.status(200).json({products, totalCount});
    } catch (error) {
        error.message = `Can't get product data from database`;
        next(error);
    }
};

exports.getProductDetails = async (req, res, next) => {
    const {prodId} = req.params;
    try {
        const product = await Product.findById(prodId).populate('reviews.author', 'name').exec();
        if (!product) {
            const error = new Error();
            error.statusCode = 400;
            throw error;
        }
        return res.status(200).json(product);
    } catch (error) {
        error.message = `Can't get product details data from database`;
        next(error);
    }
};

exports.createProduct = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({msg: `Product can not be created, validation failed`, errors: validationErrors.array()});
    }
    const product = new Product({...req.body});

    try {
        const result = await product.save();
        res.status(201).json({msg: `New product was successfully created`, product: result._doc});
    } catch (error) {
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    const {prodId} = req.params;
    try {
        const product = await Product.findById(prodId).select({__v: 0});
        Object.keys(product._doc).forEach(key => {
            if (req.body[key]) product[key] = req.body[key];
        });
        // const updatedProduct = await Product.findOneAndUpdate(prodId, product, {new: true});
        const updatedProduct = await product.save();
        return res.status(200).json({msg: `New product was successfully updated`, product: updatedProduct});
    } catch (error) {
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    const {prodId} = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(prodId);
        res.status(200).json({msg: `Product was successfully deleted`, id: deletedProduct.id});
    } catch (error) {
        next(error);
    }
};

exports.addComment = async (req, res, next) => {
    const userId = req.user.id;
    const {productId, comment} = req.body;

    if (!productId && !comment) {
        return res.status(400).json({msg: `ProductId and comment are required`});
    }
    try {
        const product = await Product.findById(productId);
        const author = product.reviews.find(item => {
            return item.author.toString() === userId.toString();
        });
        if (author) {
            return res.status(400).json({msg: `User alredy added his comment`});
        }
        if (!product) throw new Error(`Product not found`);
        const newComment = {
            author: userId,
            date: new Date(),
            text: comment.text,
            raiting: comment.raiting,
        };
        product.reviews.push(newComment);
        const updatedProduct = await product.save();
        return res.status(200).json({msg: `Added comment to the product`, data: newComment});
    } catch (error) {
        next(error);
    }
};
