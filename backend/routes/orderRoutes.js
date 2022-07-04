const express = require("express");
const router = express.Router();
const {
    getOrder,
    getPaidOrders,
    getUncompletedOrders,
    getCompletedOrders,
    setOrderCompleted,
    setOrderPaid
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

router.route("/uncompleted/").put(protect, setOrderCompleted);
router.route("/uncompleted/:menuId").get(protect, getUncompletedOrders);
router.route("/completed/:menuId").get(protect, getCompletedOrders);
router.route("/completed/unpaid/:orderId").get(protect, getOrder)
router.route("/completed/unpaid/").put(protect, setOrderPaid);
router.route("/completed/paid/:menuId").get(protect, getPaidOrders);

module.exports = router;
