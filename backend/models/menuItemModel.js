const mongoose = require("mongoose");

const menuItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please give menu item a name!"],
    },
    desc: {
        type: String,
        required: false,
    },
    price: {
        type: String,
        required: [true, "Please give menu item a price!"],
    },
});

module.exports = menuItemSchema;
