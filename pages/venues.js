import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from 'next/image';

export default function Venues(props) {

    const [ venues, setVenues ] = useState([]);

    useEffect(() => {
        setVenues(props.venues);
    },[])

    return (
        <Box component={"div"}>
            <Typography variant={"h4"} align={"center"} color={"primary"} sx={{ marginY : "5rem" }}>Venues</Typography>
            <Box sx={{ paddingX : "2rem", marginY : "8rem" }}>
                <Grid container rowSpacing={5} columnSpacing={6}>
                    {
                        venues.map((venue, i) => {
                            return (
                                <Grid item key={i} xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"} >
                                    <Card sx={{ width : { xs : "20rem", sm : "25rem", md : "25rem", lg : "25rem", boxShadow : 1 } }}>
                                        <CardContent sx={{
                                            padding: 0
                                        }}>
                                            <Image src={"/Venues/"+venue.picture} width={500} height={500}/>
                                            <Box sx={{
                                                padding: 2
                                            }}>
                                                <Typography variant={"h5"} gutterBottom>{ venue.name }</Typography>
                                                <Typography variant={"h6"} gutterBottom>Rs.{ venue.price }</Typography>
                                                <Typography variant={"body1"} gutterBottom>{ venue.location }</Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </Box>
        </Box>
    );
};

Venues.layout = "user";

export async function getStaticProps(){
    const res = await fetch(`${process.env.APP_URL}/api/venues/getVenues`);
    const data = await res.json();
    return {
        props : {
            venues : data.venues
        },
        revalidate : 10
    }
}
