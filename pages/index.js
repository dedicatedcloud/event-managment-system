import {getSession} from "next-auth/react";
import Image from 'next/image';
import img1 from "../public/assets/img1.jpg";
import img2 from "../public/assets/img2.jpg";
import img3 from "../public/assets/img3.jpg";
import Carousel from "../components/users/carousel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home(props) {


  return (
      <>
          <Carousel/>
          <Box component={"div"}>
              <Box component={"div"} sx={{ paddingX : { xs : 1, sm : 2, md : 0, lg : 0 }, paddingY : 10 , display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center", backgroundColor : "rgb(239, 239, 239)", overflow : "hidden" }}>
                <Typography variant={"subtitle1"} color={"black"} sx={{ marginBottom : { xs : 1, sm : 1, md : 2, lg : 2}, color : "rgb(0, 0, 0)", backgroundColor : "rgba(0, 0, 0, 0)", fontSize : "15px", lineHeight : "24px", verticalAlign : "baseline", letterSpacing : "1px", wordSpacing : "0px", fontWeight : "400", fontStyle : "normal",fontVariant : "normal", textTransform : "none", textDecoration : "rgb(0, 0, 0)", textIndent : "o0px" }} component={motion.div} initial={{ x : '-100vw' }} animate={{ x : 0 }} transition={{ delay : 0.4, duration : 1, type : 'spring' }}>UNPARALLELED, STRESS-FREE</Typography>
                <Typography variant={"h5"} color={"black"} align={"center"} sx={{ color: "#f08a5d", backgroundColor : "rgba(0, 0, 0, 0)", fontSize : { xs : "21px", sm : "21px", md : "44px", lg : "44px" }, lineHeight : "56px", verticalAlign: "baseline", letterSpacing: "2px", wordSpacing: "0px", fontWeight: 600, fontStyle : "normal", fontVariant : "normal", textTransform : "none", textDecoration : "rgb(0, 0, 0)", textIndent : "0px" }}  component={motion.div} initial={{ x : '100vw' }} animate={{ x : 0 }} transition={{ delay : 0.4, duration : 1, type : 'spring' }}>EVENT PLANNING & DESIGN</Typography>
                <Typography variant={"subtitle2"} align={"center"} sx={{ maxWidth : "60rem", marginTop : { xs : 1, sm : 2, md : 5, lg : 5}, color : "#6d6e71", backGroundColor : "#000000", fontFamily : "Times New Roman", fontSize : "15px", lineHeight : "24px", verticalAlign : "baseline", letterSpacing : "normal", fontWeight : 100, fontStyle : "normal", fontVariant : "normal", textTransform : "none", textDecoration : "rgb(109, 110, 113)", textIndent : "0px" }}  component={motion.div} initial={{ x : '100vw' }} animate={{ x : 0 }} transition={{ delay : 0.4, duration : 1, type : 'spring' }}>The W Events & Decor is unlike any other. Our full-service event planning and design team will guide you every step of the way, ensuring a stress-free experience from start to finish.</Typography>
                <Typography variant={"subtitle2"} align={"center"} sx={{ maxWidth : "61rem", marginTop :  { xs : 2, sm : 2, md : 5, lg : 5}, color : "#6d6e71", backGroundColor : "#000000", fontFamily : "Times New Roman", fontSize : "15px", lineHeight : "24px", verticalAlign : "baseline", letterSpacing : "normal", fontWeight : 100, fontStyle : "normal", fontVariant : "normal", textTransform : "none", textDecoration : "rgb(109, 110, 113)", textIndent : "0px" }}  component={motion.div} initial={{ x : '-100vw' }} animate={{ x : 0 }} transition={{ delay : 0.4, duration : 1, type : 'spring' }}>With us, customization is guaranteed. From the very beginning, we will create a custom proposal tailored to your specific wants and needs. You'll be paired with a W Events & Decor Team who will collaborate with you to bring your vision to life. We will team up with some of the best vendors and take care of the all the details like meeting scheduling, delivery dates, payments, day-of setup, and more.</Typography>
                <Typography variant={"subtitle2"} align={"center"} sx={{ marginY : 2, color : "#6d6e71", backGroundColor : "#000000", fontFamily : "Times New Roman", fontSize : "15px", lineHeight : "24px", verticalAlign : "baseline", letterSpacing : "normal", fontWeight : 100, fontStyle : "normal", fontVariant : "normal", textTransform : "none", textDecoration : "rgb(109, 110, 113)", textIndent : "0px" }}  component={motion.div} initial={{ x : '100vw' }} animate={{ x : 0 }} transition={{ delay : 0.4, duration : 1, type : 'spring' }}>When it’s showtime, our staff will work tirelessly to guarantee your event is effortless and unforgettable.</Typography>
                <Link href={"/users/event"}><Button variant={"contained"} disableElevation={true} sx={{ color : "white", fontWeight : 700, fontVariant : "normal", fontStyle : "normal", textTransform : "none", textDecoration : "rgb(255, 255, 255)", lineHeight : "24px", fontSize : 15, paddingX : { xs : 4, sm : 4, md : 6, lg : 6 }, paddingY : 2, marginTop : 5 }}  component={motion.div} initial={{ y : '100vw' }} animate={{ y : 0, transition : { delay : 0.4, duration : 1, type : 'spring' } }} whileHover={{ scale : 1.1, transition : { delay : 0.1 } }} >Register Your Event</Button></Link>
              </Box>
              <Box component={"div"} sx={{ display : "flex", flexDirection : "row", justifyContent : "center", alignItems : "center", flexWrap : "wrap", backgroundColor : "rgb(255,255,255)", paddingTop : "5rem", paddingBottom : "5rem", overflow : "hidden" }}>
                  <Box sx={{ textAlign : "center", width : "22rem", paddingBottom : "1rem" }}  component={motion.div} initial={{ x : '-100vw' }} animate={{ x : 0 }} transition={{ delay : 0.4, duration : 1, type : 'tween' }}>
                      <Typography sx={{ color: "#f08a5d", backgroundColor : "rgba(0, 0, 0, 0)", fontSize : "20px", lineHeight : "56px", verticalAlign: "baseline", letterSpacing: "2px", wordSpacing: "0px", fontWeight: 600, fontStyle : "normal", fontVariant : "normal", textTransform : "uppercase", textDecoration : "rgb(0, 0, 0)", textIndent : "0px" }}>Weddings</Typography>
                      <Image src={img1} className={"borderRounded"}  width={"250px"} height={"250px"} alt={"img1"}/>
                      <Typography sx={{ maxWidth : "60rem", marginTop : 5, color : "#6d6e71", backGroundColor : "#000000", fontFamily : "Times New Roman", fontSize : "15px", lineHeight : "24px", verticalAlign : "baseline", letterSpacing : "normal", fontWeight : 100, fontStyle : "normal", fontVariant : "normal", textTransform : "none", textDecoration : "rgb(109, 110, 113)", textIndent : "0px" }}>With every last detail taken care of, we're here to ensure the day you've always dreamed of will be the day you'll never forget.</Typography>
                  </Box>
                  <Box sx={{ textAlign : "center", width : "22rem", marginX : 3, paddingBottom : "1rem" }} component={motion.div} initial={{ y : '100vw' }} animate={{ y : 0 }} transition={{ delay : 0.4, duration : 1, type : 'tween' }}>
                      <Typography sx={{ color: "#f08a5d", backgroundColor : "rgba(0, 0, 0, 0)", fontSize : "20px", lineHeight : "56px", verticalAlign: "baseline", letterSpacing: "2px", wordSpacing: "0px", fontWeight: 600, fontStyle : "normal", fontVariant : "normal", textTransform : "uppercase", textDecoration : "rgb(0, 0, 0)", textIndent : "0px" }}>Corporate Events</Typography>
                      <Image src={img2} className={"borderRounded"} width={"250px"} height={"250px"} alt={img2}/>
                      <Typography sx={{ maxWidth : "60rem", marginTop : 5, color : "#6d6e71", backGroundColor : "#000000", fontFamily : "Times New Roman", fontSize : "15px", lineHeight : "24px", verticalAlign : "baseline", letterSpacing : "normal", fontWeight : 100, fontStyle : "normal", fontVariant : "normal", textTransform : "none", textDecoration : "rgb(109, 110, 113)", textIndent : "0px" }}>Wow your guests with a unique corporate experience that aligns with your company's mission and elevates your brand.</Typography>
                  </Box>
                  <Box sx={{ textAlign : "center", width : "22rem" }}  component={motion.div} initial={{ x : '100vw' }} animate={{ x : 0 }} transition={{ delay : 0.4, duration : 1, type : 'tween' }}>
                       <Typography sx={{ color: "#f08a5d", backgroundColor : "rgba(0, 0, 0, 0)", fontSize : "20px", lineHeight : "56px", verticalAlign: "baseline", letterSpacing: "2px", wordSpacing: "0px", fontWeight: 600, fontStyle : "normal", fontVariant : "normal", textTransform : "uppercase", textDecoration : "rgb(0, 0, 0)", textIndent : "0px" }}>Social Gatherings</Typography>
                       <Image src={img3} className={"borderRounded"} width={"250px"} height={"250px"} alt={img3}/>
                      <Typography sx={{ maxWidth : "60rem", marginTop : 5, color : "#6d6e71", backGroundColor : "#000000", fontFamily : "Times New Roman", fontSize : "15px", lineHeight : "24px", verticalAlign : "baseline", letterSpacing : "normal", fontWeight : 100, fontStyle : "normal", fontVariant : "normal", textTransform : "none", textDecoration : "rgb(109, 110, 113)", textIndent : "0px" }}>From a show stopping engagement celebration to an epic surprise birthday party, you dream it and we'll make it a reality.</Typography>
                 </Box>
              </Box>
          </Box>
      </>
  )
}

Home.layout = "user";

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if(session){
        const { role } = session.user;
        if(role === "admin")
        {
            return {
                redirect : {
                    destination : "/admin/dashboard",
                    permanent : false
                }
            }
        }
        return {
            props: {
                user: session.user
            },
        }
    }
    return {
        props : {
            user : ""
        }
    }
}
