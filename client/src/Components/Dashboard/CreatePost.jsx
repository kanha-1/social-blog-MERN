import React from "react";
import Button from "@material-ui/core/Button";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import "../style/Nav.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../Navbar"

function CreatePost() {
	const history = useHistory();
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [image, setImage] = useState("");
	const [msg, setMsg] = useState("");

	const postDetails = () => {
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
				const url = data.url
				console.log("this is url", data.url);
				fetch("https://social-dev-be.herokuapp.com/createpost", {
					method: "post",
					headers: {
						"Content-Type": "application/json",
						Authorization: localStorage.getItem("token"),
					},
					body: JSON.stringify({
						title,
						body,
						pic: url,
					}),
				})
					.then((res) => res.json())
					.then((data) => {
						console.log(data.post.photo);
						if(data.post.photo){
							setMsg('Uploaded Successfully')
							setTimeout(()=>{
								history.push("/Feed")
							},2000)
						}
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<React.Fragment>
			<NavBar/>
			<h1 className="pic_success">{msg}</h1>
			<div className="card input-field ">
				<h6>Upload Picture</h6>
				<input
					type="text"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Body"
					value={body}
					onChange={(e) => setBody(e.target.value)}
				/>
				<div className="file-field input-field">
					<div className="btn_title">
					<label For="file-input">
						<AttachFileIcon/>
						</label>
						<input id="file-input" type="file" onChange={(e) => setImage(e.target.files[0])} />
					</div>
				</div>
				<Button
					variant="contained"
					color="primary"
					onClick={() => postDetails()}>
					Post
				</Button>
			</div>
		</React.Fragment>
	);
}

export default CreatePost;
