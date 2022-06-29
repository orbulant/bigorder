const mongoose = require("mongoose");
const menuItemSchema = require("./menuItemModel");

const menuSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        restaurantName: {
            type: String,
            required: [true, "Please add restaurant name!"],
            unique: true,
        },
        menuItems: {
            type: [menuItemSchema],
            required: [true, "Please add menu items!"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Menu", menuSchema);
