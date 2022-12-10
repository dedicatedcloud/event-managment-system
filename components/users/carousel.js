import React, {useEffect, useState} from 'react';
import Image from "next/image";
import sliderImg1 from "../../public/assets/sliderImage1.jpg";
import sliderImg2 from "../../public/assets/sliderImage2.jpg";
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from "@mui/material/styles";
import Carousel from "nuka-carousel";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from "@mui/material/IconButton";


function CustomCarousel() {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    const CustomIconButton = ({ icon }) => {
        return <IconButton size={"large"}  sx={{ backgroundColor: theme.palette.secondary.light }}>{ icon }</IconButton>
    }

    const config = {
        nextButtonStyle: {
            backgroundColor: "transparent",
        },
        nextButtonText: <CustomIconButton icon={<ArrowForwardIosIcon sx={{ color: theme.palette.primary.main }} fontSize={"large"}/>}/> ,
        prevButtonStyle: {
            backgroundColor: "transparent",
        },
        prevButtonText: <CustomIconButton icon={<ArrowBackIosNewIcon sx={{ color: theme.palette.primary.main }} fontSize={"large"}/>}/>,
        pagingDotsStyle: {
            fill: theme.palette.primary.main,
            backgroundColor: "transparent",
        }
    }

    return (
            <Carousel animation={"zoom"} autoplay={true} defaultControlsConfig={config} pauseOnHover={true} speed={2000} swiping={true} wrapAround={true}>
                <Image src={sliderImg1} placeholder={"blur"} layout={"responsive"} height={!matches ? 550 : 600} alt={"sliderImage1"}/>
                <Image src={sliderImg2} placeholder={"blur"} layout={"responsive"} height={!matches ? 550 : 600} alt={"sliderImage2"}/>
            </Carousel>
    );
}

export default CustomCarousel;