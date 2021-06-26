const express = require("express");
const router = express.Router();
const middleware = require('../middleware/auth')
const conversation = require("../controller/Conversation")
// new conversation
router.post("/newconversation",conversation.newConvo)
// conversation of a user
router.get("/conversation/:id",conversation.getaConvo)

module.exports = router;