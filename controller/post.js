const Post = require("../model/post");
module.exports = {
	Allpost: (req, res) => {
		Post.find()
			.populate("postedBy", "_id name")
			.populate("comments.postedBy", "_id name")
			.sort("-createdAt")
			.then((posts) => {
				res.json({ posts });
			})
			.catch((err) => {
				console.log(err);
			});
	},
	SubPost: (req, res) => {
		// if postedBy in following
		Post.find({ postedBy: { $in: req.user.following } })
			.populate("postedBy", "_id name")
			.populate("comments.postedBy", "_id name")
			.sort("-createdAt")
			.then((posts) => {
				res.json({ posts });
			})
			.catch((err) => {
				console.log(err);
			});
	},
	CeatePost: (req, res) => {
		const { title, body, pic } = req.body;
		if (!title || !body || !pic) {
			return res.status(422).json({ error: "Please add all the fields" });
		}

		const post = new Post({
			title,
			body,
			photo: pic,
			postedBy: req.user,
		});
		post
			.save()
			.then((result) => {
				res.json({ post: result });
			})
			.catch((err) => {
				console.log(err);
			});
	},
	MyPost: (req, res) => {
		Post.find({ postedBy: req.user._id })
			.populate("PostedBy", "_id name")
			.then((mypost) => {
				res.json({ mypost });
			})
			.catch((err) => {
				console.log(err);
			});
	},
	PostLike: (req, res) => {
		Post.findByIdAndUpdate(
			req.body.postId,
			{
				$push: { Likes: req.user._id },
			},
			{
				new: true,
			},
		).exec((err, result) => {
			if (err) {
				return res.status(422).json({ error: err });
			} else {
				res.json(result);
			}
		});
	},
	PostUnlike: (req, res) => {
		Post.findByIdAndUpdate(
			req.body.postId,
			{
				$pull: { Likes: req.user._id },
			},
			{
				new: true,
			},
		).exec((err, result) => {
			if (err) {
				return res.status(422).json({ error: err });
			} else {
				res.json(result);
			}
		});
	},
	PostComment: (req, res) => {
		const comment = {
			text: req.body.text,
			postedBy: req.user,
			name: req.user.name,
		};
		Post.findByIdAndUpdate(
			req.body.postId,
			{
				$push: { comment: comment },
			},
			{
				new: true,
			},
		)
			.populate("comment.postedBy", "_id name")
			.populate("postedBy", "_id name")
			.exec((err, result) => {
				if (err) {
					return res.status(422).json({ error: err });
				} else {
					res.json(result);
				}
			});
	},
	PostDelete: (req, res) => {
		Post.findOne({ _id: req.params.postId })
			.populate("postedBy", "_id")
			.exec((err, post) => {
				if (err || !post) {
					return res.status(422).json({ error: err });
				}
				if (post.postedBy._id.toString() === req.user._id.toString()) {
					post
						.remove()
						.then((result) => {
							res.json(result);
						})
						.catch((err) => {
							console.log(err);
						});
				}
			});
	},
};
