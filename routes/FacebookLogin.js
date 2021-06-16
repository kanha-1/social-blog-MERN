const express = require("express");
const router = express.Router();
const register = require("../controller/FbLogin");

router.post("/fblogin",register.FacebookLogin)

module.exports = router;