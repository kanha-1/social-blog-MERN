const User = require("../model/user");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
require("dotenv").config();
// Send mail after register
const transporter = nodemailer.createTransport(
	sendgridTransport({
		auth: {
			api_key: process.env.API_KEY,
		},
	}),
);
module.exports = {
	GetUser: (req, res) => {
		User.find()
			.then((user) => {
				res.json(user);
			})
			.catch((err) => {
				res.json({ message: err });
			});
	},
	Register: (req, res) => {
		//check if email alredy exit
		User.findOne({ email: req.body.email })
			.then((result) => {
				if (result) {
					return res.json({ message: "Email alredy exit" });
				}
				// hash the password
				hash(req.body.password, 10)
					.then((hashedpassword) => {
						const user = new User({
							name: req.body.name,
							email: req.body.email,
							mobile: req.body.mobile,
							password: hashedpassword,
							pic: req.body.pic,
						});
						//Save the user
						user
							.save()
							.then((data) => {
								sign(
									{ email: data.email, user: data._id },
									process.env.SECRET_KEY,
									{ expiresIn: "1h" },
									(err, token) => {
										if (err) return res.status(500).send("Server error");
										user
											.updateOne(
												{ _id: data.id },
												{
													$set: { islogin: true },
												},
											)
											.then(() => {
												transporter.sendMail({
													to: user.email,
													from: process.env.G_NAME,
													subject: "Account register successfully",
													html: `<div>
															<h1>Welcome to coworks</h1>
															<h3>Here is your account details</h3>
															</br>
															<p>Name:${user.name}</p> </br>
															<p>Email:${user.email}</p> </br>
															<p>Mobile:${user.mobile}</p>
															<p>Thank you for choosing us!</p>
														</div>
													`,
												});
												res.json({ token: token, user: user });
											})

											.catch((err) => {
												res.json({ message: err });
											});
									},
								);
							})
							.catch((err) => {
								res.json({ message: err });
							});
					})
					.catch((err) => {
						res.json({ message: err });
					});
			})
			.catch((err) => {
				res.json({ message: err });
			});
	},
};
