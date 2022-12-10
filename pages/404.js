import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Image from "next/image";
import  errorImage from "../public/assets/404Error.jpg";
import Typography from "@mui/material/Typography";

const NotFound = () => {

    const router = useRouter();

    /*useEffect(() => {
        setTimeout(()=>{
            router.push('/');
        }, 5000)
    }, []);*/


    return (
        <Box sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: 'center',
        }}>
            <Image src={errorImage} width={600} height={550} alt={"404"} />
            <Typography variant={"subtitle1"} color={"primary"} gutterBottom>Oops! Something went wrong!</Typography>
            <Button onClick={() => router.back()} color={"primary"} variant={"contained"} disableElevation={true} sx={{
                color: "white",
            }}>Go Back</Button>
        </Box>
    );
};
//<a href="https://www.freepik.com/free-vector/frustrated-businesswoman-falling-rocket-business-company-failure-scene-flat-vector-illustration-crisis-bankruptcy-startup-risk-concept-banner-website-design-landing-web-page_24644389.htm#query=web%20page%20crash&position=5&from_view=search&track=sph">Image by pch.vector</a> on Freepik
export default NotFound;