import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "../style/style.css";
import Axios from "axios";
import Email from "@material-ui/icons/AlternateEmail";
import LockIcon from "@material-ui/icons/Lock";
import FacebookLogin from "react-facebook-login";
import FacebookIcon from "@material-ui/icons/Facebook";
import "../style/LoginIco.css";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import FormDialog from "./ForgotPassword";
import {  toast } from "react-toastify";

function Login(props) {
	const { state, dispatch } = useContext(UserContext);
	// form
	const [msg, setMsg] = useState("");

	const [values, setValue] = useState({
		email: "",
		password: "",
	});
	const inputEvent = (e) => {
		setValue({ ...values, [e.target.name]: e.target.value });
	};
	const login = (e) => {
		e.preventDefault();
		Axios.post("/login", {
			email: values.email,
			password: values.password,
		})
			.then((response) => {
				console.log(response)
				if (response.data.message = response.data.message) {
					setMsg(response.data.message);
					toast.error(response.data.message);
				}

				// if (response.data.message === "Invalid credential") {
				// 	setMsg(response.data.message);
				// 	toast.error(response.data.message);
				// }
				//  else if (
				// 	response.data.message === "Not a register user please signup !"
				// ) {
				// 	setMsg(response.data.message);
				// 	toast.error(response.data.message);
				// } else if (
				// 	response.data.message === "May be you registerd using google or Fb"
				// ) {
				// 	setMsg(response.data.message);
				// 	toast.error(response.data.message);
				// } 
				else {
					// console.log(response.data.user)
					localStorage.setItem("token", response.data.token);
					localStorage.setItem("user", JSON.stringify(response.data.user));
					dispatch({ type: "USER", payload: response.data.user });
					props.history.push("/Feed");
					toast.success("Login successfully");
				}
			})
			.catch((err) => {
				toast.error("server error");
			});
	};

	// Facebook login
	const history = useHistory();
	const responseFacebook = (response) => {
		Axios({
			method: "POST",
			url: "http://localhost:8080/fblogin",
			data: { accessToken: response.accessToken, userID: response.userID },
		})
			.then((res) => {
				// console.log("Fb Login successfully", res);
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("user", JSON.stringify(res.data.user));

				if (res.data.token) {
					history.push("/Feed");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// Google Login
	// const [pic, setPic] = useState("");
	const responseGooglesuccess = (response) => {
		// console.log(response);
		Axios({
			method: "POST",
			url: "http://localhost:8080/googlelogin",
			data: { tokenId: response.tokenId },
		})
			.then((respo) => {
				// console.log("Google login Successfully", respo.data.user.picture);
				// setPic(respo.data.user.picture);
				localStorage.setItem("token", respo.data.token);
				localStorage.setItem("user", JSON.stringify(respo.data.user));
				dispatch({ type: "USER", payload: respo.data.user });

				// const pic = respo.data.user.picture
				// console.log(pic)
				if (respo.data.token) {
					history.push("/Feed");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const responseGooglefailure = (response) => {
		// console.log(response);
	};

	return (
		<div className="start">
			<div className="layout">
				{/* Start of Sign-in */}
				<div className="main order-md-1">
					<div className="start">
						<div className="container">
							<div className="col-md-12">
								<div className="content">
									<h1>Sign in to Social</h1>
									<div className="third-party">
										{/* <span className="pLogin">
											<FacebookLogin
												appId="630132924308114"
												textButton="Login With Facebook"
												autoLoad={false}
												callback={responseFacebook}
												cssClass="costume"
												// icon={<FacebookIcon />}
											/>
										</span> */}

										<div className="pLogin">
											{/* <GoogleLogin
												clientId="697293928836-kmos7v7b9r1khvnijmhblbg1h0af6fed.apps.googleusercontent.com"
												buttonText="Login With Google"
												onSuccess={responseGooglesuccess}
												onFailure={responseGooglefailure}
												cookiePolicy={"single_host_origin"}
											/> */}
										</div>
									</div>
									<p className="alert">{msg}</p>
									<form onSubmit={login}>
										<div className="form-group">
											<input
												type="email"
												name="email"
												className="form-control"
												value={values.email}
												onChange={inputEvent}
												placeholder="Email Address"
												required
											/>
											<button className="btn icon">
												<Email />
											</button>
										</div>
										<div className="form-group">
											<input
												type="password"
												name="password"
												className="form-control"
												value={values.password}
												onChange={inputEvent}
												placeholder="Password"
												required
											/>
											<button className="btn icon">
												<LockIcon />
											</button>
										</div>
										<div className="forgot">
											<FormDialog />
										</div>
										<button type="submit" className="btn button cos">
											Sign In
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <!-- End of Sign In -->
			<!-- Start of Sidebar --> */}
				<div className="aside order-md-2 gridient">
					<div className="container">
						<div className="col-md-12">
							<div className="preference">
								<h2>Welcome Back!</h2>
								<p>
									To keep connected with your friends please login with your
									personal info.
								</p>
								<Link to="/register" className="btn button">
									Register
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
