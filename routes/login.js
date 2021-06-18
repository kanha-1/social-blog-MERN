const express = require("express");
const router = express.Router();
const Login = require("../controller/Login");

router.post("/login", Login.Login);

module.exports = router;
