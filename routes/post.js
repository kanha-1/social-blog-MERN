const express = require("express");
const router = express.Router();
const middleware = require('../middleware/auth')
const Posts = require("../controller/post");

router.get("/allpost",middleware.authentication, Posts.Allpost);

router.get("/getsubpost",middleware.authentication, Posts.SubPost);

router.post("/createpost",middleware.authentication, Posts.CeatePost);

router.get("/mypost",middleware.authentication, Posts.MyPost);

router.put("/like",middleware.authentication, Posts.PostLike);
router.put("/unlike",middleware.authentication, Posts.PostUnlike);

router.put("/comment",middleware.authentication, Posts.PostComment);

router.delete("/deletepost/:postId",middleware.authentication, Posts.PostDelete);

module.exports = router;
