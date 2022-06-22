const mongoose = require("mongoose");

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
            type: [{
                name: {
                    type: String,
                    required: [true, "Please give menu item a name!"]
                },
                desc: {
                    type: String,
                    required: false
                },
                price: {
                    type: String,
                    required: [true, "Please give menu item a price!"]
                }
                
            }],
            required: [true, "Please add menu items!"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Menu", menuSchema);
