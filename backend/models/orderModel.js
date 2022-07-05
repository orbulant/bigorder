const mongoose = require("mongoose");

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
            type: String,
            required: [true, "Please select table!"],
        },
        cart: {
            type: [
                {
                    id: {
                        type: String,
                        required: [true, "Please provide item id"],
                    },
                    name: {
                        type: String,
                        required: [true, "Please provide item name"],
                    },
                    desc: {
                        type: String,
                        required: false,
                    },
                    quantity: {
                        type: Number,
                        required: [true, "Please provide quantity"],
                    },
                    itemTotal: {
                        type: Number,
                        required: [true, "Please provide item total amount!"],
                    },
                },
            ],
            required: [true, "Please add items into cart!"],
        },
        completed: {
            type: Boolean,
            required: [true, "Please provide order completed status!"],
        },
        paid: {
            type: Boolean,
            required: [true, "Please provide order paid or not paid!"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
