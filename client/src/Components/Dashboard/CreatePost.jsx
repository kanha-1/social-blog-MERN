import React from "react";
import Button from "@material-ui/core/Button";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import "../style/Nav.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../Navbar";
import { toast } from "react-toastify";
import axios from "axios";
function CreatePost() {
	const toastId = React.useRef(null);
	const history = useHistory();
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [image, setImage] = useState("");

	const postDetails = () => {
		const data = new FormData();
		data.append("file", image);
		data.append("upload_preset", "Social");
		data.append("cloud_name", "dsseuwzzr");

		axios({
			method: "post",
			url: "https://api.cloudinary.com/v1_1/dsseuwzzr/image/upload",
			data: data,
			onUploadProgress: (p) => {
				const progress = p.loaded / p.total;

				// check if we already displayed a toast
				if (toastId.current === null) {
					toastId.current = toast.info("Upload in Progress", {
						progress: progress,
					});
				} else {
					toast.update(toastId.current, {
						progress: progress,
					});
				}
			},
		})
			.then((data) => {
				const url = data.data.url;
				fetch("/createpost", {
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
						if (data.post.photo) {
							toast.success("Uploaded Successfully");
							setTimeout(() => {
								history.push("/Feed");
							}, 2000);
						}
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				toast.error("server error");
			});
	};

	return (
		<React.Fragment>
			<NavBar />
			<div className="card input-field ">
				<h6>Upload Picture</h6>
				<input
					type="text"
					placeholder="Title"
					value={title}
					required
					onChange={(e) => setTitle(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Body"
					value={body}
					required
					onChange={(e) => setBody(e.target.value)}
				/>
				<div className="file-field input-field">
					<div className="btn_title">
						<label htmlFor="file-input">
							<AttachFileIcon />
						</label>
						<input
							id="file-input"
							type="file"
							required
							onChange={(e) => setImage(e.target.files[0])}
						/>
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
