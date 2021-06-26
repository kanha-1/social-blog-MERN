import React from "react";
import "../style/Messages.css";
import { useEffect, useState } from "react";
import Axios from "axios";

function Conversation({ conversation, currentUser }) {
	const [user, setUser] = useState(null);
	useEffect(() => {
		const friendId = conversation.members.find((m) => m !== currentUser._id);

		const getUser = async () => {
			try {
				const res = await Axios("/user/" + friendId);
				setUser(res.data.user);
			} catch (err) {
				console.log(err);
			}
		};
		getUser();
	}, [currentUser, conversation]);
	return (
		<div className="conversation">
			<img className="conversationImg" src={user?.pic} alt="" />
			<span className="conversationName">{user?.name}</span>
		</div>
	);
}

export default Conversation;
