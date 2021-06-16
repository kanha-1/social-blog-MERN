import React,{useContext} from 'react'
import { Link, Route, Switch, NavLink, } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import {UserContext}from "../App"
import "../Components/style/Nav.css"
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
function Navbar() {
    const history = useHistory();
    const {state,dispatch}= useContext(UserContext)
    return (
        <div>
            <nav className="navbar navbar-expand-lg nav-wrapper ">
                {/* {renderList()} */}
				<Link className="brand-logo" to="/Feed">
					Social
				</Link>
				{/* <div className="srch_nav">
					<SearchIcon />
				</div> */}
				<div className="collapse navbar-collapse lnks" id="navbarNav">
					<ul className="navbar-nav right">
						<li className="nav-item nav-link nt">
							<Link to="/Feed">Feed</Link>
						</li>
						<li className="nav-item nav-link nt">
							<Link to="/profile">Profile</Link>
						</li>
						<li className="nav-item nav-link nt">
							<Link to="/CreatePost">Create Post</Link>
						</li>
						<li className="nav-item nav-link">

							<Button
								className="logout_btn"
								variant="contained"
								color="secondary"
								onClick={() => {
									localStorage.clear();
									history.push('/login')
								}}>
								LogOut
							</Button>
						</li>
					</ul>
				</div>
			</nav>
        </div>
    )
}

export default Navbar
