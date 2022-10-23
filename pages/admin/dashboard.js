import React from 'react';
import {getSession} from "next-auth/react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import prisma from "../../lib/prisma";
import PeopleIcon from '@mui/icons-material/People';
import HouseIcon from "@mui/icons-material/House";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SpeakerIcon from "@mui/icons-material/Speaker";
import DoughnutChart from "../../components/admin/charts/doughnutChart";
import PieChart from "../../components/admin/charts/pieChart";
import VerticalBarChart from "../../components/admin/charts/verticalBarChart";
import {useTheme} from "@mui/material/styles";


export default function Dashboard(props){

    const theme = useTheme();

    const cardData = [
        {
            icon: <PeopleIcon sx={{ fontSize : "8rem" }} color={"primary"}/>,
            count: props.usersCount,
            text: "Users",
            link: "/admin/users",
        },
        {
            icon: <HouseIcon sx={{ fontSize : "8rem" }} color={"primary"} />,
            count: props.venuesCount,
            text: "Venues",
            link: "/admin/venue",
        },
        {
            icon: <LocalDiningIcon sx={{ fontSize : "8rem" }} color={"primary"}/>,
            count: props.foodCount,
            text: "Food",
            link: "/admin/food",
        },
        {
            icon: <SpeakerIcon sx={{ fontSize : "8rem" }} color={"primary"}/>,
            count: props.equipmentCount,
            text: "Equipment",
            link: "/admin/equipment",
        }
    ]

    return (
        <Box component={"div"}>
            <Box sx={{ paddingY : 8 }} component={"div"}>
                <Grid container spacing={5}>
                    {cardData.map((data, index) => (
                        <Grid item lg={3} key={index}>
                            <Card variant={"paper"} sx={{ backgroundColor : theme.palette.secondary.main, borderRadius: 5 }}>
                                <CardContent sx={{ display : "flex", flexDirection : "row",justifyContent : "space-between", alignItems : "center", paddingX: 5 }}>
                                    {data.icon}
                                    <Typography align={"right"} variant={"h5"} sx={{color: theme.palette.primary.main}}>{data.count}<br/>{data.text}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Grid spacing={5} container sx={{ paddingY : 5 }} >
                    <Grid item lg={3}>
                        <Box sx={{ borderRadius: 5, padding : 3, backgroundColor : theme.palette.secondary.main }} component={"div"}>
                            <Typography variant={"h5"} color={"primary"} gutterBottom align={"center"}>Venues (Based on Guest Sizes)</Typography>
                            <DoughnutChart />
                        </Box>
                    </Grid>
                    <Grid lg={3} item>
                        <Box sx={{ borderRadius: 5, padding : 3, backgroundColor : theme.palette.secondary.main }} component={"div"}>
                            <Typography variant={"h5"} color={"primary"} gutterBottom align={"center"}>Food Items (Based on Menu Items)</Typography>
                            <PieChart />
                        </Box>
                    </Grid>
                    <Grid lg={3} item>
                        <Box sx={{ borderRadius: 5, padding : 3, backgroundColor : theme.palette.secondary.main }} component={"div"}>
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
