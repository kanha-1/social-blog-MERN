const express = require("express");
const router = express.Router();
const middleware = require('../middleware/auth')
const Messages = require("../controller/Messages")

// add Messages
router.post("/messages",Messages.addMessages)

// get Messages
router.get("/messages/:id",Messages.getMessages)
module.exports = router;