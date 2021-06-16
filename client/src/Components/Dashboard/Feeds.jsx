import React, { useState, useEffect, useContext } from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavBar from "../Navbar";
import { Link } from "react-router-dom";
import "../style/Nav.css";
import { UserContext } from "../../App";
function Feeds() {
	const user = JSON.parse(localStorage.getItem("user"));
	const Cname = user.name;
	const id = user._id;
	const { state, dispatch } = useContext(UserContext);
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch("/allpost", {
			headers: {
				Authorization: localStorage.getItem("token"),
			},
		})
			.then((res) => res.json())
			.then((result) => {
				setData(result.posts);
			});
	}, []);

	// Like function
	const postLike = (id) => {
		fetch("/like", {
			method: "put",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("token"),
			},
			body: JSON.stringify({
				postId: id,
			}),
		})
			.then((res) => res.json())
			.then((result) => {
				const newData = data.map((item) => {
					if (item._id == result._id) {
						return result;
					} else {
						return item;
					}
				});
				setData(newData);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// post Unlike
	const postunLike = (id) => {
		fetch("/unlike", {
			method: "put",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("token"),
			},
			body: JSON.stringify({
				postId: id,
			}),
		})
			.then((res) => res.json())
			.then((result) => {
				const newData = data.map((item) => {
					if (item._id == result._id) {
						return result;
					} else {
						return item;
					}
				});
				setData(newData);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// Comment function
	const makeCOmment = (text, postId,postedBy) => {
		fetch("/comment", {
			method: "put",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("token"),
			},
			body: JSON.stringify({
				postId,
				text: text,
				postedBy,
			}),
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result)
				const newData = data.map((item) => {
					if (item._id == result._id) {
						return result;
					} else {
						return item;
					}
				});
				setData(newData);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// Delete function
	const Delete = (postId) => {
		fetch(`/deletepost/${postId}`, {
			method: "delete",
			headers: {
				Authorization: localStorage.getItem("token"),
			},
		})
			.then((res) => res.json())
			.then((result) => {
				const newData = data.filter((item) => {
					return item._id !== result._id;
				});
				setData(newData);
			});
	};
	return (
		<React.Fragment>
			<NavBar />
			<div className="feed">
				{data.map((item) => {
					// console.log(item._id)
					return (
						<div className="card home-card" key={item?._id}>
							<h5 className="post_Name">
								<Link
									to={
										item.postedBy._id !== id
											? "/profile/" + item.postedBy._id
											: "/profile"
									}>
									{item.postedBy.name}
								</Link>
								{item.postedBy._id == id && (
									<i
										className="fas fa-trash del_ico"
										onClick={() => Delete(item._id)}></i>
								)}
							</h5>
							<div className="card-img">
								<img src={item.photo} alt="" />
							</div>
							<div className="card-content">
								<div className="p_body">
								{item.Likes.includes(state._id) ? (
										<span
											className="like"
											onClick={() => {
												postunLike(item._id);
											}}>
											<FavoriteIcon fontSize="large" color="secondary" />
										</span>
									) : (
										<span
											className="like"
											onClick={() => {
												postLike(item._id);
											}}>
											<FavoriteBorderIcon fontSize="large" color="action" />
										</span>
									)}
									
									<h6 className="Title">{item.title}</h6>
								</div>

								<h6 className="like_count">{item.Likes.length} Likes</h6>
								<div className="cmt_box">
									{item.comment.map((record) => {
										return (
											<h6 key={record._id}>
												
												<span className="cmt_name">
													
													<Link
														to={
															record.name !== record._id
																? "/profile/" +record.postedBy
																: "/profile"
														}>
														{record.name}
													</Link>
													:
												</span>

												{/* <span className="cmt_name">{record.name}: </span> */}
												<span className="Comment">{record.text}</span>
											</h6>
										);
									})}
								</div>
								<form
									className="input_cmt"
									onSubmit={(e) => {
										e.preventDefault();
										makeCOmment(e.target[0].value, item._id);
									}}>
									<input type="text" placeholder="Add comment" />
								</form>
							</div>
						</div>
					);
				})}
			</div>
		</React.Fragment>
	);
}

export default Feeds;
