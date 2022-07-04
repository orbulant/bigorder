const asyncHandler = require("express-async-handler");

const Order = require("../models/orderModel");
const Menu = require("../models/menuModel");

// @desc Get Order
// @route GET /api/orders/commpleted/:orderId
// @access Private
const getOrder = asyncHandler(async (req, res) => {
    if (!req.user.id) {
        res.status(400);
        throw new Error("User not found!");
    }

    const order = await Order.findById(req.params.orderId);

    res.status(200).json(order);
});

// @desc Get All Paid Orders
// @route GET /api/orders/commpleted/:menuId
// @access Private
const getPaidOrders = asyncHandler(async (req, res) => {
    if (!req.user.id) {
        res.status(400);
        throw new Error("User not found!");
    }

    const menu = await Menu.find({ user: req.user.id });
    const listOfMenus = [];
    menu.map((menu) => listOfMenus.push(menu._id.toString()));

    if (!listOfMenus.includes(req.params.menuId)) {
        res.status(400);
        throw new Error("Menu provided is an invalid menu!");
    }

    const paidOrders = await Order.find({
        originMenuId: req.params.menuId,
        completed: true,
        paid: true,
    }).sort({ updatedAt: -1 });

    res.status(200).json(paidOrders);
});

// @desc Get Uncompleted Orders
// @route GET /api/orders/uncompleted/:menuId
// @access Private
const getUncompletedOrders = asyncHandler(async (req, res) => {
    if (!req.user.id) {
        res.status(400);
        throw new Error("User not found!");
    }
    const menu = await Menu.find({ user: req.user.id });
    const listOfMenus = [];
    menu.map((menu) => listOfMenus.push(menu._id.toString()));

    if (!listOfMenus.includes(req.params.menuId)) {
        res.status(400);
        throw new Error("Menu provided is an invalid menu!");
    }

    const orders = await Order.find({
        originMenuId: req.params.menuId,
        completed: false,
    }).sort({ createdAt: 1 });

    res.status(200).json(orders);
});

// @desc Get Completed Orders
// @route GET /api/orders/completed/:menuId
// @access Private
const getCompletedOrders = asyncHandler(async (req, res) => {
    if (!req.user.id) {
        res.status(400);
        throw new Error("User not found!");
    }
    const menu = await Menu.find({ user: req.user.id });

    const listOfMenus = [];
    menu.map((menu) => listOfMenus.push(menu._id.toString()));

    if (!listOfMenus.includes(req.params.menuId)) {
        res.status(400);
        throw new Error("Menu provided is an invalid menu!");
    }

    const orders = await Order.find({
        originMenuId: req.params.menuId,
        completed: true,
        paid: false,
    }).sort({ tableNumber: 1 });

    res.status(200).json(orders);
});

// @desc Set Order To Complete
// @route PUT /api/orders/uncompleted
// @access Private

const setOrderCompleted = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.body.orderId);
    const menu = await Menu.findById(req.body.menuId);

    //Check for user
    if (!req.user) {
        res.status(401);
        throw new Error("User not found!");
    }

    // Logged in user matching the menu user
    if (menu.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    //Check for order
    if (!order) {
        res.status(400);
        throw new Error("Order not found!");
    }

    const updatedOrder = await Order.findByIdAndUpdate(
        req.body.orderId,
        { completed: true },
        {
            new: true,
        }
    );

    res.status(200).json(updatedOrder);
});

// @desc Set Order to be Paid
// @route PUT /api/orders/completed/paid/:orderId
// @access Private

const setOrderPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.body.orderId);
    const menu = await Menu.findById(req.body.menuId);

    //Check for user
    if (!req.user) {
        res.status(401);
        throw new Error("User not found!");
    }

    // Logged in user matching the menu user
    if (menu.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    //Check for order
    if (!order) {
        res.status(400);
        throw new Error("Order not found!");
    }

    const updatedOrder = await Order.findByIdAndUpdate(
        req.body.orderId,
        { paid: true },
        {
            new: true,
        }
    );

    res.status(200).json(updatedOrder);
});
module.exports = {
    getOrder,
    getPaidOrders,
    getUncompletedOrders,
    getCompletedOrders,
    setOrderCompleted,
    setOrderPaid,
};
