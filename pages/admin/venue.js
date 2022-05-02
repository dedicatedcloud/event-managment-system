import React, {useCallback, useEffect, useState} from 'react';
import {getSession} from "next-auth/react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Image from 'next/image';
import {Controller, useForm} from "react-hook-form";
import {DataGrid} from "@mui/x-data-grid";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Tag from "@mui/icons-material/Tag";
import AbcIcon from '@mui/icons-material/Abc';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NumbersIcon from '@mui/icons-material/Numbers';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import EditIcon from "@mui/icons-material/Edit";

export default function Venue(props) {
    const [ venues, setVenues ] = useState([]);
    const [ guests, setGuests ] = useState([]);
    const [ message, setMessage ] = useState('');
    const [ loading, setLoading ] = useState(true);



    //For guest Count and editing it
    const SelectInput = (props) => {
        const { id, value, api, field } = props;
        return <div>
            <Select value={value} onChange={ async (e) => {
                api.setEditCellValue({id, field, value: e.target.value}, e);
                const isValid = await api.commitCellChange({id, field});
                if (isValid) {
                    api.setCellMode(id, field, 'view');
                }
            }
            }>
                { guests.map((g, i) => {
                    return <MenuItem value={g.id} key={i}>{ g.min }-{ g.max }</MenuItem>
                }) }
            </Select>
        </div>
    };

    const field = (props) => {
        let print;
        guests.map((g, i) => {
            if(g.id === props.value) {
                print =  <Typography variant={"subtitle1"} key={i}>{g.min} - {g.max}</Typography>
            }
        });
        return print;
    }

    //for Images & editing them
    const DisplayImage = (props) => {
        return <Image src={"/Venues/"+props.value} width={1000} height={400} className={"ImageSize"} alt=""/>
    }

    const SelectImage = (props) => {
        const { id, field, value, api } = props;
        return <TextField type={"file"} onChange={ async (e) => {
            api.setEditCellValue({id, field, value: e.target.files[0]}, e);
            const isValid = await api.commitCellChange({id, field});
            if (isValid) {
                api.setCellMode(id, field, 'view');
            }
        }
        }/>
    }

    //for actions column
    const deleteButton = (props) => {
        return (
            <>
                <Button variant={"contained"} color={"error"} onClick={ () => handleDeletion(props.row.id) }>Delete</Button>
            </>
        );
    }

    //for currency display
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PKR',
    });

    //Venue column edit validation function
    const validateVenueName = (value) => {
        //make a regex for validating string without numbers and special character
        const regex = new RegExp("^[a-zA-Z\\s]*$");
        if(regex.test(value)){
            const venueName = venues.filter(venue => venue.name === value);
            if(venueName.length > 0) {
                return false;
            }else{
                return true;
            }
        }
        return false;
    }

    const validateVenuePrice = (value) => {
        //make a regex for validating price
        const regex = new RegExp("^[0-9]*$");
        if (regex.test(value)) {
            if (value > 1000) {
                return true;
            } else{
                return false;
            }
        }
        return false;
    }

    const columns = [
        { field: 'id', headerName: 'Id', editable : false, type : "number", renderHeader : (props) => {
            return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><Tag fontSize={"small"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{props.colDef.headerName}</Typography></Box>
            }},
        { field: 'name', headerName: 'Name', editable : true, flex : 1, renderHeader : (props) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><AbcIcon fontSize={"large"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{props.colDef.headerName}</Typography></Box>
            },
            preProcessEditCellProps : (props) => {
                const validValue = validateVenueName(props.props.value);
                return { ...props.props, error: !validValue };
            }
        },
        { field: 'location', headerName: 'Location', flex: 2, editable : true, renderHeader : (props) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><LocationOnIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{props.colDef.headerName}</Typography></Box>
            },
            preProcessEditCellProps : (props) => {
                const validValue = props.props.value.length > 10;
                return { ...props.props, error: !validValue };
            }
        },
        { field: 'price', headerName: 'Price', editable : true, type: "number", valueFormatter: ({ value }) => currencyFormatter.format(Number(value)), renderHeader : (props) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><AttachMoneyIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{props.colDef.headerName}</Typography></Box>
            },
            preProcessEditCellProps : (props) => {
                const validValue = validateVenuePrice(props.props.value);
                return { ...props.props, error: !validValue };
            }
        },
        { field: 'guestCountId', headerName: 'Guest Count', flex : 1, editable : true, type : "number",
            renderCell : field,
            renderEditCell : SelectInput,
            renderHeader : (props) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><NumbersIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{props.colDef.headerName}</Typography></Box>
            }
        },
        {
            field: 'picture', headerName: "Picture", editable: true, flex: 2,
            renderCell : DisplayImage,
            renderEditCell : SelectImage,
            renderHeader : (props) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><InsertPhotoIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{props.colDef.headerName}</Typography></Box>
            }
        },
        { field: 'Action', headerName: 'Action', editable : false, flex : 1,
            renderCell : deleteButton,
            renderHeader : (props) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><EditIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{props.colDef.headerName}</Typography></Box>
            }
        },
    ];

    useEffect(() => {
        /*getVenues();
        fetchGuests();*/
        setVenues(props.venues);
        setGuests(props.guests);
        setLoading(false);
    }, [])

    //schema for the validation being used in the form
    const schema = yup.object({
        name : yup.string().required("Name is required").min(8, "Name must be at least 8 characters long"),
        location : yup.string().required("Location is required").min(10, "Location must be at least 10 characters long"),
        price : yup.number().typeError("Price is required").required("Price is required").positive("Price must be positive").min(1000),
        guestCount : yup.string().required("Guest Count is required"),
        picture : yup.mixed().required("Picture is required")
    });

    const {control, formState : { errors }, handleSubmit, reset} = useForm({
        resolver : yupResolver(schema),
        reValidateMode : "OnBlur"
    });

    const getVenues = async () => {
        setLoading(true)
        const res =  await fetch("http://localhost:3000/api/venues/getVenues");
        const  { venues } = await res.json();
        setVenues(venues);
        setLoading(false)
    }

    /*const fetchGuests = async () => {
        const res = await fetch("http://localhost:3000/api/guest/getGuestCount");
        const {guests} = await res.json();
        setGuests(guests);
    };*/

    const SubmitHandler = async (data) => {
        setLoading(true);
        const { name, location, price, picture, guestCount } = data;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("location", location);
        formData.append("price", price);
        formData.append("guestCount", guestCount);
        formData.append("image", picture[0]);
        fetch("http://localhost:3000/api/venues/addVenue", {
            method : "POST",
            body : formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                getVenues();
                if(data.error){
                    setMessage(data.error);
                }else{
                    setMessage(data.message);
                }
                //need to empty fields after form submission
                reset({
                    name : "",
                    location : "",
                    price : "",
                    selectedGuest : "",
                    picture : ""
                });
            })
            .catch(e => console.log(e.message));
    };

    //to get the edited record from the table row
    const handleCellEditCommit = useCallback(async (props) => {
        setLoading(true);
        const { id, field, value } = props;
        const formData = new FormData();
        formData.append("id", id);
        formData.append("field", field);
        if(field === "picture"){
            formData.append("image", value);
        }else{
            formData.append("value", value);
        }
        fetch("http://localhost:3000/api/venues/updateVenue", {
            method : "POST",
            body : formData
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                console.log(data);
                getVenues();
                if(data.error){
                    setMessage(data.error);
                }else{
                    setMessage(data.message);
                }
            })
            .catch(e => console.log(e.message));

    }, []);

    const handleDeletion = async (id) => {
        setLoading(true);
        fetch("http://localhost:3000/api/venues/deleteVenue", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                id
            })
        }).then(res => res.json()).then(data => {
            console.log(data);
            getVenues();
            if(data.error){
                setMessage(data.error);
            }
            else{
                setMessage(data.message)
            }
        }).catch(e => console.log(e.message));
    };

    return (
        <Box component={"div"}>
            <Typography  variant={"h4"} textAlign={"center"} sx={{ marginY : "2rem" }} color={"primary"}>Venues</Typography>
            {/*Insert Form*/}
            <Box component={"div"} sx={{ display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center" }}>
                <Box width={"35rem"} sx={{ boxShadow : 5, padding : "2rem", borderRadius : "0.5rem" }}>
                    <form onSubmit={handleSubmit(SubmitHandler)}>
                        <Controller control={control} defaultValue={""} render={({field}) => (<TextField  {...field} label={"Name"} type={"text"} sx={{ marginY : "1rem" }} fullWidth error={!!errors.name} helperText={errors.name?.message} />)} name="name"/>
                        <Controller control={control} defaultValue={""} render={({field}) => (<TextField {...field} label={"Location"} multiline={true} type={"text"} sx={{ marginY : "1rem" }} fullWidth error={!!errors.location} helperText={errors.location?.message} />)} name="location"/>
                        <Controller control={control} defaultValue={""}  render={({field}) => (<TextField {...field} label={"Price"} type={"number"} sx={{ marginY : "1rem" }} fullWidth error={!!errors.price} helperText={errors.price?.message} />)} name="price"/>
                            <FormControl fullWidth sx={{marginY: "1rem"}}>
                                <InputLabel id="guest">Guest Count</InputLabel>
                                <Controller render={({ field }) => (<Select {...field} labelId={"guest"} error={!!errors.guestCount} label="Guest Count">
                                    {guests.map((g, i) => (
                                        <MenuItem value={g.id} key={i}>{g.min} - {g.max}</MenuItem>
                                    ))}
                                </Select>
                                )
                                } control={control} name="guestCount" defaultValue={""}/>
                                {errors.guestCount && <FormHelperText sx={{color: "red"}}>{errors.guestCount?.message}</FormHelperText>}
                            </FormControl>
                        <Controller control={control} render={({field}) => (<TextField type={"file"} onChange={ ({target}) => field.onChange(target.files) } sx={{ marginY : "1rem" }} error={!!errors.picture} helperText={errors.picture?.message} fullWidth />)} name="picture"/>
                        <Button type={"submit"} size={"large"}  variant={"contained"} sx={{ color : "white", marginY : "1rem", borderRadius : "0.5rem" }}>Add</Button>
                    </form>
                </Box>
            </Box>
            {/*Table*/}
            <Box component={"div"} sx={{ display : "flex", flexDirection : "column", justifyContent : "center"}}>
                <Box sx={{ width : "80rem", margin : "0 auto", paddingY : "3rem" }}>
                    <DataGrid autoHeight={true} disableSelectionOnClick={true} loading={loading} sx={{ boxShadow : 5, color : "#f08a5d", marginY : "1rem" }} density={"comfortable"} rows={venues} columns={columns} onCellEditCommit={handleCellEditCommit} />
                </Box>
            </Box>
        </Box>
    );
}

Venue.layout = "admin";

export async function getServerSideProps({req, res}){
    const session = await getSession({req});
    const resp = await fetch("http://localhost:3000/api/venues/getVenues");
    const { venues } = await resp.json();
    const resp2 = await fetch("http://localhost:3000/api/guest/getGuestCount");
    const { guests } = await resp2.json();
    if(!session){
        return {
            redirect : {
                destination : "/",
                permanent : false
            }
        }
    }
    if(session){
        const { role } = session.user;
        if(role === "user") {
            return {
                redirect : {
                    destination : "/",
                    permanent : false
                }
            }
        }
        else {
            res.setHeader(
                'Cache-Control',
                'public, s-maxage=10, stale-while-revalidate=59'
            )
            return {
                props : {
                    user: session.user,
                    venues : venues,
                    guests : guests
                },
            }
        }
    }
}