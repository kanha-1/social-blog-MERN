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
	Grid,
	Tooltip,
	Card,
	CardHeader,
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
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import InstagramIcon from "@material-ui/icons/Instagram";
const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	// title: {
	// 	display: "none",
	// 	[theme.breakpoints.up("sm")]: {
	// 		display: "block",
	// 	},
	// },
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(0),
			width: "auto",
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
	rootclick: {
		position: "relative",
	},
	dropdown: {
		position: "absolute",
		right: 0,
		left: 0,
		zIndex: 1,
		padding: "8px",
		border: "1px solid",
		backgroundColor: "#3f51b5",
		color: "black",
		borderBottomLeftRadius: "8px",
		borderBottomRightRadius: "8px",
	},
	picSize: {
		width: "60px",
		height: "60px",

		animation: "zoom 50s",
	},
}));

export default function Navbar() {
	const history = useHistory();
	const classes = useStyles();
	const [openClick, setopenClick] = useState(false);
	const [search, setSearch] = useState("");
	const [userDeatls, setUserdetails] = useState([]);
	const user = JSON.parse(localStorage.getItem("user"));
	console.log(search)
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
				// if (result.user == 0) {
				// 	console.log("no result found");
				// } else {
				// 	setUserdetails(result.user);
				// }
				setUserdetails(result.user);
			});
	};

	const inputChange = (e) => {
		fetchUsers(e.target.value);
		setopenClick(true);
	};
	const handleClickAway = () => {
		setopenClick(false);
	};
	const userDetailPage = async (id) => {
		history.push(`/profile/${id}`);
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
						<Typography variant="caption">Feeds</Typography>
					</Box>
				</Link>
			</MenuItem>
			<MenuItem>
				<Link to="/friendPost">
					<Box>
						<PeopleAltIcon />
						<Typography variant="caption">Friends Post</Typography>
					</Box>
				</Link>
			</MenuItem>
			<MenuItem>
				<Link to="/CreatePost">
					<Box>
						<CloudUploadIcon />
						<Typography variant="caption">Create post</Typography>
					</Box>
				</Link>
			</MenuItem>
			<MenuItem>
				<Link to="/profile">
					<Box>
						<AccountCircle />
						<Typography variant="caption">Profile</Typography>
					</Box>
				</Link>
			</MenuItem>
			<MenuItem
				onClick={() => {
					localStorage.clear();
					history.push("/login");
				}}>
				<ExitToAppIcon />
				<Typography variant="caption">Logout</Typography>
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="open drawer">
						<InstagramIcon />
					</IconButton>
					<Box>
						<Typography className={classes.title} variant="h5" noWrap>
							<Link to="/Feed">Social-Blog</Link>
						</Typography>
					</Box>
					<Box ml={4}>
						<div className={classes.search}>
							<TextField
								variant="outlined"
								type="text"
								size="small"
								placeholder="Search People . . "
								autoComplete="off"
								name="searchbar"
								value={search}
								onChange={inputChange}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<SearchIcon />
										</InputAdornment>
									),
								}}
							/>
							<ClickAwayListener onClickAway={handleClickAway}>
								<div className={classes.rootclick}>
									<div>
										{openClick ? (
											<div className={classes.dropdown}>
												<Grid
													style={{ margin: "10px 0" }}
													container
													direction="column">
													{userDeatls?.map((item) => (
														<Grid
															item
															key={item._id}
															onClick={() => userDetailPage(item._id)}>
															<Tooltip
																title="click for seen user Details"
																aria-label="add">
																<Card
																	style={{
																		cursor: "pointer",
																		width: "100%",
																	}}>
																	<CardHeader
																		style={{ fontSize: "10px" }}
																		avatar={
																			<Avatar alt="user" src={item.pic} />
																		}
																		title={item.name}
																	/>
																</Card>
															</Tooltip>
														</Grid>
													))}
												</Grid>
											</div>
										) : null}
									</div>
								</div>
							</ClickAwayListener>
						</div>
					</Box>
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
									<Typography variant="caption">Feeds</Typography>
								</Box>
							</Link>
							<Link to="/friendPost">
								<Box mr={3}>
									<PeopleAltIcon />
									<Typography variant="caption">Friends Feed</Typography>
								</Box>
							</Link>
							<Link to="/CreatePost">
								<Box>
									<CloudUploadIcon />
									<Typography variant="caption">Create post</Typography>
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
								<img
									src={user.pic}
									className={classes.picSize}
									alt="profil_pic"
								/>
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
