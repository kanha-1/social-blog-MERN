import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {
	Typography,
	Box,
	TextField,
	InputAdornment,
	Avatar,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link, useHistory } from "react-router-dom";
import MoreIcon from "@material-ui/icons/MoreVert";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(3),
			width: "auto",
		},
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
}));

export default function Navbar() {
	const history = useHistory();
	const classes = useStyles();
	const [search, setSearch] = useState("");
	const [userDeatls, setUserdetails] = useState([]);
	const user = JSON.parse(localStorage.getItem("user"));
	console.log(userDeatls);
	const fetchUsers = (query) => {
		setSearch(query);
		fetch("/search-users", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query,
			}),
		})
			.then((res) => res.json())
			.then((result) => {
				if (result.user == 0) {
					console.log("no result found");
				} else {
					setUserdetails(result.user);
				}
			});
	};

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}>
			<MenuItem>
				<Link to="/profile">Profile</Link>
			</MenuItem>
			<MenuItem
				onClick={() => {
					localStorage.clear();
					history.push("/login");
				}}>
				Logout
			</MenuItem>
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}>
			<MenuItem>
				<Link to="/Feed">
					<Box mr={3}>
						<RssFeedIcon />
						<Typography variant="subtitle">Feeds</Typography>
					</Box>
				</Link>
			</MenuItem>
			<MenuItem>
				<Link to="/CreatePost">
					<Box>
						<CloudUploadIcon />
						<Typography variant="subtitle">Create post</Typography>
					</Box>
				</Link>
			</MenuItem>
			<MenuItem>
				<Link to="/profile">
					<Box>
						<AccountCircle />
						<Typography variant="subtitle">Profile</Typography>
					</Box>
				</Link>
			</MenuItem>
			<MenuItem
				onClick={() => {
					localStorage.clear();
					history.push("/login");
				}}>
				<ExitToAppIcon />
				<Typography variant="subtitle">Logout</Typography>
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar position="static">
				<Toolbar>
					<Typography className={classes.title} variant="h5" noWrap>
						<Link to="/Feed">Social-Blog</Link>
					</Typography>
					<div className={classes.search}>
						<TextField
							variant="outlined"
							type="text"
							size="small"
							placeholder="Search "
							autoComplete="off"
							name="searchbar"
							value={search}
							onChange={(e) => fetchUsers(e.target.value)}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<SearchIcon />
									</InputAdornment>
								),
							}}
						/>
						{/* <ul className="searchd_people">
							{userDeatls.map((item) => {
								return (
									<Link to={"/profile/" + item._id}>
										<li></li>
										{item.email}
									</Link>
								);
							})}
						</ul> */}
					</div>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<Box
							display="flex"
							justifyContent="space-arround"
							alignItems="center"
							mr={5}
							p={3}>
							<Link to="/Feed">
								<Box mr={3}>
									<RssFeedIcon />
									<Typography variant="subtitle">Feeds</Typography>
								</Box>
							</Link>
							<Link to="/CreatePost">
								<Box>
									<CloudUploadIcon />
									<Typography variant="subtitle">Create post</Typography>
								</Box>
							</Link>
						</Box>
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit">
							{/* <AccountCircle style={{ fontSize: 40 }} /> */}
							<Avatar>
								<img src={user.pic} alt="profil_pic" />
							</Avatar>
						</IconButton>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit">
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</div>
	);
}
