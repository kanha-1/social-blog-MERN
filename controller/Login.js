const User = require("../model/user");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = {
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
			const token = sign(
				{ email: user.email, id: user._id },
				process.env.SECRET_KEY,
				{ expiresIn: "1d" },
			);
			res.json({
				token: token,
				user: user,
			});
		} catch (error) {
			res.json({ message: "server error" });
		}
	},
};
