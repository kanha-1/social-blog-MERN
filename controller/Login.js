const User = require("../model/user");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

module.exports = {
	Login: (req, res) => {
		User.findOne({ email: req.body.email })
			.then((data) => {
				if (data) {
					compare(req.body.password, data.password)
						.then((isCompare) => {
							if (isCompare) {
								if (data.isLoggedIn === true) {
									res.json("You're alredy logged in");
								} else {
									sign(
										{ email: data.email, id: data._id },
										process.env.SECRET_KEY,
										{ expiresIn: "1d" },
										(err, token) => {
											if (err) return res.status(500).json("server error");
											res.json({
												message: "Logged in successfully",
												token: token,
												user: data,
											});
										},
									);
								}
							} else {
								return res.json({ message: "Invalid credential" });
							}
						})
						.catch((err) => {
							res.json({ message: "May be you registerd using google or Fb" });
						});
				} else {
					return res.json({ message: "Not a register user please signup !" });
				}
			})
			.catch((err) => {
				res.json({ findmail: err });
			});
	},
};
