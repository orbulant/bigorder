const express = require("express");
const router = express.Router();
const {
    getTotalOrders,
    getTotalMoney,
    getOrderedItemsCount
} = require("../controllers/salesController");

const { protect } = require("../middleware/authMiddleware");

router.route("/totalordersmade/:menuId").get(protect, getTotalOrders);
router.route("/totalmoneymade/:menuId").get(protect, getTotalMoney);
router.route("/ordereditemscount/:menuId").get(protect, getOrderedItemsCount)

module.exports = router;
