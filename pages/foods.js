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
                        menu1.map((sf, i) => {
                            return (
                                <Grid item key={i}  xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"}>
                                    <Card sx={{ width : { xs : "20rem", sm : "25rem", md : "25rem", lg : "25rem" } }} elevation={3}>
                                        <CardContent>
                                            <Image src={"/Food/"+sf.picture} width={500} height={500} alt={""}/>
                                            <Typography>{ sf.name }</Typography>
                                            <Typography>{ sf.type }</Typography>
                                            <Typography>Rs.{ sf.price }</Typography>
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
                        menu2.map((mf, i) => {
                            return (
                                <Grid item key={i} xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"}>
                                    <Card sx={{ width : { xs : "20rem", sm : "25rem", md : "25rem", lg : "25rem" } }} elevation={3}>
                                        <CardContent>
                                            <Image src={"/Food/"+mf.picture} width={500} height={500} alt={""}/>
                                            <Typography>{ mf.name }</Typography>
                                            <Typography>{ mf.type }</Typography>
                                            <Typography>{ mf.price }</Typography>
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
                        menu3.map((df, i) => {
                            return (
                                <Grid item key={i} xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"}>
                                    <Card sx={{ width : { xs : "20rem", sm : "25rem", md : "25rem", lg : "25rem" } }} elevation={3}>
                                        <CardContent>
                                            <Image src={"/Food/"+df.picture} width={500} height={500} alt={""}/>
                                            <Typography>{ df.name }</Typography>
                                            <Typography>{ df.type }</Typography>
                                            <Typography>{ df.price }</Typography>
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