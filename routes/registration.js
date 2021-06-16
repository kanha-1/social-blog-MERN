const express = require("express");
const router = express.Router();
const register = require("../controller/Register");

// Get all data
router.get("/users", register.GetUser);
// Register user
router.post("/", register.Register);

module.exports = router;
