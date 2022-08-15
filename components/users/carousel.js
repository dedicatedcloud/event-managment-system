import React, {useEffect, useState} from 'react';
import Image from "next/image";
import sliderImg1 from "../../public/assets/sliderImage1.jpg";
import sliderImg2 from "../../public/assets/sliderImage2.jpg";
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from "@mui/material/styles";


function Carousel() {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    const images = [sliderImg1, sliderImg2];

    const [current, setCurrent] = useState(0);
    const length = images.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    useEffect( () => {
        const timer = () => setTimeout(() => nextSlide(),4000);
        const timerId = timer();
        return () => {
            clearTimeout(timerId);
        };
    }, [current])

    return (
        <div style={{ overflow : "hidden", position : "relative" }}>
            { images.map((image, index) => (
                <div key={index}  className={index === current ? 'slide active' : 'slide'}>
                    { index === current && <Image src={image} placeholder={"blur"} layout={"responsive"} height={!matches ? 550 : 600} alt={"sliderImage"}/>}
                    <div className={"indicators"}>
                        <div className={ current === 0 ? "dots activeDot" : "dots" } />
                        <div className={ current === 1 ? "dots activeDot" : "dots" } />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Carousel;
