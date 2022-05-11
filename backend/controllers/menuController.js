const asyncHandler = require('express-async-handler');

// @desc Get Menu Items
// @route GET /api/menu
// @access Private
const getMenuItems = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get Menu Items" });
});

// @desc Set Menu Items
// @route POST /api/menu
// @access Private
const setMenuItems = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('No text  ')
  } else {
  }
  res.status(200).json({ message: "Set Menu" });
});

// @desc Update Menu Items
// @route PUT /api/menu
// @access Private
const updateMenuItems = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Menu Item ${req.params.id}` });
});

// @desc Delete Menu Items
// @route DELETE /api/menu
// @access Private
const deleteMenuItems = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Menu Item ${req.params.id}` });
});

module.exports = {
  getMenuItems,
  setMenuItems,
  updateMenuItems,
  deleteMenuItems,
};
