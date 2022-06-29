const asyncHandler = require("express-async-handler");

const Order = require("../models/orderModel");
const Menu = require("../models/menuModel");

// @desc Get Orders
// @route GET /api/orders
// @access Private
const getUncompletedOrders = asyncHandler(async (req, res) => {
    const menu = await Order.find({
        originMenuId: req.body.originMenuId,
        completed: false,
    });
    res.status(200).json(menu);
});

// @desc Set Orders
// @route POST /api/orders
// @access Public
const setOrder = asyncHandler(async (req, res) => {
    if (!req.body.originMenuId) {
        res.status(400);
        throw new Error("No origin menu ID provided in body!");
    }

    const menu = await Menu.findById({ _id: req.body.originMenuId });

    const cartItems = req.body.cart.map((item) =>
        menu.menuItems.find((x) => x._id == item.itemId)
    );

    const order = await Order.create({
        originMenuId: req.body.originMenuId,
        restaurantName: menu.restaurantName,
        tableNumber: req.body.tableNumber,
        cart: cartItems,
        completed: false,
    });

    res.status(200).json(order);
});

module.exports = {
    getUncompletedOrders,
    setOrder,
};
