const mongoose = require("mongoose");
require("dotenv").config();
mongoose
	.connect(process.env.DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("database connected successfully");
	})
	.catch((err) => {
		console.log(err.message);
	});
