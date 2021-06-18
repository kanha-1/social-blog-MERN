import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { DialogContentText, Typography } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import "../style/LoginIco.css";

function FormDialog() {
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState({ email: "" });
	const [err, setErr] = useState("");
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const inputEvent = (e) => {
		setInput(e.target.value);
	};
	const handleSubmit = () => {
		Axios.put(`/forgotPassword`, {
			email: input,
		})
			.then((response) => {
				if (response.data.message === "Mail sent successfully") {
					toast.success("Email sent succssfully");
					setOpen(false);
				}
				if (response.data.message === "Not a register user please signup !") {
					setErr("User with this email dosn't exit");
					toast.error("User with this email dosn't exit");
				}
				// console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Forgot Password
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">*Forgot Password</DialogTitle>
				<DialogContent>
					<Typography color="secondary">{err}</Typography>
					<br />
					<Typography>
						To Reset your password please enter your email address here. We will
						send a reset link.
					</Typography>
					<TextField
						autoFocus
						margin="dense"
						name="name"
						label="Email Address"
						type="email"
						onChange={inputEvent}
						// value={input.email}
						autoComplete="off"
						required
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSubmit} color="primary">
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default FormDialog;
