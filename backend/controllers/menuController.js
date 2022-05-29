const asyncHandler = require("express-async-handler");

const Menu = require("../models/menuModel");
const User = require("../models/userModel");

// @desc Get Menu Items
// @route GET /api/menu
// @access Private
const getMenu = asyncHandler(async (req, res) => {
    const menu = await Menu.find({ user: req.user.id });
    res.status(200).json(menu);
});

// @desc Set Menu Items
// @route POST /api/menu
// @access Private
const setMenu = asyncHandler(async (req, res) => {
    if (!req.body.restaurantName) {
        res.status(400);
        throw new Error("No restaurant name");
    }

    const menu = await Menu.create({
        restaurantName: req.body.restaurantName,
        menuItems: req.body.menuItems,
        user: req.user.id,
    });

    res.status(200).json(menu);
});

// @desc Update Menu Items
// @route PUT /api/menu
// @access Private
const updateMenu = asyncHandler(async (req, res) => {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
        res.status(400);
        throw new Error("Menu not found!");
    }

    const user = await User.findById(req.user.id);

    //Check for user
    if (!user) {
        res.status(401);
        throw new Error("User not found!");
    }

    // Logged in user matching the menu user
    if (menu.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json(updatedMenu);
});

// @desc Delete Menu Items
// @route DELETE /api/menu
// @access Private
const deleteMenu = asyncHandler(async (req, res) => {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
        res.status(400);
        throw new Error("Menu not found");
    }

    const user = await User.findById(req.user.id);

    //Check for user
    if (!user) {
        res.status(401);
        throw new Error("User not found!");
    }

    // Logged in user matching the menu user
    if (menu.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    await menu.remove();
    
    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getMenu,
    setMenu,
    updateMenu,
    deleteMenu,
};
