const Order = require('../models/Order.model');
const Cart = require('../models/Cart.model');

exports.getOrder = async (req, res, next) => {
    const {isAdmin, email} = req.user;
    let order = [];
    try {
        if (!isAdmin && !email) {
            return res.status(405).json({message: `Access denied`});
        }
        if (isAdmin) {
            order = await Order.find()
                .sort({createdAt: -1})
                .select('-__v')
                .populate('productList.product', 'name price category subCategory')
                .exec();
        } else if (email) {
            order = await Order.find({email: email}).sort({updatedAt: -1}).select('-__v').populate('productList.product', 'name price category subCategory');
        }
        return res.status(200).json({message: `All orders`, order});
    } catch (error) {
        next(error);
    }
};

exports.addOrder = async (req, res, next) => {
    const {order, cartId} = req.body;

    const newOrder = new Order(order);
    try {
        const createdOrder = await newOrder.save();
        if (!createdOrder) throw new Error(`Order creation failed`);
        await Cart.findByIdAndDelete(cartId).exec();
        return res.status(201).json({message: `New order was successfully crated`, orderItem: createdOrder});
    } catch (error) {
        next(error);
    }
};

exports.updateOrder = async (req, res, next) => {
    const {status, orderId} = req.body;
    try {
        const order = await Order.findById(orderId);
        if (!order) throw new Error(`Order not found`);
        order.status = status;
        const updatedOrder = await order.save();
        return res.status(200).json({message: `Order status successfully updated`, orderItem: updatedOrder});
    } catch (error) {
        next(error);
    }
};

exports.deleteOrder = async (req, res, next) => {
    const {orderId} = req.params;
    try {
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) throw new Error(`Order not found`);
        return res.status(200).json({message: `Order was successfully deleted`, id: order.id});
    } catch (error) {
        next(error);
    }
};
