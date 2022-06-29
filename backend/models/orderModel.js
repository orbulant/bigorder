const mongoose = require("mongoose");
const menuItemSchema = require("./menuItemModel");

const orderSchema = mongoose.Schema(
    {
        originMenuId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Please provide restaurant ID"],
        },
        restaurantName: {
            type: String,
            required: [true, "Please add restaurant name!"],
        },
        tableNumber: {
            type: Number,
            required: [true, "Please select table number!"],
        },
        cart: {
            type: [
                {
                    itemId: {
                        type: String,
                        required: [true, "Please provide item id"],
                    },
                    quantity: {
                        type: Number,
                        required: [true, "Please provide quantity"],
                    },
                },
            ],
            required: [true, "Please add items into cart!"],
        },
        completed: {
            type: Boolean,
            required: [true, "Please provide order completed status!"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
