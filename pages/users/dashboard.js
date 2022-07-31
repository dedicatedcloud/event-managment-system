import React, {useEffect, useState} from 'react';
import {getSession} from "next-auth/react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import EventCards from "../../components/users/eventCards";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

export default function Dashboard({user, data}) {

    const [ calenderEvents, setCalenderEvents ] = useState([]);
    const [ events, setEvents ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const localizer = momentLocalizer(moment);

    const fetchEvents = async () => {
        fetch("/api/events/getUserEvent",{
            method : "Post",
            headers : {
                "Content-Type" : "application/json",
            },
            body :  JSON.stringify(user.id)
        }).then(res => res.json()).then(data => {
            if(data?.events){
                setLoading(false);
                setEvents(data.events.map((e) => {
                    e.event_foods = e.event_foods.map( ef => ef.foodId)
                    e.event_equipment = e.event_equipment.map( eq => eq.equipmentId)
                    return e;
                } ));
                const _events = data.events.map(event => ({
                    title : `Event : ${event.event_type}`,
                    allDay : true,
                    start : event.date,
                    end : event.date
                }));
                setCalenderEvents(_events);
            }

        })
    }

    useEffect(() => {
        fetchEvents();
    }, [])



    return (
        <div>
            <Typography variant={"h5"} align={"center"} color={"primary"} sx={{ marginY : "2rem" }}>{`Welcome to your dashboard, ${user.name}!`}</Typography>
            <Divider variant={"middle"} sx={{ marginY : "1rem" }}/>
            <Typography variant={"h5"} align={"left"} sx={{ paddingX : "1rem", marginY : "1rem" }} color={"primary"}>My Events:</Typography>
            <Box sx={{ marginY : "1rem", padding : "1rem" }}>
                { !loading ? events.length > 0 ? <Grid container spacing={5} sx={{paddingX: "2rem"}}>
                    {events.map((e, i) => {
                        return (
                            <Grid item key={i}>
                                <EventCards event={e} data={data}/>
                            </Grid>
                        );
                    })
                    }
                </Grid> : <Typography align={"center"} color={"primary"} variant={"h4"}>No Events available.</Typography> : <Typography align={"center"}><CircularProgress color="primary" size={"3rem"}/></Typography>}
            </Box>
            <Divider variant={"middle"} sx={{ marginY : "1rem" }}/>
            <Box component={"div"} sx={{ display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center", marginY : "2rem", paddingX : "1rem" }}>
                    <Calendar
                        localizer={localizer}
                        events={calenderEvents}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: "30rem", padding : "1rem", border : "0.2rem solid #f08a5d", borderRadius : "0.5rem" }}
                    />
            </Box>
        </div>
    );
}

Dashboard.layout = "user";

export async function getServerSideProps({req}){

    const session = await getSession({req});
    if(!session){
        return {
            redirect : {
                destination : "/",
            }
        }
    }
    if(session){

        const fetchGuests = async () => {
            const resGuests = await fetch(`${process.env.APP_URL}/api/guest/getGuestCount`);
            const {guests} = await resGuests.json();
            return guests
        }

        const fetchVenues = async () => {
            const resVenues = await fetch(`${process.env.APP_URL}/api/venues/getVenues`)
            const {venues} = await resVenues.json()
            return venues;
        }

        const fetchFoods = async () => {
            const resFood = await fetch(`${process.env.APP_URL}/api/food/getFoods`)
            const {food} = await resFood.json()
            return food;
        }

        const fetchEquipment = async () => {
            const resEquipment = await fetch(`${process.env.APP_URL}/api/equipment/getEquipments`)
            const {equipment} = await resEquipment.json()
            return equipment
        }

        let data = await Promise.all([
            fetchGuests(),
            fetchVenues(),
            fetchFoods(),
            fetchEquipment()
        ])
            .then(result => {
                return {
                    guests: result[0],
                    venues: result[1],
                    food: result[2],
                    equipment: result[3],
                };

            })
            .catch(err => console.log(err));

        return {
            props : {
                user: session.user,
                data
            }
        }
    }
}