const express = require("express");
const router = express.Router();
const {
    getUncompletedOrders,
    setOrder
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(setOrder);
router.route("/uncompleted").get(protect, getUncompletedOrders);

module.exports = router;
