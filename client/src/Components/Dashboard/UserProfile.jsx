import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import "../style/Nav.css";
import { useParams } from "react-router-dom";
import NavBar from "../Navbar";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";

function Userprofile() {
	const [userProfile, setProfile] = useState(null);
	const { state, dispatch } = useContext(UserContext);
	const { userid } = useParams();
	const [show, setHide] = useState(
		state ? !state.following?.includes(userid) : true,
	);
	useEffect(() => {
		fetch(`/user/${userid}`, {
			headers: {
				Authorization: localStorage.getItem("token"),
			},
		})
			.then((res) => res.json())
			.then((result) => {
				setProfile(result);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [userid]);

	const follow = () => {
		fetch("/follow", {
			method: "put",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("token"),
			},
			body: JSON.stringify({
				followId: userid,
			}),
		})
			.then((res) => res.json())
			.then((result) => {
				// console.log(result);
				dispatch({
					type: "UPDATE",
					payload: { following: result.following, followers: result.followers },
				});
				localStorage.setItem("user", JSON.stringify(result));
				setProfile((preval) => {
					return {
						...preval,
						user: {
							...preval.user,
							followers: [...preval.user.followers, result._id],
						},
					};
				});
				setHide(false);
			});
	};

	// Unfollow
	const unfollow = () => {
		fetch("/unfollow", {
			method: "put",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("token"),
			},
			body: JSON.stringify({
				unfollowId: userid,
			}),
		})
			.then((res) => res.json())
			.then((result) => {
				// console.log(result);
				dispatch({
					type: "UPDATE",
					payload: { following: result.following, followers: result.followers },
				});
				localStorage.setItem("user", JSON.stringify(result));
				setProfile((preval) => {
					const newfolwer = preval.user.followers.filter(
						(item) => item !== result._id,
					);
					return {
						...preval,
						user: {
							...preval.user,
							followers: newfolwer,
						},
					};
				});
				setHide(false);
			});
	};

	return (
		<React.Fragment>
			<NavBar />
			{userProfile ? (
				<div className="parent">
					<div className="profile">
						<div className="img_Div">
							<img
								className="image_dp"
								src={userProfile?userProfile.user.pic:"Wait.."}
								alt="user picture"
							/>
						</div>
						<div>
							<h4 className="Name_user">{userProfile.user.name}</h4>
							<h5 className="Email_user">{userProfile.user.email}</h5>
							<div className="friend_Section">
								<h5 className="user_sect">{userProfile.posts.length} Posts</h5>
								<h5 className="user_sect">
									{userProfile.user.followers.length} Followers
								</h5>
								<h5 className="user_sect">
									{userProfile.user.following.length} Following
								</h5>
							</div>
							{show ? (
								<Button
									variant="contained"
									color="secondary"
									onClick={() => {
										follow();
									}}>
									Follow
								</Button>
							) : (
								<Button
									variant="contained"
									color="secondary"
									onClick={() => {
										unfollow();
									}}>
									Unfollow
								</Button>
							)}
						</div>
					</div>
					<div className="Posts">
						{userProfile.posts.map((item) => {
							return (
								<img
									className="items "
									src={item.photo}
									alt={item.title}
									key={item._id}
								/>
							);
						})}
					</div>
				</div>
			) : (
				<div className="loader"></div>
			)}
		</React.Fragment>
	);
}

export default Userprofile;
