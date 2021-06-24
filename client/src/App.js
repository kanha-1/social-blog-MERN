import React, { useEffect, useContext, useReducer, createContext } from "react";
import {
	Route,
	Switch,
	Redirect,
	BrowserRouter,
	useHistory,
} from "react-router-dom";
import "./App.css";
import Welcome from "./Components/Welcome/Welcome";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import decode from "jwt-decode";
import ResetPassword from "./Components/User/ResetPassword";
import Error from "./Components/User/Error";
import profile from "./Components/Dashboard/Profile";
import Feeds from "./Components/Dashboard/Feeds";
import CreatePost from "./Components/Dashboard/CreatePost";
import UserProfile from "./Components/Dashboard/UserProfile";
import FriendPost from "./Components/Dashboard/MyFriendsPost";
import { reducer, initialState } from "./reducers/userReducer";

export const UserContext = createContext();

const isAuthenticated = () => {
	const token = localStorage.getItem("token");
	try {
		decode(token);
	} catch (err) {
		return false;
	}
	return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={({ props }) =>
			isAuthenticated() ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: "/login",
					}}
				/>
			)
		}
	/>
);

const Routing = () => {
	const history = useHistory();
	const { state, dispatch } = useContext(UserContext);
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		console.log(user)
		if (user) {
			dispatch({ type: "USER", payload: user });
			history.push("/Feed");
		} else {
			localStorage.clear();
		}
	}, []);
	return (
		<Switch>
			<Route exact path="/" component={Welcome} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/register" component={Register} />
			<Route exact path="/reset/:token/:email" component={ResetPassword} />
			<Route exact path="/profile" component={profile} />
			<PrivateRoute exact path="/Feed" component={Feeds} />
			<PrivateRoute exact path="/friendPost" component={FriendPost} />
			<PrivateRoute exact path="/CreatePost" component={CreatePost} />
			<PrivateRoute exact path="/profile/:userid" component={UserProfile} />
			<Route component={Error} />
		</Switch>
	);
};
function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<Routing />
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
