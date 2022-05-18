const express = require("express");
const router = express.Router();
const {getMenu, setMenu, updateMenu, deleteMenu} = require('../controllers/menuController')

router.route('/').get(getMenu).post(setMenu);

router.route('/:id').put(updateMenu).delete(deleteMenu);


module.exports = router;
