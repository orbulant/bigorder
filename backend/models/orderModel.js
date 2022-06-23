const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        restaurantName: {
            type: String,
            required: [true, "Please add restaurant name!"],
        },
        tableNumber: {
            type: Number,
            required: [true, "Please select table number!"],
        },
        cart: {
            type: Array,
            required: [true, "Please add items into cart!"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
