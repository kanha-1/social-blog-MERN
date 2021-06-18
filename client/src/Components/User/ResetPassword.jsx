import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { toast } from "react-toastify";
function ResetPassword(props) {
	const [msg, setMsg] = useState("");
	const [input, setIput] = useState({
		newpassword: "",
		confirmpassword: "",
	});

	const inputEvent = (e) => {
		setIput({ ...input, [e.target.name]: e.target.value });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		Axios.post("/resetPassword", {
			newpassword: input.newpassword,
			confirmpassword: input.confirmpassword,
			email: props.match.params.email,
		})
			.then((response) => {
				if (response.data.message === "Password resetted succesfully") {
					toast.success("Password reset successfully");

					setTimeout(() => {
						props.history.push("/login");
					}, 2000);
				}
				if (
					response.data.message ===
					"Password and confirm password does not match"
				) {
					toast.success("Password and confirm password does not match")
					setMsg(response.data.message);
				}
				// console.log(response.data.message);
				// console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
		// console.log(input)
	};
	return (
		<div>
			<div className="start">
				<div className="layout">
					<div className="main order-md-2">
						<div className="start">
							<div className="container">
								<div className="col-md-12">
									<div className="content">
										<h1>Reset Password</h1>
										<h5 className="alert">{msg}</h5>
										<form className="signup" onSubmit={onSubmit}>
											<div className="form-parent">
												<div className="form-group">
													<input
														type="password"
														name="newpassword"
														className="form-control"
														value={input.newpassword}
														onChange={inputEvent}
														placeholder="New Password"
														autoFocus
														required
														autoComplete="off"
													/>
													<button className="btn icon">
														<LockOpenIcon />
													</button>
												</div>
												<div className="form-group">
													<input
														type="password"
														name="confirmpassword"
														className="form-control"
														value={input.confirmpassword}
														onChange={inputEvent}
														placeholder="Confirm Password"
														required
														autoComplete="off"
													/>
													<button className="btn icon">
														<LockOpenIcon />
													</button>
												</div>
											</div>
											<button type="submit" className="btn button cos">
												Reset Password
											</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- End of Sign Up --> */}
					{/* <!-- Start of Sidebar --> */}
					<div className="aside order-md-1 gridient">
						<div className="container">
							<div className="col-md-12">
								<div className="preference">
									<h2>Hello, CoWorkers!</h2>
									<p>Reset Your Password .</p>
									<Link to="/login" className="btn button">
										Log-in
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ResetPassword;
