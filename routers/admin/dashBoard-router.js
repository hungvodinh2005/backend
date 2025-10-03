const express = require("express");
const router = express.Router();
const dashBoard = require("../../controllers/admin/dashBoard-controller");
router.get("/", dashBoard.dashBoard);
module.exports = router;
