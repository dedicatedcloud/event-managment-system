import React from 'react';
import {getSession} from "next-auth/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import prisma from "../../lib/prisma";
import Link from "next/link";
import PeopleIcon from '@mui/icons-material/People';
import HouseIcon from "@mui/icons-material/House";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SpeakerIcon from "@mui/icons-material/Speaker";
import DoughnutChart from "../../components/admin/charts/doughnutChart";
import PieChart from "../../components/admin/charts/pieChart";
import VerticalBarChart from "../../components/admin/charts/verticalBarChart";


export default function Dashboard(props){

    return (
        <Box component={"div"}>
            <Box sx={{ paddingY : 8 }} component={"div"}>
                <Grid container spacing={5}>
                    <Grid item lg={3}>
                        <Card sx={{ backgroundColor : "#f08a5d", boxShadow : 6 }}>
                            <CardContent sx={{ display : "flex", flexDirection : "row",justifyContent : "space-between", alignItems : "center" }}>
                                <PeopleIcon sx={{ fontSize : "8rem" }} color={"secondary"}/>
                                <Typography align={"right"} variant={"h5"} color={"secondary"}>{props.usersCount}<br/>Users</Typography>
                            </CardContent>
                            <CardActions sx={{ backgroundColor : "#ffffff" }}>
                               <Link href={"/admin/users"}><Button size="small" variant={"contained"} sx={{ color : "#ffffff" }} color={"primary"}>View Records</Button></Link>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item lg={3}>
                        <Card sx={{ backgroundColor : "#f08a5d", boxShadow : 6 }}>
                            <CardContent sx={{ display : "flex", flexDirection : "row",justifyContent : "space-between", alignItems : "center" }}>
                                <HouseIcon sx={{ fontSize : "8rem" }} color={"secondary"} />
                                <Typography align={"right"} variant={"h5"} color={"secondary"}>{props.venuesCount}<br/>Venues</Typography>
                            </CardContent>
                            <CardActions sx={{ backgroundColor : "#ffffff" }}>
                                <Link href={"/admin/venue"}><Button size="small" variant={"contained"} sx={{ color : "#ffffff" }} color={"primary"}>View Records</Button></Link>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item lg={3}>
                        <Card sx={{ backgroundColor : "#f08a5d", boxShadow : 6 }}>
                            <CardContent sx={{ display : "flex", flexDirection : "row",justifyContent : "space-between", alignItems : "center" }}>
                                <LocalDiningIcon sx={{ fontSize : "8rem" }} color={"secondary"}/>
                                <Typography align={"right"} variant={"h5"} color={"secondary"}>{props.foodCount}<br/>Foods</Typography>
                            </CardContent>
                            <CardActions sx={{ backgroundColor : "#ffffff" }}>
                                <Link href={"/admin/food"}><Button size="small" variant={"contained"} sx={{ color : "#ffffff" }} color={"primary"}>View Records</Button></Link>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item lg={3}>
                        <Card sx={{ backgroundColor : "#f08a5d", boxShadow : 6 }}>
                            <CardContent sx={{ display : "flex", flexDirection : "row",justifyContent : "space-between", alignItems : "center" }}>
                                <SpeakerIcon sx={{ fontSize : "8rem" }} color={"secondary"}/>
                                <Typography align={"right"} variant={"h5"} color={"secondary"}>{props.equipmentCount}<br/>Equipment</Typography>
                            </CardContent>
                            <CardActions sx={{ backgroundColor : "#ffffff" }}>
                                <Link href={"/admin/equipment"}><Button size="small" variant={"contained"} sx={{ color : "#ffffff" }} color={"primary"}>View Records</Button></Link>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
                <Grid spacing={5} container sx={{ paddingY : "6rem" }}>
                    <Grid item lg={3}>
                        <Box sx={{ boxShadow : 5, padding : 3 }} component={"div"}>
                            <Typography variant={"h5"} color={"primary"} gutterBottom align={"center"}>Venues (Based on Guest Sizes)</Typography>
                            <DoughnutChart />
                        </Box>
                    </Grid>
                    <Grid lg={3} item>
                        <Box sx={{ boxShadow : 5, padding : 3 }} component={"div"}>
                            <Typography variant={"h5"} color={"primary"} gutterBottom align={"center"}>Food Items (Based on Menu Items)</Typography>
                            <PieChart />
                        </Box>
                    </Grid>
                    <Grid lg={3} item>
                        <Box sx={{ boxShadow : 5, padding : 3 }} component={"div"}>
                            <Typography variant={"h5"} color={"primary"} gutterBottom align={"center"}>Users Registered on a given time</Typography>
                            <VerticalBarChart />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

Dashboard.layout = "admin";

export async function getServerSideProps(context) {

    const session = await getSession(context)
    if(!session){
        return {
            redirect : {
                destination : "/",
            }
        }
    }
    if(session){
        const { role } = session.user;
        if(role === "user") {
            return {
                redirect : {
                    destination : "/",
                }
            }
        }
        else {
            const usersCount = await prisma.user.count();
            const venuesCount = await prisma.venues.count();
            const foodCount = await prisma.food.count();
            const equipmentCount = await prisma.equipment.count();
            return {
                props : {
                    user: session.user,
                    usersCount,
                    venuesCount,
                    foodCount,
                    equipmentCount
                }
            }
        }
    }

}