import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid  from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
import Backdrop from "@mui/material/Backdrop";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import moment from 'moment';

// Todo: validate date input, maintain checks for it


export default function EventDetails({ next, props, data }){

    // get the foods by category from the props
    const starter = props.food.filter(food => food.category === "Starter");
    const main = props.food.filter(food => food.category === "Main Course");
    const dessert = props.food.filter(food => food.category === "Dessert");

    const [date, setDate] = useState(new Date());
    const [ events, setEvents ] = useState([]);

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

    const localizer = momentLocalizer(moment);

    /*const events = [
        {
          title : "event1",
            allDay: true,
            start: new Date(2022, 2, 24),
            end: new Date(2022, 2, 24),
        },
        {
            title : "event2",
            allDay: true,
            start: new Date(2022, 2, 25),
            end: new Date(2022, 2, 25),
        },
        {
            title : "event3",
            allDay: true,
            start: new Date(2022, 2, 26),
            end: new Date(2022, 2, 26),
        }
    ]*/

    //state for setting the venues after the guest count has been selected
    const [ venues, setVenues ] = useState([]);


    //states for handling the form fields
    const [ eventType, setEventType ] = useState("");
    const [ guest, setGuest ] = useState("");
    const [ venue, setVenue ] = useState("");
    const [ environment, setEnvironment ] = useState("");
    const [ starterFood, setStarterFood ] = useState([]);
    const [ mainFood, setMainFood ] = useState([]);
    const [ dessertFood, setDessertFood ] = useState([]);
    const [ equipment, setEquipment ] = useState([]);


    //states for handling the prices of the selected fields
    const [ venuePrice, setVenuePrice ] = useState(0);
    const [ starterFoodPrice, setStarterFoodPrice ] = useState(0);
    const [ mainFoodPrice, setMainFoodPrice ] = useState(0);
    const [ dessertFoodPrice, setDessertFoodPrice ] = useState(0);
    const [ equipmentPrice, setEquipmentPrice ] = useState([]);

    //adding the prices of the selected fields on each render
    let totalPrice = [venuePrice, starterFoodPrice, mainFoodPrice, dessertFoodPrice, equipmentPrice].reduce((partialSum, a) => partialSum + a, 0);

    //getting the venues when the guestCount changes
    useEffect(() => {
        const returnedVenues = props.venues.filter((venue) => venue.guestCountId === guest);
        setVenues(returnedVenues);
    }, [guest]);

    //setting the venue price after the venue is selected
    useEffect(() => {
        venues.map((v) => {
            if(venue === v.id){
                setVenuePrice(v.price);
            }else {
                setVenuePrice(0)
            }
        });
    }, [venue]);

    //iterating over starterFood array to get the selected items prices, adding them and setting the state
    useEffect(() => {
        let total = 0;
        starter.map((s) => {
            starterFood.map((sf) => {
                if(sf === s.id){
                    total = total+s.price
                }
            });
        });
        setStarterFoodPrice(total);
    }, [starterFood]);

    //iterating over MainFood array to get the selected items prices, adding them and setting the state
    useEffect(() => {
        let total = 0;
        main.map((m) => {
            mainFood.map((mf) => {
                if(mf === m.id){
                    total = total+m.price
                }
            });
        });
        setMainFoodPrice(total);
    }, [mainFood]);

    //iterating over DesertFood array to get the selected items prices, adding them and setting the state
    useEffect(() => {
        let total = 0;
        dessert.map((d) => {
            dessertFood.map((df) => {
                if(df === d.id){
                    total = total+d.price
                }
            });
        });
        setDessertFoodPrice(total);
    }, [dessertFood]);

    //iterating over Equipment array to get the selected items prices, adding them and setting the state
    useEffect(() => {
        let total = 0;
        props.equipment.map((e) => {
            equipment.map((se) => {
                if(se === e.id){
                    total = total+e.price
                }
            });
        });
        setEquipmentPrice(total);
    }, [equipment]);

    //states and functions for the BackDrop
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <Box>
            <form onSubmit={ (e) => next({eventType, guest, venue, environment, starterFood, mainFood, dessertFood, equipment, date, totalPrice}, e) }>
                <Grid container rowSpacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant={"h5"} color={"primary"} align={"center"} sx={{ paddingY : "1rem" }}>Guest & Venue Details:</Typography>
                    </Grid>
                   <Grid item xs={12} sm={6} lg={6}>
                       <FormControl required sx={{ m: 1, width: { xs : 320, sm : 200, md : 320, lg : 320 } }}>
                           <InputLabel id={"eventType"}>Event Type</InputLabel>
                           <Select value={eventType} labelId={"eventType"} fullWidth onChange={ ({target}) => setEventType(target.value) } label={"Event Type"}>
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
                           <Select value={guest} labelId={"Guests"} label={"Guests"} onChange={ ({target}) => setGuest(target.value) }>
                               <MenuItem value={""}>None</MenuItem>
                               { props.guests.map((g,i) => {
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
                           <Select value={venue} labelId={"Venues"} label={"Venues"} onChange={ ({target}) => setVenue(target.value) }>
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
                            <Select value={environment} labelId={"Outdoor/Indoor"} label={"Outdoor/Indoor"} onChange={ ({target}) => setEnvironment(target.value) }>
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
                           <Select labelId="Starter" id="Starter" label={"Starter"} value={starterFood} multiple onChange={ ({target}) => setStarterFood(target.value) }>
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
                           <Select labelId="Main" id="Main" label={"Main Course"} value={mainFood} multiple onChange={ ({target}) => setMainFood(target.value) }>
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
                           <Select labelId="Dessert" id="Dessert" label={"Desert"} value={dessertFood} multiple onChange={ ({target}) => setDessertFood(target.value) }>
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
                           <Select labelId="equipment" id="equipment" label={"Equipment"} value={equipment} multiple onChange={ ({target}) => setEquipment(target.value) }>
                               <MenuItem value={""}>None</MenuItem>
                               { props.equipment.map((e, i) => (
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
                            <DatePicker selected={date} onChange={(date) => setDate(date)}/>
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
                            <Button type={"submit"} variant={"contained"} color={"primary"} size={"large"} sx={{ color : "white"}} disabled={guest === "" || venue === "" || eventType === ""}>Next</Button>
                        </Box>
                    </Grid>
                    <FormHelperText sx={{ fontSize : "15px" }}>Fields with * are required!</FormHelperText>
                </Grid>
            </form>
        </Box>
    );
};