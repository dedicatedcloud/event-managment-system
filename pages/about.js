import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import image from "../public/assets/aboutUsImage.jpg"
import Image from 'next/image';
import img4 from "../public/assets/img4.jpg";
import img5 from "../public/assets/img5.jpg";
import img6 from "../public/assets/img6.jpg";


export default function AboutUs(props) {

    return (
        <Box component={"div"}>
            <Box component={"div"} className={"waterMark"} sx={{ textAlign : { xs : "center", sm : "center" } }}>
                <Typography variant={"h4"} color={"secondary"} textTransform={"uppercase"}>About</Typography>
                <Typography variant={"h4"} color={"secondary"} textTransform={"uppercase"}>W&Decor Event Management</Typography>
            </Box>
            <Box component={"div"} sx={{ display : "flex", flexDirection : { xs : "column", sm : "row", md : "row", lg : "row" }, justifyContent : "space-evenly", alignItems : "center", paddingY : 6, paddingX : { xs : 0, sm : 2 } }}>
                <Box component={"div"}>
                    <Typography sx={{ color : "#f08a5d", fontSize : { xs : "2rem", sm : "2rem", md : "3rem", lg : "5rem" }, width : { xs : "100%", sm : "13rem", md : "20rem", lg : "32rem" }, textAlign : { xs : "none", sm : "left", md : "left", lg : "left" }, marginBottom : { xs : "1rem", sm : "1rem" } }} textAlign={"right"} textTransform={"uppercase"}>Infinite Possibilities.</Typography>
                </Box>
                <Box component={"div"} sx={{ width : { xs : "22rem", sm : "28rem", md : "30rem", lg : "32rem" }, textAlign : { xs : "center", sm : "center" } }}>
                    <Typography sx={{ maxWidth : "60rem", color : "#6d6e71", backGroundColor : "#000000", fontFamily : "Times New Roman", fontSize : "15px", lineHeight : "24px", verticalAlign : "baseline", letterSpacing : "normal", fontWeight : 100, fontStyle : "normal", fontVariant : "normal", textTransform : "none", textDecoration : "rgb(109, 110, 113)", textIndent : "0px" }}>
                        W Events & Decor was created out of a love for dynamic events and fine dining. Our goal is to provide unparalleled event services and outstanding customer service.
                    </Typography>
                    <Typography sx={{ maxWidth : "60rem", marginTop : 3, color : "#6d6e71", backGroundColor : "#000000", fontFamily : "Times New Roman", fontSize : "15px", lineHeight : "24px", verticalAlign : "baseline", letterSpacing : "normal", fontWeight : 100, fontStyle : "normal", fontVariant : "normal", textTransform : "none", textDecoration : "rgb(109, 110, 113)", textIndent : "0px" }}>
                        Why W Events & Decor? Because with us, there are infinite possibilities. Big or small, we are committed to creating one-of-a-kind events that your guests will remember for years to come. Customization is guaranteed, from your floor plan to your bar menu and signature lounge furniture.
                    </Typography>
                    <Typography sx={{ maxWidth : "60rem", marginTop : 3, color : "#6d6e71", backGroundColor : "#000000", fontFamily : "Times New Roman", fontSize : "15px", lineHeight : "24px", verticalAlign : "baseline", letterSpacing : "normal", fontWeight : 100, fontStyle : "normal", fontVariant : "normal", textTransform : "none", textDecoration : "rgb(109, 110, 113)", textIndent : "0px" }}>
                        We work with the best vendors to provide planning and design services at the venue of your dreams through exclusive venue management and in-house catering.
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center", flexWrap : "wrap", backgroundColor : "rgb(239, 239, 239)", paddingTop : "5rem", paddingBottom : "5rem" }}>
                <Box sx={{ display : "flex", flexDirection : { xs : "column", sm : "row", md : "row", lg : "row" }, justifyContent : "center", alignItems : "center" }}>
                    <Box sx={{ display :"flex", flexDirection : "column", justifyContent : "start",flex : { xs : 0, sm : 1 }, width : { xs : "20rem", sm : "20rem", md : "20rem", lg : "35rem" }, textAlign : { xs : "center", sm : "left" }, marginX : { xs : 0, sm : 2 }}}>
                        <Box component={"div"} sx={{maxWidth : "30rem"}}>
                            <Typography sx={{ color : "#f08a5d",fontSize : "14px", textTransform : "uppercase", fontWeight : "bold", letterSpacing : "1px", paddingY : "1rem" }}>weddings</Typography>
                            <Typography sx={{ color : "#6d6e71", backGroundColor : "#000000", fontFamily : "Times New Roman", fontSize : "15px", lineHeight : "24px", verticalAlign : "baseline", letterSpacing : "normal", fontWeight : 100, fontStyle : "normal", fontVariant : "normal", textTransform : "none", textDecoration : "rgb(109, 110, 113)", textIndent : "0px" }}>Ease the stress of planning your big day with our team by your side. From coordinating your entire wedding weekend and bringing your design ideas to life, W Events & Decor will help you every step of the way.</Typography>
                        </Box>
                        <Box component={"div"} sx={{maxWidth : "30rem"}}>
                            <Typography sx={{ color : "#f08a5d", fontSize : "14px", textTransform : "uppercase", fontWeight : "bold", letterSpacing : "1px", paddingY : "1rem" }}>corporate events</Typography>
                            <Typography sx={{ color : "#6d6e71", backGroundColor : "#000000", fontFamily : "Times New Roman", fontSize : "15px", lineHeight : "24px", verticalAlign : "baseline", letterSpacing : "normal", fontWeight : 100, fontStyle : "normal", fontVariant : "normal", textTransform : "none", textDecoration : "rgb(109, 110, 113)", textIndent : "0px" }}>Bring your brand to life through your next event with W Events & Decor. We’ll work with your company to coordinate and manage everything you need to wow your employees and guests, from meeting planning and on-site coordination to security and transportation needs.</Typography>
                        </Box>
                        <Box component={"div"} sx={{maxWidth : "30rem", marginBottom : { xs : 2, sm : 2 }}}>
                            <Typography sx={{ color : "#f08a5d", fontSize : "14px", textTransform : "uppercase", fontWeight : "bold", letterSpacing : "1px", paddingY : "1rem" }}>social gatherings</Typography>
                            <Typography sx={{ color : "#6d6e71", backGroundColor : "#000000", fontFamily : "Times New Roman", fontSize : "15px", lineHeight : "24px", verticalAlign : "baseline", letterSpacing : "normal", fontWeight : 100, fontStyle : "normal", fontVariant : "normal", textTransform : "none", textDecoration : "rgb(109, 110, 113)", textIndent : "0px" }}>Getting engaged? Going all out for your next birthday? W Events & Decor can help you throw the party of your dreams, turning your vision into a reality and coordinating everything you need from the design, event rentals, and even entertainment.</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ flex : { xs : 0, sm : 1 }, marginX : { xs : 0, sm : 2 } }}>
                        <Image src={image} width={500} height={400}/>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ paddingY : "3rem" }}>
                <Typography variant={"h4"} align={"center"} color={"primary"}>Event Services</Typography>
                <Typography variant={"subtitle2"} align={"center"} sx={{ color : "#6d6e71", backGroundColor : "#000000", fontFamily : "Times New Roman", fontSize : "15px", lineHeight : "24px", verticalAlign : "baseline", letterSpacing : "normal", fontWeight : 100, fontStyle : "normal", fontVariant : "normal", textTransform : "none", textDecoration : "rgb(109, 110, 113)", textIndent : "0px", paddingY : "1rem" }}>some of our many areas of expertise</Typography>
                <Box component={"div"} sx={{ width : "8rem", margin : "0 auto", height : "1px", backgroundColor : "#000000", marginY : "1rem" }} />
                <Box sx={{display : "flex", flexDirection : "row", justifyContent : "center", alignItems : "center", flexWrap : "wrap", backgroundColor : "rgb(255,255,255)", paddingTop : "1rem"}}>
                    <Box component={"div"} sx={{ textAlign : "center", width : "23rem" }}>
                        <Typography sx={{ color: "#f08a5d", backgroundColor : "rgba(0, 0, 0, 0)", fontSize : "20px", lineHeight : "56px", verticalAlign: "baseline", letterSpacing: "2px", wordSpacing: "0px", fontWeight: 600, fontStyle : "normal", fontVariant : "normal", textTransform : "uppercase", textDecoration : "rgb(0, 0, 0)", textIndent : "0px" }}>Event Planning</Typography>
                        <Image src={img4} width={"300px"} height={"200px"}/>
                        <Typography sx={{ maxWidth : "60rem",marginBottom : 2, marginTop : 5, color : "#6d6e71", backGroundColor : "#000000", fontFamily : "Times New Roman", fontSize : "15px", lineHeight : "24px", verticalAlign : "baseline", letterSpacing : "normal", fontWeight : 100, fontStyle : "normal", fontVariant : "normal", textTransform : "none", textDecoration : "rgb(109, 110, 113)", textIndent : "0px" }}>The best way to enjoy the event planning process is to work with a professional planner. Let your W Events & Decor event team coordinate the details, so you can relax and have fun as your vision becomes a reality.</Typography>
                    </Box>
                    <Box component={"div"} sx={{ textAlign : "center", width : "23rem", marginX : 3 }}>
                        <Typography sx={{ color: "#f08a5d", backgroundColor : "rgba(0, 0, 0, 0)", fontSize : "20px", lineHeight : "56px", verticalAlign: "baseline", letterSpacing: "2px", wordSpacing: "0px", fontWeight: 600, fontStyle : "normal", fontVariant : "normal", textTransform : "uppercase", textDecoration : "rgb(0, 0, 0)", textIndent : "0px" }}>Event Design</Typography>
                        <Image src={img5} width={"300px"} height={"200px"}/>
                        <Typography sx={{ maxWidth : "60rem",marginBottom : 2, marginTop : 5, color : "#6d6e71", backGroundColor : "#000000", fontFamily : "Times New Roman", fontSize : "15px", lineHeight : "24px", verticalAlign : "baseline", letterSpacing : "normal", fontWeight : 100, fontStyle : "normal", fontVariant : "normal", textTransform : "none", textDecoration : "rgb(109, 110, 113)", textIndent : "0px" }}>Your  W Events & Decor event team will collaborate with you to design your event, creating an inspiration board and floor plan based on your unique vision. From centerpieces to seating charts, with us customization is guaranteed.</Typography>
                    </Box>
                    <Box component={"div"} sx={{ textAlign : "center", width : "23rem" }}>
                        <Typography sx={{ color: "#f08a5d", backgroundColor : "rgba(0, 0, 0, 0)", fontSize : "20px", lineHeight : "56px", verticalAlign: "baseline", letterSpacing: "2px", wordSpacing: "0px", fontWeight: 600, fontStyle : "normal", fontVariant : "normal", textTransform : "uppercase", textDecoration : "rgb(0, 0, 0)", textIndent : "0px" }}>Event Production</Typography>
                        <Image src={img6} width={"300px"} height={"200px"}/>
                        <Typography sx={{ maxWidth : "60rem",marginBottom : 2, marginTop : 5, color : "#6d6e71", backGroundColor : "#000000", fontFamily : "Times New Roman", fontSize : "15px", lineHeight : "24px", verticalAlign : "baseline", letterSpacing : "normal", fontWeight : 100, fontStyle : "normal", fontVariant : "normal", textTransform : "none", textDecoration : "rgb(109, 110, 113)", textIndent : "0px" }}>Event production is more than event planning and design. Our team will be there every step of the way bringing together every detail required to deliver a spectacular, memorable event on time and on budget.</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

AboutUs.layout = "user";
