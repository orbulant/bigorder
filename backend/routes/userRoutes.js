const express = require("express");
const router = express.Router();
const {
    registerUser,
    getCurrentUser,
    loginUser,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(protect, getCurrentUser);

module.exports = router;
