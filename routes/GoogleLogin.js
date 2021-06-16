const express = require("express");
const router = express.Router();
const register = require("../controller/Google");

router.post("/googlelogin",register.googlelogin)

module.exports = router;