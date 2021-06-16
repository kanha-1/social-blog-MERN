import React from "react";
import "../style/err.scss";
import { Link } from "react-router-dom";

function Error() {
	return (
		<div className="errfull">
			<div className="noise"></div>
			<div className="overlay"></div>
			<div className="terminal">
				<h1 className="head">
					Error <span className="errorcode">404</span>
				</h1>
				<p className="output">
					The page you are looking for might have been removed, had its name
					changed or is temporarily unavailable.
				</p>
				<p className="output">
					Please try to <Link className="links" to="/login">go back</Link> or 
					<Link className="links" to="/">  return to the homepage</Link>.
				</p>
				<p className="output">Good luck.</p>
			</div>
		</div>
	);
}

export default Error;
