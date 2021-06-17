const User = require("../model/user");
const { sign } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const sendgridTransport = require("nodemailer-sendgrid-transport");
const transporter = nodemailer.createTransport(
	sendgridTransport({
		auth: {
			api_key: process.env.API_KEY,
		},
	}),
);
module.exports = {
	forgotPassword: (req, res) => {
		User.findOne({ email: req.body.email }).then((user) => {
			if (user) {
				const token = sign(
					{ email: user.email, id: user._id },
					process.env.SECRET_KEY,
					{ expiresIn: "2m" },
				);

				transporter
					.sendMail({
						to: user.email,
						from: process.env.G_NAME,
						subject: "Password reset",
						html: `<div>
                        <h1>Reset password</h1>
                        <p>Please click below link for reset password. This link will got expire within 20 minutes</p>
                        <a href="${process.env.CLIENT_URL}/${token}/${user.email}">Click Here </a>
                    </div>`,
					})
					.then((success) => {
						res.json({ message: "Mail sent successfully" });
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				return res.json({ message: "Not a register user please signup !" });
			}
		});
	},
};
