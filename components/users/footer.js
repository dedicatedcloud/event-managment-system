import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import logo from "../../public/assets/logo.png";
import Image from 'next/image';
import Link from "next/link";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { motion } from "framer-motion";

export default function Footer(props) {
    return (
        <Box component={"div"}>
            <Box component={"div"} sx={{ display : "flex", flexDirection : "row", justifyContent : "space-between", alignItems : "center", paddingX : { xs : 2, sm  : 2, md : 5, lg : 5 }, paddingY : 1,borderTop : 1, borderColor : "#d7d7d7" }}>
                <Box component={motion.div} initial={{ x : '-100vw' }} animate={{ x : 0 }} transition={{ delay : 0.6, type : 'tween', duration : 1  }}>
                    <Image src={logo} width={100} height={100} alt={"logo"}/>
                </Box>
                <Box component={motion.div} sx={{ display : "flex", flexDirection : "row", justifyContent : "space-evenly", alignItems : "center", paddingLeft : { xs : 2, sm : 2 } }} initial={{ x : '100vw' }} animate={{ x : 0 }} transition={{ delay : 0.6, type : 'tween', duration : 1  }}>
                    <Link href={"/about"}><Typography sx={{ color : "#f08a5d", fontSize : { xs : "16px", sm : "16px", md : "18px",lg : "18px" }, textAlign : { xs : "center", sm : "center" }, lineHeight : { xs : "25px", sm : "26px", md : "36px", lg : "36px" }, letterSpacing : "1px", textTransform : "uppercase", cursor : "pointer", ':hover' : { color : "#6d6e71" } }}>About Us</Typography></Link>
                    <Link href={"#"}><Typography variant={"subtitle1"} sx={{ marginX : 2, color : "#f08a5d",textAlign : { xs : "center", sm : "center" }, fontSize : { xs : "16px", sm : "16px", md : "18px",lg : "18px" }, lineHeight : { xs : "25px", sm : "26px", md : "36px", lg : "36px" }, letterSpacing : "1px", fontWeight : 500, textTransform : "uppercase", cursor : "pointer", ':hover' : { color : "#6d6e71" } }}>Privacy Policy</Typography></Link>
                    <Link href={"#"}><Typography variant={"subtitle1"} sx={{ color : "#f08a5d", textAlign : { xs : "center", sm : "center" }, fontSize : { xs : "16px", sm : "16px", md : "18px",lg : "18px" }, lineHeight : { xs : "25px", sm : "26px", md : "36px", lg : "36px" }, letterSpacing : "1px", fontWeight : 500, textTransform : "uppercase", cursor : "pointer", ':hover' : { color : "#6d6e71" } }}>Contact</Typography></Link>
                </Box>
            </Box>
            <Box component={"div"} sx={{ background : "#eee", display : "flex", flexDirection : "row", justifyContent : "space-between", alignItems : "center", paddingX: 3, paddingY : 4 }}>
                <Box sx={{ display : "flex", flexDirection : "row" }} component={motion.div}  initial={{ x : '-100vw' }} animate={{ x : 0 }} transition={{ delay : 0.6, type : 'tween', duration : 1  }}>
                    <FacebookIcon fontSize={"large"} sx={{ color : "#4267B2", ":hover" : { color : "#f08a5d" }, cursor : "pointer" }}/>
                    <InstagramIcon fontSize={"large"} sx={{ color : '#b32b6f', ":hover" : { color : "#f08a5d" }, marginX : 1, cursor : "pointer"}}/>
                    <TwitterIcon fontSize={"large"} sx={{ color : "#00acee", ":hover" : { color : "#f08a5d" }, cursor : "pointer" }}/>
                </Box>
                <Box component={motion.div}  initial={{ x : '100vw' }} animate={{ x : 0 }} transition={{ delay : 0.6, type : 'tween', duration : 1  }}>
                    <Typography variant={"subtitle1"} color={"primary"}>Copy Rights Reserved &copy; 2022</Typography>
                </Box>
            </Box>
        </Box>
    );
}
