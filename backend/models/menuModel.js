const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
    restaurantName: {
        type: String,
        required: [true, 'Please add restaurant name!']
    },
    menuItems: {
        type: Array,
        required: [true, 'Please add menu items!']
    }
})

module.exports = mongoose.model('Menu', menuSchema)
