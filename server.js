const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path')
require("./db");
require("dotenv").config();
const PORT = process.env.PORT || 8080
app.use(cors());
app.use(express.json());

//Import routes
const registerRoute = require("./routes/registration");
const loginRoute = require("./routes/login");
const dashboard = require("./routes/users");
const FacebookLogin = require("./routes/FacebookLogin")
const GoogleLogin = require("./routes/GoogleLogin")
const forgotPassword = require("./routes/ForgotPassword")
const resetpassword = require("./routes/ResetPassword")
const postRoute = require("./routes/post")
const usersRoute = require('./routes/users')

//Use middlewares
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use(dashboard);
app.use(FacebookLogin)
app.use(GoogleLogin)
app.use(forgotPassword)
app.use(resetpassword)
app.use(postRoute)
app.use(usersRoute)

// heroku deploy
if(process.env.NODE_ENV == "production"){
	app.use(express.static("client/build"))
}
//Server
app.listen(PORT, function () {
	console.log(`server running onport no ${PORT}`);
});
