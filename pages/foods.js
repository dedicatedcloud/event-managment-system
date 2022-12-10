import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from 'next/image';

export default function Foods(props) {

    const [ menu1, setMenu1 ] = useState([]);
    const [ menu2, setMenu2 ] = useState([]);
    const [ menu3, setMenu3 ] = useState([]);

    useEffect(() => {
        setMenu1(props.foods.filter(food => food.menu === "Menu 1"));
        setMenu2(props.foods.filter(food => food.menu === "Menu 2"));
        setMenu3(props.foods.filter(food => food.menu === "Menu 3"));
    },[]);

    return (
        <Box component={"div"}>
            <Typography variant={"h4"} align={"center"} color={"primary"} sx={{ marginY : "5rem" }}>Food Items</Typography>
            <Box component={"div"} sx={{ paddingX : "2rem", marginY : "8rem" }}>
                <Typography variant={"h4"} align={"left"}  sx={{ marginY : "2rem" }} color={"primary"}>Menu 1:</Typography>
<Grid container rowSpacing={5} columnSpacing={6}>
                    {
                        menu1.map((m1, i) => {
                            return (
                                <Grid item key={i}  xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"}>
                                    <Card sx={{ width : { xs : "20rem", sm : "25rem", md : "25rem", lg : "25rem" } }} elevation={3}>
                                        <CardContent sx={{
                                            padding: 0
                                        }}>
                                            <Image src={"/Food/"+m1.picture} width={500} height={500}/>
                                            <Box sx={{
                                                padding: 2
                                            }}>
                                                <Typography variant={"h5"} gutterBottom>{ m1.name }</Typography>
                                                <Typography variant={"h6"} gutterBottom>Rs.{ m1.price }</Typography>
                                                <Typography variant={"body1"} gutterBottom>{ m1.type }</Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })
                    }
                </Grid>
                <Typography variant={"h4"} align={"left"}  sx={{ marginY : "2rem" }} color={"primary"}>Menu 2:</Typography>
                <Grid container rowSpacing={5} columnSpacing={6}>
                    {
                        menu2.map((m2, i) => {
                            return (
                                <Grid item key={i} xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"}>
                                    <Card sx={{ width : { xs : "20rem", sm : "25rem", md : "25rem", lg : "25rem" } }} elevation={3}>
                                        <CardContent sx={{
                                            padding: 0
                                        }}>
                                            <Image src={"/Food/"+m2.picture} width={500} height={500}/>
                                            <Box sx={{
                                                padding: 2
                                            }}>
                                                <Typography variant={"h5"} gutterBottom>{ m2.name }</Typography>
                                                <Typography variant={"h6"} gutterBottom>Rs.{ m2.price }</Typography>
                                                <Typography variant={"body1"} gutterBottom>{ m2.type }</Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })
                    }
                </Grid>
                <Typography variant={"h4"} align={"left"}  sx={{ marginY : "2rem" }} color={"primary"}>Menu 3:</Typography>
                <Grid container rowSpacing={5} columnSpacing={6}>
                    {
                        menu3.map((m3, i) => {
                            return (
                                <Grid item key={i} xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"}>
                                    <Card sx={{ width : { xs : "20rem", sm : "25rem", md : "25rem", lg : "25rem" } }} elevation={3}>
                                        <CardContent sx={{
                                            padding: 0
                                        }}>
                                            <Image src={"/Food/"+m3.picture} width={500} height={500}/>
                                            <Box sx={{
                                                padding: 2
                                            }}>
                                                <Typography variant={"h5"} gutterBottom>{ m3.name }</Typography>
                                                <Typography variant={"h6"} gutterBottom>Rs.{ m3.price }</Typography>
                                                <Typography variant={"body1"} gutterBottom>{ m3.type }</Typography>
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

Foods.layout = "user";

export async function getStaticProps(){
    const res = await fetch(`${process.env.APP_URL}/api/food/getFoods`);
    const data = await res.json();
    return {
        props : {
            foods : data.food
        },
        revalidate : 10
    }
}
