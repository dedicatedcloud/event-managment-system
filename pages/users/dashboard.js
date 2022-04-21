import React, {useEffect, useState} from 'react';
import {getSession, useSession} from "next-auth/react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";

export default function Dashboard({user, events}) {

    const [ userEvents, setUserEvents ] = useState([]);

    const localizer = momentLocalizer(moment);

    /*const fetchEvents = async () => {
        fetch("/api/events/getUserEvent").then(res => res.json()).then(data => {
            const _events = data.events.map(event => ({
                title : `Event-${event.id}`,
                allDay : true,
                start : event.date,
                end : event.date
            }));
            setEvents(_events);
        })
    }*/

    useEffect(() => {
        // fetchEvents();
        const _events = events.map(event => ({
            title : `Event-${event.id}`,
            allDay : true,
            start : event.date,
            end : event.date
        }))
        setUserEvents(_events);
    }, [])

    return (
        <div>
            <Typography variant="h3" align={"center"} sx={{ marginY : "2rem" }} color={"primary"}>{`${user.name}'s Dashboard`}</Typography>
            <Typography variant={"h5"} align={"center"} color={"primary"}>{`Welcome to your dashboard, ${user.name}!`}</Typography>
            <Divider variant={"middle"} sx={{ marginY : "1rem" }}/>
            <Box component={"div"} sx={{ marginY : "2rem" }}>
                <Typography variant={"h5"} align={"left"} color={"primary"}>Planned Events:</Typography>
                <Calendar
                    localizer={localizer}
                    events={userEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: "30rem", width : "100%", padding : "1rem" }}
                />
            </Box>
        </div>
    );
}

Dashboard.layout = "user";

export async function getServerSideProps({req}){
    const res = await fetch("http://localhost:3000/api/events/getUserEvent");
    const {events} = await res.json();
    const session = await getSession({req});
    if(!session){
        return {
            redirect : {
                destination : "/",
                permanent : false
            }
        }
    }
    if(session){
        return {
            props : {
                user: session.user,
                events
            }
        }
    }
}
