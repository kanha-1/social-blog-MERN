import React,{ useContext} from "react";
import "../style/LoginIco.css"
import { UserContext } from "../../App";
import GoogleLogin from "react-google-login";
import Axios from "axios";
import { useHistory } from "react-router-dom";
function Google(props) {
	const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
	const responseGooglesuccess = (response) => {

		console.log(response);
		Axios({
			method: "POST",
			url: "https://rocky-stream-29032.herokuapp.com/googlelogin",
			data: { tokenId: response.tokenId },
		})
			.then((respo) => {
				// console.log("Google login Successfully", respo.data.user.picture);
				localStorage.setItem("token", respo.data.token);
				localStorage.setItem("user", JSON.stringify(respo.data.user));
				dispatch({ type: "USER", payload: respo.data.user });
				
				// console.log(respo.data.user)
				if (respo.data.token) {
					history.push("/Feed")
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
		<div>
			<GoogleLogin
				clientId="697293928836-kmos7v7b9r1khvnijmhblbg1h0af6fed.apps.googleusercontent.com"
				buttonText="Signup With Google"
				onSuccess={responseGooglesuccess}
				onFailure={responseGooglefailure}
				cookiePolicy={"single_host_origin"}
			/>
		</div>
	);
}

export default Google;
