const express = require("express");
const router = express.Router();
const {
    createNewOrder,
    getCurrentOrder,
} = require("../controllers/publicOrderController");


router.route("/").post(createNewOrder);
router.route("/:orderId").get(getCurrentOrder);

module.exports = router;
