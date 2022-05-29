const express = require("express");
const router = express.Router();
const {
    getMenu,
    setMenu,
    updateMenu,
    deleteMenu,
} = require("../controllers/menuController");

const { protect } = require('../middleware/authMiddleware');


router.route("/").get(protect, getMenu).post(protect, setMenu);

router.route("/:id").put(protect, updateMenu).delete(protect, deleteMenu);

module.exports = router;
