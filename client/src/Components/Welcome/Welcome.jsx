import React from "react";
import { Link } from "react-router-dom";
import "../style/Welcome.css";
function Welcome() {
	return (
		<div className="main_Div">
			<div>
				<div className="Wel_text">
					<h1>
						Welcome to{" "}
						<b>
							<i> Social</i>
						</b>
					</h1>
				</div>
				<div className="Get_Started">
					<p>
						<Link to="/register">
							<button className="start_btn">Get started</button>
						</Link>
					</p>
				</div>
			</div>
			<div className="Right_div">
				<h3>
					Join{" "}
					<b>
						<i> Social</i>
					</b>{" "}
					Today and Connect <br /> with your Famly & Friends .
				</h3>
			</div>
		</div>
	);
}

export default Welcome;
