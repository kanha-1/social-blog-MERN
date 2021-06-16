const express = require("express");
const router = express.Router();
const forgotPassword = require("../controller/ForgotPassword")


router.put("/forgotPassword",forgotPassword.forgotPassword)

module.exports = router;
