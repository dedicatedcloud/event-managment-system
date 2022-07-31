import React, {useState} from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Controller, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {DataGrid} from "@mui/x-data-grid";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {getSession} from "next-auth/react";


export default function OurEvents(props) {


    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const schema = yup.object({
        name : yup.string().required("Name is required").min(8, "Name must be at least 8 characters long"),
        location : yup.string().required("Location is required").min(5, "Location must be at least 10 characters long"),//change back to 10
        description : yup.string().required("Description is required").min(5, "Description must be at least 100 characters long"),//change back to 10
        pictures : yup.mixed().required("Pictures are required")
    });

    const {control, formState : { errors }, handleSubmit, reset} = useForm({
        resolver : yupResolver(schema),
        reValidateMode : "OnBlur"
    });

    const SubmitHandler = async (data) => {
        setLoading(true);
        const { name, location, description, pictures } = data;
        /*const picturesArray = Array.from(pictures).map((picture) => {
            return picture
        })
        console.log(picturesArray);*/
        const formData = new FormData();
        formData.append("name", name);
        formData.append("location", location);
        formData.append("description", description);
        formData.append("pictures", pictures);
        fetch("/api/ourEvents/addOurEvent", {
            method : "POST",
            body : formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data, "response from server");
                if(data.error){
                    setMessage(data.error);
                }else{
                    setMessage(data.message);
                }
                //need to empty fields after form submission
                /*reset({
                    name : "",
                    location : "",
                    price : "",
                    selectedGuest : "",
                    picture : ""
                });*/
            })
            .catch(e => console.log(e.message));
    };
    console.log(errors);

    return (
        <>
            <Box component={"div"}>
                <Typography  variant={"h4"} textAlign={"center"} sx={{ marginY : "2rem" }} color={"primary"}>Our Events</Typography>
                {/*Insert Form*/}
                <Box component={"div"} sx={{ display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center" }}>
                    <Box width={"35rem"} sx={{ boxShadow : 5, padding : "2rem", borderRadius : "0.5rem" }}>
                        <form onSubmit={handleSubmit(SubmitHandler)}>
                            <Controller control={control} defaultValue={""} render={({field}) => (<TextField  {...field} label={"Name"} type={"text"} sx={{ marginY : "1rem" }} fullWidth error={!!errors.name} helperText={errors.name?.message} />)} name="name"/>
                            <Controller control={control} defaultValue={""} render={({field}) => (<TextField {...field} label={"Location"} multiline={true} type={"text"} sx={{ marginY : "1rem" }} fullWidth error={!!errors.location} helperText={errors.location?.message} />)} name="location"/>
                            <Controller control={control} defaultValue={""}  render={({field}) => (<TextField {...field} label={"Description"} multiline={true} type={"text"} sx={{ marginY : "1rem" }} fullWidth error={!!errors.description} helperText={errors.description?.message} />)} name="description"/>
                            <Controller control={control} render={({field}) => (<TextField type={"file"} onChange={ ({target}) => field.onChange(target.files) } sx={{ marginY : "1rem" }} error={!!errors.pictures} helperText={errors.pictures?.message} fullWidth inputProps={{
                                multiple: true
                            }} />)} name="pictures"/>
                            <Button type={"submit"} size={"large"}  variant={"contained"} sx={{ color : "white", marginY : "1rem", borderRadius : "0.5rem" }}>Add</Button>
                        </form>
                    </Box>
                </Box>
                {/*Table
                <Box component={"div"} sx={{ display : "flex", flexDirection : "column", justifyContent : "center"}}>
                    <Box sx={{ width : "80rem", margin : "0 auto", paddingY : "3rem" }}>
                        <DataGrid autoHeight={true} disableSelectionOnClick={true} loading={loading} sx={{ boxShadow : 5, color : "#f08a5d", marginY : "1rem" }} density={"comfortable"} rows={venues} columns={columns} onCellEditCommit={handleCellEditCommit} />
                    </Box>
                </Box>*/}
            </Box>
        </>
    );
}

OurEvents.layout = "admin";

export async function getServerSideProps({req}){
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
        const { role } = session.user;
        if(role === "user") {
            return {
                redirect : {
                    destination : "/",
                }
            }
        }
        else {
            //TODO: make api for fetching out_events
            const res = await fetch(`${process.env.APP_URL}/api/ourEvents/getOurEvent`);
            const { ourEvents } = await res.json();
            return {
                props : {
                    user: session.user,
                    ourEvents
                },
            }
        }
    }
}