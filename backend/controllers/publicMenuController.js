const asyncHandler = require("express-async-handler");

const Menu = require("../models/menuModel");

// @desc Get Menu Items
// @route GET /api/publicmenu
// @access Public
const getPublicMenu = asyncHandler(async (req, res) => {
    let menu = await Menu.findOne(
        { _id: req.params.id },
        "-user -createdAt -updatedAt -__v"
    );

    res.status(200).json(menu);
});

module.exports = {
    getPublicMenu,
};
