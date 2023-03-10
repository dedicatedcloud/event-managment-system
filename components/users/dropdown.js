import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { signOut } from "next-auth/react";
import LogoutIcon from '@mui/icons-material/Logout';
import Link from "next/link";
import EventIcon from "@mui/icons-material/Event";
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";

export default function DropDown({ toggleDrawer }) {

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));;

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				sx={!matches ? { cursor: "pointer", borderRadius: 1, marginX: 1, paddingX: 3, paddingY: 1, fontSize: "20px" } : {}}
				id="fade-button"
				aria-controls={open ? 'fade-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				variant={"text"}
			>
				<AccountCircleIcon fontSize={"large"} />
			</Button>
			<Menu
				id="fade-menu"
				MenuListProps={{
					'aria-labelledby': 'fade-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}
			>
				<Link href={"/users/event"}><MenuItem sx={{ color: "#f08a5d" }} onClick={() => matches && toggleDrawer(false)}><Button disableRipple={true} startIcon={<EventIcon />} onClick={() => handleClose()}>Add Event</Button></MenuItem></Link>
				<MenuItem sx={{ color: "#f08a5d" }} onClick={() => matches && toggleDrawer(false)}><Link href={"/users/dashboard"}><Button disableRipple={true} startIcon={<SettingsIcon />} onClick={() => handleClose()}>Manage Events</Button></Link></MenuItem>
				<MenuItem onClick={() => {
					matches && toggleDrawer(false); signOut({ callbackUrl: "/" });
				}} sx={{ color: "#f08a5d" }}><Button disableRipple={true} startIcon={<LogoutIcon />} onClick={() => handleClose()}>Logout</Button></MenuItem>
			</Menu>
		</div>
	);
}