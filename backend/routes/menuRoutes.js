const express = require("express");
const router = express.Router();
const {getMenuItems, setMenuItems, updateMenuItems, deleteMenuItems} = require('../controllers/menuController')

router.route('/').get(getMenuItems).post(setMenuItems);

router.route('/:id').put(updateMenuItems).delete(deleteMenuItems);


module.exports = router;
