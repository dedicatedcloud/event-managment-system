import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import DropDown from "../components/admin/dropdown";
import CloseIcon from '@mui/icons-material/Close';
import logo from '../public/assets/logo.png';
import Image from "next/image";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HouseIcon from '@mui/icons-material/House';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SpeakerIcon from '@mui/icons-material/Speaker';
import {useSession} from "next-auth/react";
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EventIcon from '@mui/icons-material/Event';
import Footer from "../components/footer";
import Head from "next/head";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    backgroundColor : theme.palette.primary.light,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    backgroundColor : theme.palette.primary.light,
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function AdminLayout(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const { data: session, status } = useSession();

    //For Drawer Links

    const links = [
        {
            href : "/admin/dashboard",
            icon : <DashboardIcon fontSize={"medium"} color={"secondary"}/>,
            text : "Home"
        },
        {
            href : "/admin/guest",
            icon : <PeopleAltIcon fontSize={"medium"} color={"secondary"}/>,
            text : "Guest"
        },
        {
            href : "/admin/venue",
            icon : <HouseIcon fontSize={"medium"} color={"secondary"}/>,
            text : "Venue"
        },
        {
            href : "/admin/food",
            icon : <LocalDiningIcon fontSize={"medium"} color={"secondary"}/>,
            text : "Food"
        },
        {
            href : "/admin/equipment",
            icon : <SpeakerIcon fontSize={"medium"} color={"secondary"}/>,
            text : "Equipment"
        },
        {
            href : "/admin/events",
            icon : <EventIcon fontSize={"medium"} color={"secondary"}/>,
            text : "Events"
        },
        {
            href : "/admin/companyEvents",
            icon : <AdminPanelSettingsIcon fontSize={"medium"} color={"secondary"}/>,
            text : "Our Events"
        },
        {
            href : "/admin/users",
            icon : <PersonIcon fontSize={"medium"} color={"secondary"}/>,
            text : "Users"
        },
        {
            href : "/admin/admins",
            icon : <AdminPanelSettingsIcon fontSize={"medium"} color={"secondary"}/>,
            text : "Admins"
        }

    ];

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', backgroundColor : "#ffffff", overflowX : "hidden" }}>
            <Head>
                <title>W&Decor Event Management</title>
                <link rel="icon" type="image/x-icon" href="/assets/favicon.png"/>
            </Head>
            <AppBar position="fixed" elevation={0} color={"secondary"} open={open} sx={{ paddingY : 2 }}>
                <Toolbar>
                    <IconButton
                        color={"primary"}
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon fontSize={"large"} />
                    </IconButton>
                    <Box component={"div"} sx={{ display : "flex", flexDirection : "row", justifyContent : "end", alignItems : "center", flexGrow : 1 }}>
                        <Typography sx={{ margin : 0, paddingTop : 1, paddingX : 1, color : theme.palette.primary.light }} variant={"h6"}>Signed In As { status === "authenticated" && session.user.name } </Typography>
                        <DropDown/>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} sx={{ padding : 2 }}>
                <DrawerHeader sx={{ display : "flex", justifyContent : "space-between", alignItems : "center", margin : 2, padding : 1,  backgroundColor : "#ffffff",borderRadius : 3  }}>
                      <Box component={"div"} sx={{ cursor : "pointer" }}>
                          <Link href={"/"}><Image src={logo} width={"70rem"} height={"70rem"}/></Link>
                      </Box>
                       <Box component={"div"}>
                           <IconButton onClick={handleDrawerClose}>
                               <CloseIcon fontSize={"medium"} color={"primary"}/>
                           </IconButton>
                       </Box>
                </DrawerHeader>
                <Divider/>
                <List>
                    {
                        links.map((link, i) => (
                            <Link href={link.href} key={i}>
                                <ListItem button>
                                    <ListItemIcon>
                                        {link.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={link.text} sx={{ color : "white" }} />
                                </ListItem>
                            </Link>
                        ))
                    }
                </List>
                <Divider />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <DrawerHeader/>
                <Box component={"div"} sx={{ padding : 4 }}>
                    {props.children}
                </Box>
                <Footer/>
            </Box>
        </Box>
    );
}
