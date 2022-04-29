import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from 'next/image';

export default function Foods(props) {

    const [ starter, setStarter ] = useState([]);
    const [ main, setMain ] = useState([]);
    const [ dessert, setDessert ] = useState([]);

    useEffect(() => {
        setStarter(props.foods.filter(food => food.category === "Starter"));
        setMain(props.foods.filter(food => food.category === "Main Course"));
        setDessert(props.foods.filter(food => food.category === "Dessert"));
    },[]);

    return (
        <Box component={"div"}>
            <Typography variant={"h4"} align={"center"} color={"primary"} sx={{ marginY : "5rem" }}>Food Items</Typography>
            <Box component={"div"} sx={{ paddingX : "2rem", marginY : "8rem" }}>
                <Typography variant={"h4"} align={"left"}  sx={{ marginY : "2rem" }} color={"primary"}>Starter Items:</Typography>
                <Grid container rowSpacing={5} columnSpacing={6}>
                    {
                        starter.map((sf, i) => {
                            return (
                                <Grid item key={i}  xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"}>
                                    <Card sx={{ width : { xs : "20rem", sm : "25rem", md : "25rem", lg : "25rem" } }} elevation={3}>
                                        <CardContent>
                                            <Image src={"/Food/"+sf.picture} width={500} height={500}/>
                                            <Typography>{ sf.name }</Typography>
                                            <Typography>Rs.{ sf.price }</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })
                    }
                </Grid>
                <Typography variant={"h4"} align={"left"}  sx={{ marginY : "2rem" }} color={"primary"}>Main Course Items:</Typography>
                <Grid container rowSpacing={5} columnSpacing={6}>
                    {
                        main.map((mf, i) => {
                            return (
                                <Grid item key={i} xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"}>
                                    <Card sx={{ width : { xs : "20rem", sm : "25rem", md : "25rem", lg : "25rem" } }} elevation={3}>
                                        <CardContent>
                                            <Image src={"/Food/"+mf.picture} width={500} height={500}/>
                                            <Typography>{ mf.name }</Typography>
                                            <Typography>{ mf.price }</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })
                    }
                </Grid>
                <Typography variant={"h4"} align={"left"}  sx={{ marginY : "2rem" }} color={"primary"}>Dessert Items:</Typography>
                <Grid container rowSpacing={5} columnSpacing={6}>
                    {
                        dessert.map((df, i) => {
                            return (
                                <Grid item key={i} xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"}>
                                    <Card sx={{ width : { xs : "20rem", sm : "25rem", md : "25rem", lg : "25rem" } }} elevation={3}>
                                        <CardContent>
                                            <Image src={"/Food/"+df.picture} width={500} height={500}/>
                                            <Typography>{ df.name }</Typography>
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
    const res = await fetch("http://localhost:3000/api/food/getFoods");
    const data = await res.json();
    return {
        props : {
            foods : data.food
        },
        revalidate : 5
    }
}
