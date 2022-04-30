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


export default function EventDetails(props) {


    const query = useRouter();

    const localizer = momentLocalizer(moment);

    // get the foods by category from the props.eventProps
    const starter = props.eventProps.food.filter(food => food.category === "Starter");
    const main = props.eventProps.food.filter(food => food.category === "Main Course");
    const dessert = props.eventProps.food.filter(food => food.category === "Dessert");

    const [ events, setEvents ] = useState([]);

    //state for setting the venues after the guest count has been selected
    const [ venues, setVenues ] = useState([]);

    //state for handling the form fields
    const [ event, setEvent ] = useState({
        eventType : "",
        guest : "",
        venue : "",
        environment : "",
        starterFood : [],
        mainFood : [],
        dessertFood : [],
        equipment : [],
        date : new Date()
    });

    // for handling the prices of the selected fields
    const [ prices, setPrices] = useState({
        venuePrice : 0,
        starterFoodPrice : 0,
        mainFoodPrice : 0,
        dessertFoodPrice : 0,
        equipmentPrice : 0
    });

    //for storing the total price of the event
    const [ totalPrice, setTotalPrice ] = useState(0);


    //getting the venues when the guestCount changes
    useEffect(() => {
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

    //iterating over starterFood array to get the selected items prices, adding them and setting the state
    useEffect(() => {
        let total = 0;
        starter.map((s) => {
            event.starterFood.map((sf) => {
                if(sf === s.id){
                    total = total+s.price
                }
            });
        });
        setPrices(prevPrices => ({
            ...prevPrices,
            starterFoodPrice : total
        }));
    }, [event.starterFood]);

    //iterating over MainFood array to get the selected items prices, adding them and setting the state
    useEffect(() => {
        let total = 0;
        main.map((m) => {
            event.mainFood.map((mf) => {
                if(mf === m.id){
                    total = total+m.price
                }
            });
        });
        setPrices(prevPrices => ({
            ...prevPrices,
            mainFoodPrice : total
        }));
    }, [event.mainFood]);

    //iterating over DesertFood array to get the selected items prices, adding them and setting the state
    useEffect(() => {
        let total = 0;
        dessert.map((d) => {
            event.dessertFood.map((df) => {
                if(df === d.id){
                    total = total+d.price
                }
            });
        });
        setPrices(prevPrices => ({
            ...prevPrices,
            dessertFoodPrice : total
        }));
    }, [event.dessertFood]);

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
        setTotalPrice(Object.values(prices).reduce((a, b) => a + b));
    }, [ prices.venuePrice, prices.starterFoodPrice, prices.mainFoodPrice, prices.dessertFoodPrice, prices.equipmentPrice ]);

    // Todo: same date must not be allowed to be selected
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
        // Todo: compare the dates and show warning if same date is selected
        const filteredDate = events.filter((d) => {
            let temp = new Date(d.start);
            let eventDate = new Date(`${temp.getMonth()+1}/${temp.getDate()}/${temp.getFullYear()}`);
            console.log(eventDate.getDate() === date.getDate())
            if(eventDate.getDate() === date.getDate()){
                return d;
            }
        });

        if(filteredDate.length > 0){
            //show notification if same date is selected
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
            starterFood: event.starterFood,
            mainFood: event.mainFood,
            dessertFood: event.dessertFood,
            equipment: event.equipment,
            date: new Date(event.date),
            price : totalPrice
        }
        console.log(eventData);
        await fetch(`/api/events/updateEvent`, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(eventData)
        }).then(res => res.json())
            .then(data => {
                console.log(data);
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
        //Todo: equipment is not being set
        if(props?.event){
            const { event } = props;
            let starter = [];
            let main = [];
            let dessert = [];
            let equipment = [];

            for(let i = 0; i < event.event_foods.length; i++){
                for(let j = 0; j < props.eventProps.food.length; j++){
                    if(event.event_foods[i] === props.eventProps.food[j].id){
                        if(props.eventProps.food[j].category === "Starter"){
                            starter.push(props.eventProps.food[j].id)
                        }
                        else if(props.eventProps.food[j].category === "Main Course"){
                            main.push(props.eventProps.food[j].id)
                        }
                        else{
                            dessert.push(props.eventProps.food[j].id)
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

            setEvent({
                eventType: event.event_type,
                guest: event.guestCountId,
                venue: event.venueId,
                environment: event.event_environment,
                starterFood: starter,
                mainFood: main,
                dessertFood: dessert,
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
                       <FormControl required sx={{ m: 1, width: { xs : 320, sm : 200, md : 320, lg : 320 } }}>
                           <InputLabel id={"eventType"}>Event Type</InputLabel>
                           <Select value={event.eventType} labelId={"eventType"} fullWidth onChange={ ({target}) => setEvent(prevEvent => ({
                               ...prevEvent,
                               eventType : target.value
                           })) } label={"Event Type"}>
                               <MenuItem value={""}>None</MenuItem>
                               <MenuItem value={"Wedding"}>Wedding</MenuItem>
                               <MenuItem value={"Birthday Party"}>Birthday Party</MenuItem>
                               <MenuItem value={"Gathering"}>Gathering</MenuItem>
                           </Select>
                       </FormControl>
                   </Grid>
                   <Grid item xs={12} sm={6} lg={6}>
                       <FormControl required sx={{ m: 1, width: { xs : 320, sm : 200, md : 320, lg :320 } }}>
                           <InputLabel id={"Guests"}>Guests</InputLabel>
                           <Select value={event.guest} labelId={"Guests"} label={"Guests"} onChange={ ({target}) => setEvent(prevEvent => ({
                               ...prevEvent,
                               guest : target.value
                           })) }>
                               <MenuItem value={""}>None</MenuItem>
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
                       <FormControl required sx={{ m: 1, width: { xs : 320, sm : 200, md : 320, lg :320 } }}>
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
                        <FormControl required sx={{ m: 1, width: { xs : 320, sm : 200, md : 320, lg :320 } }}>
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
                   <Grid item xs={12} sm={6} lg={6}>
                       <FormControl sx={{ m: 1, width: { xs : 320, sm : 200, md : 320, lg :320 } }}>
                           <InputLabel id="starter">Starter</InputLabel>
                           <Select labelId="Starter" id="Starter" label={"Starter"} value={event.starterFood} multiple onChange={ ({target}) => setEvent(prevEvent => ({
                               ...prevEvent,
                               starterFood : target.value
                           })) }>
                               <MenuItem value={""}>None</MenuItem>
                               { starter.map((s, i) => (
                                   <MenuItem key={i} value={s.id}>{s.name} - Price : {s.price}</MenuItem>
                               ))}
                           </Select>
                       </FormControl>
                   </Grid>
                   <Grid item xs={12} sm={6} lg={6}>
                       <FormControl required sx={{ m: 1, width: { xs : 320, sm : 200, md : 320, lg :320 } }}>
                           <InputLabel id="Main">Main Course</InputLabel>
                           <Select labelId="Main" id="Main" label={"Main Course"} value={event.mainFood} multiple onChange={ ({target}) => setEvent(prevEvent => ({
                               ...prevEvent,
                               mainFood : target.value
                           })) }>
                               <MenuItem value={""}>None</MenuItem>
                               { main.map((m, i) => (
                                   <MenuItem key={i} value={m.id}>{m.name} - Price : {m.price}</MenuItem>
                               ))}
                           </Select>
                       </FormControl>
                   </Grid>
                   <Grid item xs={12} sm={6} lg={12}>
                       <FormControl sx={{ m: 1, width: { xs : 320, sm : 200, md : 320, lg :320 } }}>
                           <InputLabel id="Dessert">Dessert</InputLabel>
                           <Select labelId="Dessert" id="Dessert" label={"Desert"} value={event.dessertFood} multiple onChange={ ({target}) => setEvent(prevEvent => ({
                               ...prevEvent,
                               dessertFood : target.value
                           })) }>
                               <MenuItem value={""}>None</MenuItem>
                               { dessert.map((d, i) => (
                                   <MenuItem key={i} value={d.id}>{d.name} - Price : {d.price}</MenuItem>
                               ))}
                           </Select>
                           <FormHelperText>Multiple items can be selected for all food items.<br/>To unselect click on the option again.</FormHelperText>
                       </FormControl>
                   </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant={"h5"}  color={"primary"} sx={{ paddingY : "1rem" }} align={"center"}>Equipment:</Typography>
                    </Grid>
                   <Grid item xs={12} sm={6} lg={12}>
                       <FormControl sx={{ m: 1, width: { xs : 320, sm : 200, md : 320, lg :320 } }}>
                           <InputLabel id="equipment">Equipment</InputLabel>
                           <Select labelId="equipment" id="equipment" label={"Equipment"} value={event.equipment} multiple onChange={ ({target}) => setEvent(prevEvent => ({
                               ...prevEvent,
                               equipment : target.value
                           })) }>
                               <MenuItem value={""}>None</MenuItem>
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
                        <FormControl  sx={{ m: 1, width: { xs : 320, sm : 200, md : 320, lg :320 } }} required >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Date:"
                                    inputFormat="MM/dd/yyyy"
                                    value={event.date}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params} />}
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
                            <Typography variant={"subtitle1"} fontSize={20}>Total Price (Rs): {totalPrice}</Typography>
                            <Button type={"submit"} variant={"contained"} color={"primary"} size={"large"} sx={{ color : "white"}} disabled={event.guest === "" || event.venue === "" || event.eventType === ""|| event.date === new Date()}>{props?.event ? "Update" : "Next"}</Button>
                        </Box>
                    </Grid>
                    <FormHelperText sx={{ fontSize : "15px" }}>Fields with * are required!</FormHelperText>
                </Grid>
            </form>
        </Box>
    );
};