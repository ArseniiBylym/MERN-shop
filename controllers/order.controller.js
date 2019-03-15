const Order = require('../models/Order.model');

exports.getOrder = async (req, res, next) => {
    const {isAdmin} = req.user;
    const {customerId} = req.query;
    let order = [];
    try {
        if (!isAdmin && !customerId) {
            return res.status(405).json({message: `Access denied`});
        }
        if (isAdmin) {
            order = await Order.find()
                .populate('customer', 'name email')
                .populate('productList.id', 'name price');
        } else if (customerId) {
            if (customerId.toString() !== req.user.id.toString()) {
                return res.status(405).json({message: `Access denied`});
            }
            order = await Order.find({customer: customerId}).populate('productList.id', 'name price');
        }
        return res.status(200).json({message: `All orders`, order});
    } catch (error) {
        next(error);
    }
};

exports.addOrder = async (req, res, next) => {
    const userId = req.user.id;

    const newOrder = new Order({
        ...req.body,
        customer: userId,
        date: new Date(),
    });
    try {
        const createdOrder = await newOrder.save();
        if (!createdOrder) throw new Error(`Order creation failed`);
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
