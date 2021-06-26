import React from "react";
import "../style/Messages.css";
function Online({ user }) {
	return (
		<li className="rightbarFriend">
			<div className="rightbarProfileImgContainer">
				<img
					className="rightbarProfileImg"
					// src={PF + user.profilePicture}
					alt=""
				/>
				<span className="rightbarOnline"></span>
			</div>
			<span className="rightbarUsername">{user.username}</span>
		</li>
	);
}

export default Online;
