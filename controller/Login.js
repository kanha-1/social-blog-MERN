const User = require("../model/user");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

module.exports = {
	Login: (req, res) => {
		User.findOne({ email: req.body.email })
			.then((sol) => {
				// console.log(sol)
				if (sol) {
					compare(req.body.password, sol.password)
						.then((isCompare) => {
							// console.log("I'm here uder hash");
							if (isCompare) {
								if (sol.isLoggedIn === "True") {
									res.json("You're alredy logged in");
									
								} else {
										// const {_id,name,email} = User
									sign(
										{ email: sol.email, id: sol._id },
										process.env.SECRET_KEY,
										{ expiresIn: "1d" },
										(err, token) => {
											if (err) return res.status(500).json("server error");
											res.json({
												message: "Logged in successfully",
												token: token, user:sol
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
