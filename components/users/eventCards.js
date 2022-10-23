import React, {useState, useEffect} from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from "@mui/material/Backdrop";
import EventDetails from "./eventDetails";
import Box from "@mui/material/Box";
import Close from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

function EventCards({event, data, fetchEvents}) {

    //for backdrop
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    let event_date = new Date(event.date);

    // To calculate the time difference of two dates
    let Difference_In_Time = event_date.getTime() - new Date().getTime();

    // To calculate the no. of days between two dates
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return (
            <>
                <Card elevation={5} sx={{padding: 2, borderRadius: 5}}>
                    <CardContent>
                        <Typography sx={{marginY: "1rem"}} color={"primary"} variant={"subtitle1"}>Event ID: {event.id}</Typography>
                        <Typography sx={{marginY: "1rem"}} color={"primary"} variant={"subtitle1"}>Event Type: {event.event_type}</Typography>
                        <Typography variant="subtitle1" color={"primary"} sx={{marginY: "1rem"}}>Event Planned on: {`${event_date.getDate()}/${event_date.getMonth() + 1}/${event_date.getFullYear()}`}</Typography>
                        <Typography variant="subtitle1" color={"primary"} sx={{marginY: "1rem"}}>Event Status: {event.event_status}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant={"contained"} disableElevation={true} color={"info"} sx={{marginBottom: 1, borderRadius: 2}} size={"large"} onClick={handleToggle} disabled={Difference_In_Days < 4} startIcon={<DeleteIcon/>}>Edit</Button>
                    </CardActions>
                </Card>
                <Backdrop
                    sx={{ color : "#f08a5d", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <Box sx={{ width : "55rem", height : "65rem", overflowY : "scroll", backgroundColor : "#ffffff", padding : "1rem", borderRadius : 5, scrollbarWidth: "none" }}>
                        <IconButton color={"primary"} sx={{
                            cursor: "pointer",
                            borderRadius: 1,
                            marginX: 1,
                            marginY: 2,
                            fontSize: "20px",
                            ':hover': {backgroundColor: "#f08a5d", color: "#fff"}
                        }} onClick={handleClose}><Close fontSize={"large"}/></IconButton>
                        <EventDetails event={event} eventProps={data} fetchEvents={fetchEvents}/>
                    </Box>
                </Backdrop>
            </>
    );
}

export default EventCards;