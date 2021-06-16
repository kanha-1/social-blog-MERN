import React from "react";
import FacebookLogin from "react-facebook-login";
import FacebookIcon from "@material-ui/icons/Facebook";
import "../style/LoginIco.css"
import { useHistory } from "react-router-dom";
import Axios from "axios"
function Fb() {
	
    let history = useHistory();
	const responseFacebook = (response) => {
        Axios({
            method:"POST",
            url:"https://rocky-stream-29032.herokuapp.com/fblogin",
            data:{accessToken:response.accessToken,userID:response.userID}
        }).then(res=>{
            // console.log(res.data.user)
			localStorage.setItem("token", res.data.token);
			localStorage.setItem("user", JSON.stringify(res.data.user));
			
				if (res.data.token) {
					history.push("/Feed");
				}
        }).catch(err=>{
            console.log(err)
        })
	};
	return (
		<div>
			<FacebookLogin
				appId="630132924308114"
				textButton	="Signup With Facebook"
				autoLoad={false}
				callback={responseFacebook}
				cssClass="costume"
				icon={<FacebookIcon/>}
			/>
		</div>
	);
}

export default Fb;
