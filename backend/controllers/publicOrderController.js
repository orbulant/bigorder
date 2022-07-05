const asyncHandler = require("express-async-handler");

const Order = require("../models/orderModel");
const Menu = require("../models/menuModel");

// @desc Create New Orders
// @route POST /api/orders
// @access Public
const createNewOrder = asyncHandler(async (req, res) => {
    if (!req.body.originMenuId) {
        res.status(400);
        throw new Error("No origin menu ID provided in body!");
    }

    if (!req.body.tableNumber) {
        res.status(400);
        throw new Error("No table number provided!");
    }

    const menu = await Menu.findById({ _id: req.body.originMenuId });

    const newCartItems = [];

    req.body.cart.map((item) => {
        const selectedItem = menu.menuItems.find((x) => x._id == item.id);

        newCartItems.push({
            id: selectedItem._id,
            name: selectedItem.name,
            desc: selectedItem.desc,
            price: selectedItem.price,
            quantity: item.quantity,
            itemTotal:
                Number(item.quantity) * Number(selectedItem.price).toFixed(2),
        });
    });

    console.log(newCartItems)

    const order = await Order.create({
        originMenuId: req.body.originMenuId,
        restaurantName: menu.restaurantName,
        tableNumber: req.body.tableNumber,
        cart: newCartItems,
        completed: false,
        paid: false,
    });

    res.status(200).json(order);
});

// @desc Get Current Order
// @route GET /api/orders
// @access Public
const getCurrentOrder = asyncHandler(async (req, res) => {
    if (!req.params.orderId) {
        res.status(400);
        throw new Error("No order ID provided!");
    }

    const order = await Order.findById({ _id: req.params.orderId });
    res.status(200).json(order);
});

module.exports = {
    createNewOrder,
    getCurrentOrder,
};
