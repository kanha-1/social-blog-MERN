const express = require("express");
const router = express.Router();
const resetPassword = require("../controller/ResetPassword")


router.post("/resetPassword",resetPassword.resetPasswrod)

module.exports = router;