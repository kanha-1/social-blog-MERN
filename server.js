const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const socket = require("socket.io");
require("./db");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

//Import routes
const registerRoute = require("./routes/registration");
const loginRoute = require("./routes/login");
const dashboard = require("./routes/users");
const FacebookLogin = require("./routes/FacebookLogin");
const GoogleLogin = require("./routes/GoogleLogin");
const forgotPassword = require("./routes/ForgotPassword");
const resetpassword = require("./routes/ResetPassword");
const postRoute = require("./routes/post");
const usersRoute = require("./routes/users");
const conversation = require("./routes/conversation");
const messages = require("./routes/messages");

//Use middlewares
app.use(registerRoute);
app.use(loginRoute);
app.use(dashboard);
app.use(FacebookLogin);
app.use(GoogleLogin);
app.use(forgotPassword);
app.use(resetpassword);
app.use(postRoute);
app.use(usersRoute);
app.use(conversation);
app.use(messages);

// heroku deploy
if (process.env.NODE_ENV == "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}
//Server
const server = app.listen(PORT, function () {
	console.log(`server running onport no ${PORT}`);
});

// Socket-Io
const options = {
	cors: true,
	origin: "http://localhost:3001",
	credentials: false,
	allowEIO3: true,
};
const io = socket(server, options);
let users = [];

const addUser = (userId, socketId) => {
	!users.some((user) => user.userId === userId) &&
		users.push({ userId, socketId });
};

const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
	return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
	//when ceonnect
	console.log("a user connected.");

	//take userId and socketId from user
	socket.on("addUser", (userId) => {
		addUser(userId, socket.id);
		io.emit("getUsers", users);
	});

	//send and get message
	socket.on("sendMessage", ({ senderId, receiverId, text }) => {
		const user = getUser(receiverId);
		io.to(user.socketId).emit("getMessage", {
			senderId,
			text,
		});
	});

	//when disconnect
	socket.on("disconnect", () => {
		console.log("a user disconnected!");
		removeUser(socket.id);
		// io.emit("getUsers", users);
	});
});
