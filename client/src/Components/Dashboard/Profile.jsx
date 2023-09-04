import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import "../style/Nav.css";
import NavBar from "../Navbar";
import { toast } from "react-toastify";

function Profile() {
	const user = JSON.parse(localStorage.getItem("user"));
	const name = user?.name;
	const email = user?.email;
	const followers = user?.followers;
	const following = user?.following;
	const [image, setImage] = useState("");
	const [pics, setpics] = useState([]);
	const { state, dispatch } = useContext(UserContext);
	// console.log(state)
	useEffect(() => {
		fetch("/mypost", {
			headers: {
				Authorization: localStorage.getItem("token"),
			},
		})
			.then((res) => res.json())
			.then((result) => {
				setpics(result.mypost);
				// console.log(result.mypost);
			})
			.catch((err) => {
				toast.error("server error");
			});
	}, []);

	useEffect(() => {
		if (image) {
			const data = new FormData();
			data.append("file", image);
			data.append("upload_preset", "Social");
			data.append("cloud_name", "dsseuwzzr");
			fetch("https://api.cloudinary.com/v1_1/dsseuwzzr/image/upload", {
				method: "post",
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					// console.log(data);
					// setUrl(data.url);
					fetch("/updatepic", {
						method: "put",
						headers: {
							"Content-Type": "application/json",
							Authorization: localStorage.getItem("token"),
						},
						body: JSON.stringify({
							pic: data.url,
						}),
					})
						.then((res) => res.json())
						.then((result) => {
							localStorage.setItem(
								"user",
								JSON.stringify({ ...state, pic: result.pic }),
							);
							dispatch({ type: "UPDATEPIC", payload: result.pic });
							toast.success("profile pic updated");
						})
						.catch((err) => {
							toast.error("server error");
						});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [image]);
	const uploadPic = (file) => {
		setImage(file);
	};

	return (
		<React.Fragment>
			<NavBar />
			<div className="parent">
				<div className="profile">
					<div className="img_Div">
						<label htmlFor="file-input">
							<img
								className="image_dp"
								src={state ? state.pic : "loading"}
								alt="user picture"
							/>
						</label>
						<input
							id="file-input"
							type="file"
							onChange={(e) => setImage(e.target.files[0])}
						/>
					</div>

					<div className="user_Details">
						<h4 className="Name_user">{name}</h4>
						<h5 className="Email_user">{email}</h5>
						<div className="friend_Section">
							<h5 className="user_sect">{pics.length} Posts</h5>
							{/* <h5 className="user_sect">{followers} Followers</h5> */}
							{/* <h5 className="user_sect">{followers} following</h5> */}
							<h5 className="user_sect">
								{state ? state.followers?.length : 0} Followers
							</h5>
							<h5 className="user_sect">
								{state ? state.following?.length : 0} Following
							</h5>
						</div>
					</div>
				</div>
				<div className="Posts">
					{pics.map((item) => {
						return (
							<img
								className="items"
								src={item.photo}
								alt={item.title}
								key={item._id}
							/>
						);
					})}
				</div>
			</div>
		</React.Fragment>
	);
}

export default Profile;
