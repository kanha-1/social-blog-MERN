import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import "../style/Messages.css";
import NavBar from "../Navbar";
import Message from "./Messages";
import Online from "./Online";
import Conversations from "./Conversation";
import { Typography } from "@material-ui/core";
import { io } from "socket.io-client";
import { UserContext } from "../../App";
import Axios from "axios";
import { log } from "debug";
import { captureRejections } from "events";
function Messages() {
	const user = JSON.parse(localStorage.getItem("user"));
	const id = user._id;
	const { state, dispatch } = useContext(UserContext);
	const [conversation, setConversation] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessages, setNewMessages] = useState("");
	// const scrollRef = useRef();
	useEffect(() => {
		const getConversation = async () => {
			try {
				const response = await Axios.get("/conversation/" + id);
				setConversation(response.data);
			} catch (err) {
				console.log(err);
			}
		};
		getConversation();
	}, [id]);
	useEffect(() => {
		const getMessages = async () => {
			try {
				const msg = await Axios.get("/messages/" + currentChat._id);
				setMessages(msg.data);
			} catch (error) {
				console.log(error);
			}
		};
		getMessages();
	}, [currentChat]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const message = {
			sender: user._id,
			text: newMessages,
			conversationId: currentChat._id,
		};
		try {
			const res = await Axios.post("/messages", message);
			setMessages([...messages, res.data]);
			setNewMessages("");
			// scrollRef.current?.scrollIntoView({ behavior: "smooth" });
		} catch (error) {
			console.log(error);
		}
	};
	// useEffect(() => {
	//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	//   }, [messages]);

	return (
		<>
			<NavBar />
			<div className="messenger">
				<div className="chatMenu">
					<div className="chatMenuWrapper">
						<input placeholder="Search for friends" className="chatMenuInput" />
						{conversation.map((convo) => (
							<div onClick={() => setCurrentChat(convo)}>
								<Conversations conversation={convo} currentUser={user} />
							</div>
						))}
					</div>
				</div>
				<div className="chatBox">
					<div className="chatBoxWrapper">
						{currentChat ? (
							<>
								<div className="chatBoxTop">
									{messages.map((m) => (
										// <div ref={scrollRef}>
										// </div>
										<Message message={m} own={m.sender === user._id} />
									))}
								</div>
								<div className="chatBoxBottom">
									<textarea
										className="chatMessageInput"
										placeholder="write something..."
										onChange={(e) => setNewMessages(e.target.value)}
										value={newMessages}></textarea>
									<button className="chatSubmitButton" onClick={handleSubmit}>
										Send
									</button>
								</div>
							</>
						) : (
							<Typography>Open a conversation to start a chat.</Typography>
						)}
					</div>
				</div>
				<div className="chatOnline">
					<div className="chatOnlineWrapper">
						{/* <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            /> */}
					</div>
				</div>
			</div>
		</>
	);
}

export default Messages;
