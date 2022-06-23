const express = require("express");
const router = express.Router();
const { getPublicMenu } = require("../controllers/publicMenuController");

router.route("/:id").get(getPublicMenu);

module.exports = router;
