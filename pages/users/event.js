import React, {useEffect, useState} from 'react';
import {getSession} from "next-auth/react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import StepConnector from "@mui/material/StepConnector";
import stepConnectorClasses from "@mui/material/StepConnector";
import EventNoteIcon from '@mui/icons-material/EventNote';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EventDetails from "../../components/users/eventDetails";
import {styled, useTheme} from "@mui/material/styles";
import CustomerDetails from "../../components/users/customerInfo";
import CheckOut from "../../components/users/checkOut";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import  MobileStepper from "@mui/material/MobileStepper";
import Backdrop from "@mui/material/Backdrop";
import $ from "jquery";
import param from "jquery-param";

export default function Event(props) {

    const [activeStep, setActiveStep] = useState(0);
    const [ isOpen, setIsOpen ] = useState(false);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const [ data, setData ] = useState({});
    const [ guests, setGuests ] = useState({});
    const [ venues, setVenues ] = useState({});
    const [ food, setFood ] = useState({});
    const [ equipment, setEquipment ] = useState({});

    //fetching all the data
    /*useEffect( () => {
        const fetchData = async () => {
            const resGuests = await fetch("http://localhost:3000/api/guest/getGuestCount");
            // const {guests} = await resGuests.json();
            setGuests(await resGuests.json());
            const resVenues = await fetch("http://localhost:3000/api/venues/getVenues");
            setVenues(await resVenues.json());
            // const {venues} = await resVenues.json();
            const resFood = await fetch("http://localhost:3000/api/food/getFoods");
            setFood(await resFood.json());
            // const {food} = await resFood.json();
            const resEquipment = await fetch("http://localhost:3000/api/equipment/getEquipments");
            setEquipment(await resEquipment.json());
            // const {equipment} = await resEquipment.json();
        }
        fetchData();
    }, [] );*/


    const steps = [
        "Add Event Details",
        "Confirm Info",
        "Checkout",
    ];


    const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 22,
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundColor:
                    '#f08a5d',
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundColor:
                    '#f08a5d',
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            height: 3,
            border: 0,
            backgroundColor:
                theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
            borderRadius: 1,
        },
    }));

    const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
            backgroundColor:
                '#f08a5d',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
        ...(ownerState.completed && {
            backgroundColor:
                '#f08a5d',
        }),
    }));

    function ColorlibStepIcon(props) {
        const { active, completed, className } = props;

        const icons = {
            1: <EventNoteIcon />,
            2: <InfoIcon />,
            3: <ShoppingCartIcon />,
        };

        return (
            <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
                {icons[String(props.icon)]}
            </ColorlibStepIconRoot>
        );
    }

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    //for handling payment
    const loadIframe = () => {
        // localStorage.setItem("info", JSON.stringify(data));
        sessionStorage.setItem("info", JSON.stringify(data));
        console.log(typeof data.date, "date")
        const request = {
            storeId: "13221",
            amount: /*data.totalPrice*/1,
            postBackURL: "http://localhost:3000/users/confirmation",
            orderRefNum: "2341",
            autoRedirect: "0",
            paymentMethod: "",
            merchantHashReq: "",
            emailAddr: data.email,
            mobileNum: data.phoneNumber,
        }
        var $iframe = $('#easypay-iframe');
        var str = param(request);
        $iframe.attr("src", "https://easypay.easypaisa.com.pk/easypay/Index.jsf?"+str);
    }


    const next = (params, e) => {
        e.preventDefault();
        setData((prevParams) => ({
            ...prevParams,
            ...params,
        }));
        nextStep();
    }

    // TODO: write a function to handle the event insertion
    const handleEvents = async () => {
        const res = await fetch("/api/events/addEvent", {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const json = await res.json();
        console.log(json);
    }


    const Form = () => {
        return activeStep === 0 ? <EventDetails data={data} next={next} props={props} /> : activeStep === 1 ? <CustomerDetails next={next} back={backStep} props={props}  /> : <CheckOut next={ next } back={ backStep } props={props} data={data}/>;
    };

    return (
        <Box sx={{ display : "flex", flexDirection : "column", alignItems : "center",justifyContent : "center", height : { xs : "90rem", sm : "80rem", md : "80rem", lg : "80rem" }, marginY : "5rem" }} component={"div"}>
            <Paper sx={{width : { xs : "22rem", sm : "35rem", md : "50rem", lg : "60rem" }, paddingY : "2rem", paddingX : { xs: 1, sm : 2, md : "4rem", lg : "4rem" }, borderRadius : "1rem", boxShadow : 6}}>
                { !matches && <Stepper activeStep={activeStep} connector={<ColorlibConnector/>} sx={{paddingY: "2rem"}}>
                    {
                        steps.map((step, i) => {
                            return (
                                <Step key={i}>
                                    <StepLabel StepIconComponent={ColorlibStepIcon}>{step}</StepLabel>
                                </Step>
                            );
                        })
                    }
                </Stepper>}
                { matches && <MobileStepper variant="dots" position="static" activeStep={activeStep} steps={steps.length}  sx={{ width : "15rem", margin : "1rem auto", display : "flex", flexDirection : "column", justifyContent : "center" }}/> }
                { activeStep === steps.length ? (
                    <Box component={"div"}>
                        <Typography variant={"h5"} align={"center"} color={"primary"} gutterBottom >Confirmation</Typography>
                        <Typography variant={"subtitle1"} color={"danger"} gutterBottom>By Clicking Confirm, you are affirming the validation of the Info you provided!</Typography>
                        <Box component={"div"} sx={{ display : "flex", flexDirection : "row", justifyContent : "space-between", alignItems : "center" }}>
                            <Button onClick={ backStep } variant={"contained"} sx={{ color : "white"}} color={"primary"}>Back</Button>
                            <Button variant={"contained"} sx={{ color : "white"}} type={"submit"} onClick={ () => { setIsOpen(true); {/*loadIframe()*/} handleEvents()  } } color={"primary"}>Confirm</Button>
                        </Box>
                        {/*  Backdrop for payment  */}
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={isOpen}
                            onClick={ () => setIsOpen(false) }
                        >
                            <iframe style={{ backgroundColor : "#fff", padding : "1rem", borderRadius : "0.5rem" }} id="easypay-iframe" name="easypay-iframe" src="about:blank" width="65%" height="600px"/>
                        </Backdrop>
                    </Box>
                ) : <Form/> }
            </Paper>
        </Box>
    );
}
Event.layout = "user";

export async function getServerSideProps(context){
    const session = await getSession(context);
    if(!session){
        return {
            redirect : {
                destination : "/login",
                permanent : false
            }
        }
    }
    if(session){
        const resGuests = await fetch("http://localhost:3000/api/guest/getGuestCount");
        const {guests} = await resGuests.json();
        const resVenues = await fetch("http://localhost:3000/api/venues/getVenues");
        const {venues} = await resVenues.json();
        const resFood = await fetch("http://localhost:3000/api/food/getFoods");
        const {food} = await resFood.json();
        const resEquipment = await fetch("http://localhost:3000/api/equipment/getEquipments");
        const {equipment} = await resEquipment.json();
        return {
            props : {
                user: session.user,
                guests,
                venues,
                food,
                equipment
            }
        }
    }
}