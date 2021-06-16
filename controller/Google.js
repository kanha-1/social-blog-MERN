const fetch = require("node-fetch");
require("dotenv/config");
const User = require("../model/user");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GoogleClientId);

module.exports = {
	googlelogin: (req, res) => {
        console.log("Here is the tokenID from req",req.body.tokenId)
		const { tokenId } = req.body;
		// console.log("Here is thetokenid", tokenId);
		client
			.verifyIdToken({ idToken: tokenId, audience: process.env.GoogleClientId })
			.then((response) => {
				const { name, email } = response.payload;
				// console.log("Line 17", response.payload);
				if (email) {
					User.findOne({ email }).exec((err, user) => {
						// console.log("Email alredy registerd");
						if (err) {
							return res.status(400).json({ message: "Something went wrong" });
						} else {
							if (user) {
								const token = sign({ _id: user._id }, process.env.SECRET_KEY, {
									expiresIn: "1h",
								});
								const { _id, name, email } = user;
								res.json({
									message: "User alredy exit",
									token,
									user: { _id, name, email },
								});
							} else {
								const newUser = new User({ name, email });
								newUser.save((err, data) => {
									// console.log("line 40", data);
									if (err) {
										return res
											.status(400)
											.json({ message: "Something went wrong" });
									}
									const token = sign(
										{ _id: data._id },
										process.env.SECRET_KEY,
										{ expiresIn: "1h" },
									)
									
									const { _id, name, email } = newUser;		
									res.json({
										message: "Register successfull",
										token,
										user: { _id, name, email },
									});
								})
								
							}
						}
					});
				}
			});
	},
};
