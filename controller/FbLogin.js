const fetch = require("node-fetch");
const User = require("../model/user");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
exports.FacebookLogin = (req, res) => {
    const { accessToken, userID } = req.body;
    // console.log("Received userid ", userID)
    // console.log("Received token ", accessToken)
	let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}?fields=id,name&access_token=${accessToken}`;
	fetch(urlGraphFacebook, {
		method: "GET",
	})
		.then((response) => response.json())
		.then((response) => {
			const { id, name } = response;
			User.findOne({ email: id}).then(( user) => {
				if(user){
					sign(
						{ email: user.email, user: user._id,name:user.name },
						process.env.SECRET_KEY,
						{ expiresIn: "1h" },
						(err, token) => {
							if (err) return res.status(500).send("Server error");
							// const {_id,name,email} = user;
						  res.json({
						  message:"User alredy exit",
						  token,
						  user:{ _id, name }
					  }) 
						},
					)
				}
				 else {
					const user = new User({
						name,
						email:id
					});
					//Save the user
					user
						.save()
						.then((data) => {
							console.log(data);
							sign(
								{ email: data.email, user: data._id },
								process.env.SECRET_KEY,
								{ expiresIn: "1h" },
								(err, token) => {
									if (err) return res.status(500).send("Server error");
									const {_id,name,email} = user;
                             	 res.json({
                                  message:"Logged in successfully in server",
                                  token,
                                  user:{ _id, name, email }
                              }) 
								},
							);
						})
						.catch((err) => {
							res.json({ message: err });
						});
				}
			}).catch((err) => {
				res.json({ message: err });
			});
		}).catch((err) => {
			res.json({ message: err });
		});
};
