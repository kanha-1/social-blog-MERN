const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");
const users = require('../controller/usersController');


router.get('/user/:id',users.getuserByID)
router.put("/follow", middleware.authentication,users.Follow);
router.put("/unfollow", middleware.authentication,users.Unfollow);

router.put("/updatepic", middleware.authentication,users.upDatePic);

router.post("/search-users",users.SearchUser);

module.exports = router;
