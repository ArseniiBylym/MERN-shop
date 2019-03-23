const Cart = require('../models/Cart.model')

exports.getCart = async (req, res, next) => {
    const {cartId} = req.params;
    try {
        const cart = await Cart.findById(cartId).select({__v: 0}).populate('cart.product', 'name imageUrl price').exec();
        res.status(200).json({cart})
    } catch (error) {
        error.message = `Can't get user cart`;
        next(error);
    }
}

exports.postCart = async (req, res, next) => {
    const {cart} = req.body;
    const newCart = new Cart({cart});
    try {
        const result = await newCart.save();
        res.status(201).json({message: `New cart added`, cartId: result._id})
    } catch (error) {
        error.message = `New cart creation failed`;
        next(error);
    }
}

exports.putCart = async (req, res, next) => {
    const {cartId, cart} = req.body;
    try {
        const cartItem = await Cart.findById(cartId).exec();
        cartItem.cart = cart;
        const updatedCart = cartItem.save();
        res.status(200).json({message: `Cart successfully updated`, cart: updatedCart})

    } catch (error) {
        error.message = `Failed to update cart`;
        next(error);
    }
}

exports.deleteCart = async (req, res, next) => {
    const {cartId} = req.params;
    try {
        const deletedCart = Cart.findByIdAndDelete(cartId).exec();
        res.status(200).json({message: `Cart was successfully deleted`, data: deletedCart})
    } catch (error) {
        error.message = `Failed to delete cart`;
        next(error);
    }
}