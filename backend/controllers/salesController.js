const asyncHandler = require("express-async-handler");

const Order = require("../models/orderModel");
const Menu = require("../models/menuModel");

// @desc Get Total Orders Made
// @route GET api/salesreports/totalordersmade/:menuId
// @access Private
const getTotalOrders = asyncHandler(async (req, res) => {
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

    const totalNumberOfOrders = await Order.countDocuments({
        originMenuId: req.params.menuId,
        completed: true,
        paid: true,
    });

    res.status(200).json(totalNumberOfOrders);
});

// @desc Get Total Money Made
// @route GET api/salesreports/totalmoneymade/:menuId
// @access Private
const getTotalMoney = asyncHandler(async (req, res) => {
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

    const allOrders = await Order.find({
        originMenuId: req.params.menuId,
        completed: true,
        paid: true,
    });

    let total = 0;
    allOrders.map((order) => {
        total += order.cart.reduce((accumulator, object) => {
            return accumulator + object.itemTotal;
        }, 0);
    });

    res.status(200).json(total);
});

// @desc Get Order Items Count
// @route GET api/salesreports/ordereditemscount/:menuId
// @access Private
const getOrderedItemsCount = asyncHandler(async (req, res) => {
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

    const allOrders = await Order.find({
        originMenuId: req.params.menuId,
    });

    let result = [];

    allOrders.map((order) => {
        result.push(
            order.cart.reduce((acc, child) => {
                if (!acc[child.name]) {
                    acc[child.name] = 0;
                }
                acc[child.name] += child.quantity;
                return acc;
            }, {})
        );
    });

    const total = result.reduce((a, { id, ...rest }) => {
        Object.entries(rest).forEach(([key, val]) => {
            a[key] = (a[key] || 0) + val;
        });
        return a;
    }, {});

    const sortedTotal = Object.fromEntries(
        Object.entries(total).sort(([, a], [, b]) => b - a)
    );

    res.status(200).json(sortedTotal);
});

module.exports = {
    getTotalOrders,
    getTotalMoney,
    getOrderedItemsCount,
};
