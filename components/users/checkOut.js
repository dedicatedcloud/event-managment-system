import React from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";

export default function CheckOut({ next, back, data, props}) {

    const { eventType, guest, venue, environment, starterFood, mainFood, dessertFood, equipment } = data.event;
    const { phoneNumber } = data;
    const { totalPrice } = data;

    const advancePayment = totalPrice * 0.3;

    const guestData = props.guests.filter( g => g.id === guest)[0];
    const venueData = props.venues.filter( v => v.id === venue)[0];


    //getting food names
    let starterFoodData = [];
        starterFood.map( (sf) => {
        props.food.map((f) => {
            if (f.id === sf) {
                starterFoodData.push(f.name)
            }
        });
    })

    let mainFoodData = [];
    mainFood.map( (mf) => {
        props.food.map((f) => {
            if (f.id === mf) {
                mainFoodData.push(f.name)
            }
        });
    })

    let dessertFoodData = [];
    dessertFood.map( (df) => {
        props.food.map((f) => {
            if (f.id === df) {
                dessertFoodData.push(f.name)
            }
        });
    })

    //getting equipment name
    let equipmentData = [];
    equipment.map( (se) => {
        props.equipment.map((e) => {
            if (e.id === se) {
                equipmentData.push(e.name)
            }
        });
    })

    return (
        <Box component={"div"} sx={{}}>
            <form onSubmit={ (e) => next({ advancePayment }, e) }>
                <Typography align={"center"} variant={"h5"} color={"primary"} sx={{ marginBottom : 3 }} gutterBottom>Receipt</Typography>
                <Grid container rowSpacing={4} sx={{ textAlign : "center" }}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography variant={"h6"} width={"100%"} gutterBottom color={"primary"}>Event Type:</Typography>
                        <Typography variant={"subtitle1"}  width={"100%"}>{ eventType }</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography variant={"h6"} width={"100%"} gutterBottom color={"primary"}>Guest Size:</Typography>
                        <Typography>{ guestData.min } - { guestData.max }</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography variant={"h6"} width={"100%"} gutterBottom color={"primary"}>Venue:</Typography>
                        <Typography gutterBottom>Venue Name: { venueData.name }</Typography>
                        <Typography>Venue Location: { venueData.location }</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography variant={"h6"} width={"100%"} gutterBottom color={"primary"}>Environment:</Typography>
                        <Typography>{ environment }</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography variant={"h6"} width={"100%"} gutterBottom color={"primary"}>Food Selection:</Typography>
                        <Typography gutterBottom>Starter: { starterFoodData.length === 0 ? "None" : starterFoodData.join(", ") }</Typography>
                        <Typography gutterBottom>Main Course: { mainFoodData.length === 0 ? "None" : mainFoodData.join(", ") }</Typography>
                        <Typography>Dessert: { dessertFoodData.length === 0 ? "None" : dessertFoodData.join(",") }</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography variant={"h6"} width={"100%"} gutterBottom color={"primary"}>Equipment Selection:</Typography>
                        <Typography>{ equipmentData.length === 0 ? "None" : equipmentData.join(", ") }</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography variant={"h6"} width={"100%"} gutterBottom color={"primary"}>Customer Details:</Typography>
                        <Typography gutterBottom>Name : { props.user.name }</Typography>
                        <Typography gutterBottom>Email : { props.user.email }</Typography>
                        <Typography gutterBottom>Phone Number : { phoneNumber }</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography variant={"h6"} width={"100%"} gutterBottom color={"primary"}>Pricing:</Typography>
                        <Typography gutterBottom>Total Price (in Rs) : {totalPrice} </Typography>
                        <Typography gutterBottom>Amount to be paid (in Rs) : {advancePayment} </Typography>
                        <FormHelperText>To avoid fraud, we&apos;ll ask for a small payment before confirming the Event Registration</FormHelperText>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ display : "flex", flexDirection : "row", justifyContent : "space-between" }}>
                        <Button onClick={ back } variant={"contained"} color={"primary"} size={"large"} sx={{ color : "white" }}>Back</Button>
                        <Button type={"submit"} variant={"contained"} color={"primary"} size={"large"} sx={{ color : "white" }}>Next</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}