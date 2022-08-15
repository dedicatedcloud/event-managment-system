import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {signOut} from "next-auth/react";
import LogoutIcon from '@mui/icons-material/Logout';
import {useTheme} from "@mui/material/styles";

export default function DropDown() {

    const theme = useTheme();

    const [anchorEl, setAnchorEl] = React.useState(null);
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
                sx={{
                    cursor: "pointer",
                    borderRadius: 1,
                    marginX: 1,
                    paddingX: 3,
                    paddingY: 1,
                    fontSize: "20px",
                }}
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color={"primary"}
                variant={"text"}
            >
                <AccountCircleIcon fontSize={"large"}/>
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
                <MenuItem onClick={() => signOut({callbackUrl: "/"})} sx={{color: theme.palette.primary.main}}><LogoutIcon/>Logout</MenuItem>
            </Menu>
        </div>
    );
}
