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
                                    <Card sx={{ width : { xs : "20rem", sm : "25rem", md : "25rem", lg : "25rem", boxShadow : 10 } }}>
                                        <CardContent>
                                            <Image src={"/Venues/"+venue.picture} width={500} height={500}/>
                                            <Typography>{ venue.name }</Typography>
                                            <Typography>Rs.{ venue.price }</Typography>
                                            <Typography>{ venue.location }</Typography>
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
    const res = await fetch("http://localhost:3000/api/venues/getVenues");
    const data = await res.json();
    return {
        props : {
            venues : data.venues
        }
    }
}
