import React, {useEffect, useState} from 'react';
import {getSession} from "next-auth/react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import Backdrop from "@mui/material/Backdrop";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";

export default function Dashboard({user}) {

    // TODO: fix the bug causing the data to not load fast
    const [ calenderEvents, setCalenderEvents ] = useState([]);
    const [ events, setEvents ] = useState([]);

    //for backdrop
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const localizer = momentLocalizer(moment);

    const fetchEvents = async () => {
        fetch("/api/events/getUserEvent").then(res => res.json()).then(data => {
            //console.log(data);
            setEvents(data.events);
            const _events = data.events.map(event => ({
                title : `Event-${event.id}`,
                allDay : true,
                start : event.date,
                end : event.date
            }));
            setCalenderEvents(_events);
        })
    }

    useEffect(() => {
        fetchEvents();
    }, [])

    // TODO: delete not working
    const handleDelete = async (id) => {
        fetch("http://localhost:3000/api/events/deleteEvent", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                id
            })
        }).then(res => res.json()).then(data => {
            fetchEvents();
        }).catch(e => console.log(e.message));
    }

    return (
        <div>
            <Typography variant={"h5"} align={"center"} color={"primary"} sx={{ marginY : "2rem" }}>{`Welcome to your dashboard, ${user.name}!`}</Typography>
            <Divider variant={"middle"} sx={{ marginY : "1rem" }}/>
            <Box component={"div"} sx={{ marginY : "2rem" }}>
                <Typography variant={"h5"} align={"left"} sx={{ paddingX : "1rem", marginY : "1rem" }} color={"primary"}>Planned Events:</Typography>
                <Box component={"div"} sx={{ display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center" }}>
                    <Calendar
                        localizer={localizer}
                        events={calenderEvents}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: "30rem", width : "50%", padding : "1rem", border : "0.2rem solid #f08a5d", borderRadius : "0.5rem" }}
                    />
                </Box>
            </Box>
            <Divider variant={"middle"} sx={{ marginY : "1rem" }}/>
            <Box sx={{ marginY : "1rem", padding : "1rem" }}>
                <Grid container spacing={5} sx={{ paddingX : "2rem" }}>
                    { events && events.map((e, i) => {
                        let event_date = new Date(e.date);
                        return (
                            <Grid item key={i}>
                                <Card elevation={5} sx={{padding: "0.5rem"}}>
                                    <CardContent>
                                        <Typography sx={{marginY: "1rem"}} color={"primary"} variant={"subtitle1"}>Event Type: {e.event_type}</Typography>
                                        <Typography variant="subtitle1" color={"primary"} sx={{marginY: "1rem"}}>Event Planned on: {`${event_date.getDate()} - ${event_date.getMonth() + 1} - ${event_date.getFullYear()}`}</Typography>
                                        <Typography variant="subtitle1" color={"primary"} sx={{marginY: "1rem"}}>Event Status: {e.event_status}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant={"contained"} color={"error"} sx={{marginBottom: 1, borderRadius: "0.5rem"}} size={"large"} onClick={() => handleDelete(e.id)} startIcon={<DeleteIcon/>}>Delete</Button>
                                        <Button variant={"contained"} color={"secondary"} sx={{marginBottom: 1, borderRadius: "0.5rem"}} size={"large"} onClick={handleToggle} startIcon={<DeleteIcon/>}>Edit</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
                <Backdrop
                    sx={{ color : "#f08a5d", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                ></Backdrop>
            </Box>
        </div>
    );
}

Dashboard.layout = "user";

export async function getServerSideProps({req}){
    /*const res = await fetch("http://localhost:3000/api/events/getUserEvent");
    const {events} = await res.json();*/
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
            }
        }
    }
}
