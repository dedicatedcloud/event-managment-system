import React, {useEffect, useState} from 'react';
import {getSession} from "next-auth/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DeleteIcon from '@mui/icons-material/Delete';
import {Controller, useForm} from "react-hook-form";
import bcrypt from "bcryptjs";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

export default function Admins(props) {


    const [ admins, setAdmins ] = useState([]);
    const [ message, setMessage ] = useState("");

    const schema = yup.object({
        name : yup.string().required().trim(),
        email : yup.string().required().email().trim(),
        password : yup.string().required().min(5).max(24).trim()
    });

    const { handleSubmit, formState: { errors }, control } = useForm({
        resolver : yupResolver(schema)
    });

    useEffect(() => {
        setAdmins(props.admins);
        /*getAdmins();*/
    }, []);

    const getAdmins = async () => {
        const res =  await fetch("http://localhost:3000/api/admins/getAdmins");
        const  { admins } = await res.json();
        setAdmins(admins);
    }

    const handleDelete = async (id) => {
        fetch("http://localhost:3000/api/admins/deleteAdmin", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                id
            })
        }).then(res => res.json()).then(data => {
            getAdmins();
            setMessage(data.message);
        }).catch(e => console.log(e.message));
    }

    const SubmitHandler = async (data) => {
        const { name, email, password } = data;
        const hashedPassword = await bcrypt.hash(password, 10)
        fetch("http://localhost:3000/api/admins/addAdmin", {
            method : "POST",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify({
                name : name,
                email : email,
                password : hashedPassword,
                role : "admin"
            })
        }).then(res => res.json())
            .then(data => {
                if(data.error){
                    setMessage(data.error);
                }else{
                    setMessage(data.message);
                }
                getAdmins();
            })
            .catch(e => console.log(e.message));
    }

    return (
        <Box component={"div"}>
            <Typography variant={"h4"} textAlign={"center"} sx={{ marginY : "2rem" }} color={"primary"}>Admins</Typography>
            <Box component={"div"} sx={{ display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center" }}>
                <Box width={"35rem"} sx={{ boxShadow : 5, padding : "2rem", borderRadius : "0.5rem" }}>
                    <form onSubmit={handleSubmit(SubmitHandler)}>
                        <Controller control={control} render={({field}) => (<TextField {...field} label={"Name"} variant={"outlined"} fullWidth sx={{ marginY : "1rem" }} type={"text"} error={!!errors.name} helperText={errors.name ? errors.name?.message : ""} />)} name="name" />
                        <br/>
                        <Controller control={control} render={({field}) => (<TextField {...field} label={"Email"} variant={"outlined"} fullWidth sx={{ marginY : "1rem" }} type={"email"} error={!!errors.email} helperText={errors.email ? errors.email?.message : ""} />)} name="email" />
                        <br/>
                        <Controller control={control} render={({field}) => (<TextField {...field} label={"Password"} variant={"outlined"} fullWidth sx={{ marginY : "1rem" }} type={"password"} error={!!errors.password} helperText={errors.password ? errors.password?.message : ""} />)} name="password" />
                        <Typography variant={"subtitle1"}>Role: Admin</Typography>
                        <br/>
                        <Button type={"submit"} variant={"contained"} sx={{ color : "white" }}>Add</Button>
                        <br/>
                        { message && <span>{message}</span> }
                    </form>
                </Box>
            </Box>
            <Grid container sx={{ marginY : "5rem"}} spacing={3}>
                {
                    admins.map((a, i) => (
                        <Grid key={i} item lg={2}>
                            <Card elevation={5}>
                                <CardContent>
                                    <Typography sx={{ marginY : "1rem" }} color={"primary"} variant={"subtitle1"}>Name: {a.name}</Typography>
                                    <Typography variant="subtitle1" color={"primary"} sx={{ marginY : "1rem" }}>Email: {a.email}</Typography>
                                    <Typography variant="subtitle1" color={"primary"} sx={{ marginY : "1rem" }}>Privilege: {a.role}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant={"contained"} color={"error"} sx={{ marginBottom : 1, borderRadius : "0.5rem" }} size={"large"} onClick={ () => handleDelete(a.id)} startIcon={<DeleteIcon/>}>Delete</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}

Admins.layout = "admin";

export async function getServerSideProps({req}){
    const session = await getSession({req})
    const resp = await fetch("http://localhost:3000/api/admins/getAdmins");
    const data = await resp.json();
    if(!session){
        return {
            redirect : {
                destination : "/",
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
            return {
                props : {
                    user: session.user,
                    admins : data.admins
                }
            }
        }
    }
}