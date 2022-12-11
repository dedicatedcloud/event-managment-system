import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
import Backdrop from "@mui/material/Backdrop";
import {Calendar, momentLocalizer} from 'react-big-calendar'
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import moment from 'moment';
import {useRouter} from "next/router";
import TextField from "@mui/material/TextField";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {toast} from "react-toastify";


export default function EventDetails(props) {


    const query = useRouter();

    const localizer = momentLocalizer(moment);

    // get the foods by category from the props.eventProps
    const menu1 = props.eventProps.food.filter(food => food.menu === "Menu 1");
    const menu2 = props.eventProps.food.filter(food => food.menu === "Menu 2");
    const menu3 = props.eventProps.food.filter(food => food.menu === "Menu 3");

    const [ events, setEvents ] = useState([]);

    //state for setting the venues after the guest count has been selected
    const [ venues, setVenues ] = useState([]);

    //state for handling the form fields
    const [ event, setEvent ] = useState({
        eventType : "",
        guest : "",
        venue : "",
        environment : "",
        menu1Food : [],
        menu2Food : [],
        menu3Food : [],
        equipment : [],
        date : new Date(),
        userId : "",
        phoneNumber : "",
        totalPrice : 0,
        advancePayment : 0,
    });

    // for handling the prices of the selected fields
    const [ prices, setPrices] = useState({
        venuePrice : 0,
        menu1Price : 0,
        menu2Price : 0,
        menu3Price : 0,
        equipmentPrice : 0
    });

    //for storing the total price of the event
    const [ totalPrice, setTotalPrice ] = useState(0);

    const [ guestCountState, setGuestCountState ] = useState({});

    // for notifications
    function showSuccessNotification(message) {
        toast.info(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function showErrorNotification(message) {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    //getting the venues when the guestCount changes
    useEffect(() => {

       let count = props.eventProps.guests.map((g,i) => {
            if(g.id === event.guest){
                return g;
            }
        })[0];
        setGuestCountState(count);
        const returnedVenues = props.eventProps.venues.filter((venue) => venue.guestCountId === event.guest);
        setVenues(returnedVenues);
    }, [event.guest]);

    //setting the venue price after the venue is selected
    useEffect(() => {
        venues.map((v) => {
            if(event.venue === v.id){
                setPrices(prevPrices => ({
                    ...prevPrices,
                    venuePrice : v.price
                }));
            }
        });
    }, [event.venue]);

    //iterating over menu1Food array to get the selected items prices, adding them and setting the state
    useEffect(() => {
        let total = 0;
        menu1.map((m1) => {
            event.menu1Food.map((em1) => {
                if(em1 === m1.id){
                    let price = m1.price * guestCountState.max
                    total = total + price;
                }
            });
        });
        setPrices(prevPrices => ({
            ...prevPrices,
            menu1FoodPrice : total
        }));
    }, [event.menu1Food]);

    //iterating over menu2Food array to get the selected items prices, adding them and setting the state
    useEffect(() => {
        let total = 0;
        menu2.map((m2) => {
            event.menu2Food.map((em2) => {
                if(em2 === m2.id){
                    let price = m2.price * guestCountState.max
                    total = total + price
                }
            });
        });
        setPrices(prevPrices => ({
            ...prevPrices,
            menu2FoodPrice : total
        }));
    }, [event.menu2Food]);

    //iterating over menu3Food array to get the selected items prices, adding them and setting the state
    useEffect(() => {
        let total = 0;
        menu3.map((m3) => {
            event.menu3Food.map((em3) => {
                if(em3 === m3.id){
                    let price = m3.price * guestCountState.max
                    total = total + price
                }
            });
        });
        setPrices(prevPrices => ({
            ...prevPrices,
            menu3FoodPrice : total
        }));
    }, [event.menu3Food]);

    //iterating over Equipment array to get the selected items prices, adding them and setting the state
    useEffect(() => {
        let total = 0;
        props.eventProps.equipment.map((e) => {
            event.equipment.map((se) => {
                if(se === e.id){
                    total = total+e.price
                }
            });
        });
        setPrices(prevPrices => ({
            ...prevPrices,
            equipmentPrice : total
        }));
    }, [event.equipment]);

    //for calculating price on each item change
    useEffect( () => {
        setEvent((prevEvent) => ({
            ...prevEvent, totalPrice : Object.values(prices).reduce((a, b) => a + b)
        }));
    }, [prices]);

    useEffect(() => {
        const fetchEvents = async () => {
            const res = await fetch(`/api/events/getEvents`);
            const data = await res.json();
            let _events = data.events.map(event => ({
                title : `Event-${event.id}`,
                allDay : true,
                start : event.date,
                end : event.date
            }));
            setEvents(_events);
        }
        fetchEvents();
    }, [])

    //states and functions for the BackDrop
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleDateChange = (date) => {
        const filteredDate = events.filter((d) => {
            let temp = new Date(d.start);
            let eventDate = new Date(`${temp.getMonth()+1}/${temp.getDate()}/${temp.getFullYear()}`);
            console.log(eventDate.getDate() === date.getDate() && date.getDate() === new Date().getDate())
            if(eventDate.getDate() === date.getDate()){
                return d;
            }
        });

        //checking difference between today's date and the selected date
        let Difference_In_Time = date.getTime() - new Date().getTime();
        // To calculate the no. of days between two dates
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        if(filteredDate.length > 0){
            showErrorNotification("Select a date different from the pre registered events!");
        } else if(Difference_In_Days < 4) {
            showErrorNotification("Select a date that is 4 days from now or more!");
        }
        else{
            setEvent(prevEvent => ({
                ...prevEvent,
                date : date,
            }));
        }
    }

    const handleUpdate = async () => {
        const eventData = {
            id : props.event.id,
            eventType: event.eventType,
            guest: event.guest,
            venue: event.venue,
            environment: event.environment,
            menu1Food: event.menu1Food,
            menu2Food: event.menu2Food,
            menu3Food: event.menu3Food,
            equipment: event.equipment,
            date: new Date(event.date),
            price : event.totalPrice
        }
        await fetch(`/api/events/updateEvent`, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(eventData)
        }).then(res => res.json())
            .then(data => {
                if(data.error){
                    showErrorNotification(data.error);
                }else{
                    props.fetchEvents();
                    showSuccessNotification(data.message);
                }

            });
    }

    //for submitting the form
    const handleSubmit = (e) => {
        e.preventDefault()
        if(query.pathname === "/users/event"){
            props.next({event, totalPrice}, e)
        }else{
            e.preventDefault();
            handleUpdate();

        }
    }

    //if the form is being used in the dashboard for editing an event
    useEffect( () => {
        if(props?.event){
            const { event } = props;
            let menu1 = [];
            let menu2 = [];
            let menu3 = [];
            let equipment = [];

            for(let i = 0; i < event.event_foods.length; i++){
                for(let j = 0; j < props.eventProps.food.length; j++){
                    if(event.event_foods[i] === props.eventProps.food[j].id){
                        if(props.eventProps.food[j].menu === "Menu 1"){
                            menu1.push(props.eventProps.food[j].id)
                        }
                        else if(props.eventProps.food[j].menu === "Menu 2"){
                            menu2.push(props.eventProps.food[j].id)
                        }
                        else{
                            menu3.push(props.eventProps.food[j].id)
                        }
                    }
                }
            }

            for(let i = 0; i < event.event_equipment.length; i++){
                for(let j = 0; j < props.eventProps.equipment.length; j++){
                    if(event.event_equipment[i] === props.eventProps.equipment[j].id){
                        equipment.push(props.eventProps.equipment[j].id);
                    }
                }
            }

            let count = props.eventProps.guests.map((g,i) => {
                if(g.id === event.guestCountId){
                    return g;
                }
            })[0];
            setGuestCountState(count);

            setEvent({
                eventType: event.event_type,
                guest: event.guestCountId,
                venue: event.venueId,
                environment: event.event_environment,
                menu1Food: menu1,
                menu2Food: menu2,
                menu3Food: menu3,
                equipment: equipment,
                date: new Date(event.date)
            })
        }
    }, [])

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Grid container rowSpacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant={"h5"} color={"primary"} align={"center"} sx={{ paddingY : "1rem" }}>Guest & Venue Details:</Typography>
                    </Grid>
                   <Grid item xs={12} sm={6} lg={6}>
                       <FormControl variant={"standard"} required sx={{ m: 1, width: { xs : 320, sm : 200, md : 320, lg : 320 } }}>
                           <InputLabel id={"eventType"}>Event Type</InputLabel>
                           <Select value={event.eventType} labelId={"eventType"} fullWidth onChange={ ({target}) => setEvent(prevEvent => ({
                               ...prevEvent,
                               eventType : target.value
                           })) } label={"Event Type"}>
                               <MenuItem value={"Wedding"}>Wedding</MenuItem>
                               <MenuItem value={"Birthday Party"}>Birthday Party</MenuItem>
                               <MenuItem value={"Gathering"}>Gathering</MenuItem>
                           </Select>
                       </FormControl>
                   </Grid>
                   <Grid item xs={12} sm={6} lg={6}>
                       <FormControl variant={"standard"} required sx={{ m: 1, width: { xs : 320, sm : 200, md : 320, lg :320 } }}>
                           <InputLabel id={"Guests"}>Guests</InputLabel>
                           <Select value={event.guest} labelId={"Guests"} label={"Guests"} onChange={ ({target}) => setEvent(prevEvent => ({
                               ...prevEvent,
                               guest : target.value
                           })) }>
                               { props.eventProps.guests.map((g,i) => {
                                   return (
                                       <MenuItem key={i} value={g.id}>{g.min} - {g.max}</MenuItem>
                                   )
                               }) }
                           </Select>
                           <FormHelperText>Venues will be suggested based on Guest Size</FormHelperText>
                       </FormControl>
                   </Grid>
                   <Grid item xs={12} sm={6} lg={6}>
                       <FormControl variant={"standard"} sx={{ m: 1, width: { xs : 320, sm : 200, md : 320, lg :320 } }}>
                           <InputLabel id={"Venues"}>Venues</InputLabel>
                           <Select value={event.venue} labelId={"Venues"} label={"Venues"} onChange={ ({target}) => setEvent(prevEvent => ({
                               ...prevEvent,
                               venue : target.value
                           })) }>
                               <MenuItem value={""}>None</MenuItem>
                               { venues.map((v,i) => (
                                       <MenuItem key={i} value={v.id}>{v.name} - Price :{v.price}</MenuItem>
                                   )
                               )}
                           </Select>
                       </FormControl>
                   </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                        <FormControl variant={"standard"} sx={{ m: 1, width: { xs : 320, sm : 200, md : 320, lg :320 } }}>
                            <InputLabel id={"Outdoor/Indoor"}>Indoor/Outdoor</InputLabel>
                            <Select value={event.environment} labelId={"Outdoor/Indoor"} label={"Outdoor/Indoor"} onChange={ ({target}) => setEvent(prevEvent => ({
                                ...prevEvent,
                                environment : target.value
                            })) }>
                                <MenuItem value={"Indoor"}>Indoor</MenuItem>
                                <MenuItem value={"Outdoor"}>Outdoor</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant={"h5"}  color={"primary"} sx={{ paddingY : "1rem" }} align={"center"}>Foods Category:</Typography>
                    </Grid>
                   <Grid item xs={12} sm={12} lg={12} sx={{ paddingRight : "1rem" }}>
                       <FormControl variant={"standard"} sx={{ m: 1 }} fullWidth>
                           <InputLabel id="Menu1">Menu 1</InputLabel>
                           <Select labelId="Menu1" id="Menu1" label={"Menu 1"} value={event.menu1Food} multiple onChange={ ({target}) => setEvent(prevEvent => ({
                               ...prevEvent,
                               menu1Food : target.value
                           })) }>
                               { menu1.map((m1, i) => (
                                   <MenuItem key={i} value={m1.id}>{m1.name} ({m1.type}) - Price : {m1.price}</MenuItem>
                               ))}
                           </Select>
                       </FormControl>
                   </Grid>
                   <Grid item xs={12} sm={12} lg={12} sx={{ paddingRight : "1rem" }}>
                       <FormControl variant={"standard"} sx={{ m: 1 }} fullWidth>
                           <InputLabel id="Menu2">Menu 2</InputLabel>
                           <Select labelId="Menu2" id="Menu2" label={"Menu 2"} value={event.menu2Food} multiple onChange={ ({target}) => setEvent(prevEvent => ({
                               ...prevEvent,
                               menu2Food : target.value
                           })) }>
                               { menu2.map((m2, i) => (
                                   <MenuItem key={i} value={m2.id}>{m2.name} ({m2.type}) - Price : {m2.price}</MenuItem>
                               ))}
                           </Select>
                       </FormControl>
                   </Grid>
                   <Grid item xs={12} sm={12} lg={12} sx={{ paddingRight : "1rem" }}>
                       <FormControl variant={"standard"} sx={{ m: 1 }} fullWidth>
                           <InputLabel id="Menu3">Menu 3</InputLabel>
                           <Select labelId="Menu3" id="Menu3" label={"Menu 3"} value={event.menu3Food} multiple onChange={ ({target}) => setEvent(prevEvent => ({
                               ...prevEvent,
                               menu3Food : target.value
                           })) }>
                               { menu3.map((m3, i) => (
                                   <MenuItem key={i} value={m3.id}>{m3.name} ({m3.type}) - Price : {m3.price}</MenuItem>
                               ))}
                           </Select>
                           <FormHelperText>Multiple items can be selected from all Menus. The price for each item is for a single person, as selected in the Guest Count<br/>To unselect click on the option again.</FormHelperText>
                       </FormControl>
                   </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant={"h5"}  color={"primary"} sx={{ paddingY : "1rem" }} align={"center"}>Equipment:</Typography>
                    </Grid>
                   <Grid item xs={12} sm={6} lg={12}>
                       <FormControl variant={"standard"} sx={{ m: 1, width: { xs : 320, sm : 200, md : 320, lg :320 } }}>
                           <InputLabel id="equipment">Equipment</InputLabel>
                           <Select labelId="equipment" id="equipment" label={"Equipment"} value={event.equipment} multiple onChange={ ({target}) => setEvent(prevEvent => ({
                               ...prevEvent,
                               equipment : target.value
                           })) }>
                               { props.eventProps.equipment.map((e, i) => (
                                   <MenuItem key={i} value={e.id}>{e.name} - Price : {e.price}</MenuItem>
                               ))}
                           </Select>
                           <FormHelperText>Multiple items can be selected for all Equipment items.<br/>To unselect click on the option again.</FormHelperText>
                       </FormControl>
                   </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant={"h5"}  color={"primary"} sx={{ paddingY : "1rem" }} align={"center"}>Date:</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={12}>
                        <FormControl variant={"standard"} sx={{ m: 1, width: { xs : 320, sm : 200, md : 320, lg :320 } }} required >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Date:"
                                    inputFormat="MM/dd/yyyy"
                                    value={event.date}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField variant={"standard"} {...params} />}
                                />
                            </LocalizationProvider>
                            <FormHelperText>Select the date of the event.</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={12}>
                        <Typography onClick={handleToggle} sx={{ textTransform : "capitalize", textDecoration : "underline", cursor : "pointer", width : "max-content" }} color={"primary"}>Show Available Dates</Typography>
                        <Backdrop
                            sx={{ color : "#f08a5d", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={open}
                        >
                            <Box component={"div"} sx={{ backgroundColor : "#ffffff", padding : '1rem', borderRadius : "0.5rem" }}>
                                <IconButton color={"primary"} sx={{
                                    cursor: "pointer",
                                    borderRadius: 1,
                                    marginX: 1,
                                    marginY: 2,
                                    fontSize: "20px",
                                    ':hover': {backgroundColor: "#f08a5d", color: "#fff"}
                                }} onClick={handleClose}><Close fontSize={"large"}/></IconButton>
                                <Calendar
                                    localizer={localizer}
                                    events={events}
                                    startAccessor="start"
                                    endAccessor="end"
                                    style={{ height: "30rem", width : "100%", padding : "1rem" }}
                                />
                            </Box>
                        </Backdrop>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        <Box component={"div"} sx={{ display : "flex", flexDirection : "row", justifyContent : "space-between"}}>
                            <Typography variant={"subtitle1"} fontSize={20}>Total Price (Rs): {event.totalPrice}</Typography>
                            <Button type={"submit"} variant={"contained"} disableElevation={true} color={"primary"} size={"large"} sx={{ color : "white"}} disabled={event.guest === "" || event.venue === "" || event.eventType === ""|| event.date.getDate() === new Date().getDate() || (event.menu1Food.length === 0 && event.menu2Food.length === 0 && event.menu3Food.length === 0)}>{props?.event ? "Update" : "Next"}</Button>
                        </Box>
                    </Grid>
                    <FormHelperText sx={{ fontSize : "15px" }}>Fields with * are required!</FormHelperText>
                </Grid>
            </form>
        </Box>
    );
};
