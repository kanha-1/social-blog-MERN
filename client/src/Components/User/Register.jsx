import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import User from "@material-ui/icons/PermIdentity";
import Email from "@material-ui/icons/AlternateEmail";
import Phone from "@material-ui/icons/PhoneAndroid";
import LockIcon from "@material-ui/icons/Lock";
import "../style/LoginIco.css";
import Facebook from "./Fb";
import Google from "./Google";
import { UserContext } from "../../App";
import {  toast } from "react-toastify";
function Register(props) {
	const [msg, setMsg] = useState("");
	const { state, dispatch } = useContext(UserContext);
	const [values, setvalues] = useState({
		name: "",
		email: "",
		mobile: "",
		password: "",
	});
	const inputEvent = (e) => {
		setvalues({ ...values, [e.target.name]: e.target.value });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		Axios.post(`/register`, {
			name: values.name,
			email: values.email,
			mobile: values.mobile,
			password: values.password,
		})
			.then((result) => {
				// console.log(result);
				if (result.data.message = result.data.message) {
					// alert("E-mail alredy exits");
					setMsg(result.data.message);
					toast.error(result.data.message)
				}
				else if (result.data.token) {
					localStorage.setItem("token", result.data.token);
					localStorage.setItem("user", JSON.stringify(result.data.user));	
					dispatch({ type: "USER", payload: result.data.user });
					props.history.push("/Feed");
					toast.success("Register successfully");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="start">
			<div className="layout">
				{/* <!-- Start of Sign Up --> */}
				<div className="main order-md-2">
					<div className="start">
						<div className="container">
							<div className="col-md-12">
								<div className="content">
									<h1>Create Account</h1>
									<div className="third-party">
										{/* <span className="pLogin">
											<Facebook />
										</span>

										<div className="pLogin">
											<Google />
										</div> */}
									</div>
									<p className="alert">{msg}</p>
									<form className="signup" onSubmit={onSubmit}>
										<div className="form-parent">
											<div className="form-group">
												<input
													type="text"
													name="name"
													className="form-control"
													value={values.name}
													onChange={inputEvent}
													placeholder="Name"
													autoFocus
													required
													autoComplete="off"
												/>
												<button className="btn icon">
													<User />
												</button>
											</div>
											<div className="form-group">
												<input
													type="email"
													name="email"
													className="form-control"
													value={values.email}
													onChange={inputEvent}
													placeholder="Email adress"
													required
													autoComplete="off"
												/>
												<button className="btn icon">
													<Email />
												</button>
											</div>
										</div>
										<div className="form-group">
											<input
												type="tel"
												name="mobile"
												className="form-control"
												value={values.mobile}
												onChange={inputEvent}
												placeholder="Mobile No"
												required
												autoComplete="off"
											/>
											<button className="btn icon">
												<Phone />
											</button>
										</div>
										<div className="form-group">
											<input
												type="password"
												name="password"
												value={values.password}
												onChange={inputEvent}
												className="form-control"
												placeholder="Password"
												required
											/>
											<button className="btn icon">
												<LockIcon />
											</button>
										</div>
										<button type="submit" className="btn button cos">
											Sign Up
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
								<h2>Hello, Social</h2>
								<p>
									Connect with Friends and Famly .
								</p>
								<Link to="/login" className="btn button">
									Log-in
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
