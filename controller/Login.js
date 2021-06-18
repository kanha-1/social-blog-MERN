const User = require("../model/user");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = {
	// Login: (req, res) => {
	// 	User.findOne({ email: req.body.email })
	// 		.then((data) => {
	// 			if (data) {
	// 				compare(req.body.password, data.password)
	// 					.then((isCompare) => {
	// 						if (isCompare) {
	// 							if (data.isLoggedIn === true) {
	// 								res.json("You're alredy logged in");
	// 							} else {
	// 								sign(
	// 									{ email: data.email, id: data._id },
	// 									process.env.SECRET_KEY,
	// 									{ expiresIn: "1d" },
	// 									(err, token) => {
	// 										if (err) return res.status(500).json("server error");
	// 										res.json({
	// 											token: token,
	// 											user: data,
	// 										});
	// 									},
	// 								);
	// 							}
	// 						} else {
	// 							return res.json({ message: "Invalid credential" });
	// 						}
	// 					})
	// 					.catch((err) => {
	// 						res.json({ message: "May be you registerd using google or Fb" });
	// 					});
	// 			} else {
	// 				return res.json({ message: "Not a register user please signup !" });
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			res.json({ findmail: err });
	// 		});
	// },
	Login: async (req, res) => {
		try {
			// Check email user
			const user = await User.findOne({ email: req.body.email });
			if (!user)
				return res.json({ message: "Not a register user please signup !" });
			// check password
			const validpassword = await bcrypt.compare(
				req.body.password,
				user.password,
			);
			if (!validpassword) return res.json({ message: "Invalid credential" });
			// create token
			const token = sign({ email: user.email, id: user._id }, process.env.SECRET_KEY);
			res.json({
				token: token,
				user: user,
			});
		} catch (error) {
			res.json({ message: "server error" });
		}
	},
};
