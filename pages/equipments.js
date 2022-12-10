import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from 'next/image';

export default function Venues(props) {

    const [ equipments, setEquipments ] = useState([]);

    useEffect(() => {
        setEquipments(props.equipment);
    },[])

    return (
        <Box component={"div"}>
            <Typography variant={"h4"} align={"center"} color={"primary"} sx={{ marginY : "5rem" }}>Equipment</Typography>
            <Box sx={{ paddingX : "2rem", marginY : "8rem" }}>
                <Grid container rowSpacing={5} columnSpacing={6}>
                    {
                        equipments.map((equipment, i) => {
                            return (
                                <Grid item key={i} xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"}>
                                    <Card sx={{ width : { xs : "20rem", sm : "25rem", md : "25rem", lg : "25rem" } }}>
                                        <CardContent sx={{
                                            padding: 0
                                        }}>
                                            <Image src={"/Equipment/"+equipment.picture} width={500} height={500}/>
                                            <Box sx={{
                                                padding: 2
                                            }}>
                                                <Typography variant={"h5"} gutterBottom>{ equipment.name }</Typography>
                                                <Typography variant={"h6"} gutterBottom>Rs.{ equipment.price }</Typography>
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
    const res = await fetch(`${process.env.APP_URL}/api/equipment/getEquipments`);
    const data = await res.json();
    return {
        props : {
            equipment : data.equipment
        },
        revalidate : 10
    }
}
