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
import {toast} from "react-toastify";
import {useTheme} from "@mui/material/styles";

export default function Admins(props) {

    const theme = useTheme();

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
        const res =  await fetch("/api/admins/getAdmins");
        const  { admins } = await res.json();
        setAdmins(admins);
    }

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

    const handleDelete = async (id) => {
        fetch("/api/admins/deleteAdmin", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                id
            })
        }).then(res => res.json()).then(data => {
            if(data.error){
                showErrorNotification(data.error);
            }else{
                getAdmins();
                setMessage(data.message);
                showSuccessNotification(data.message);
            }
        }).catch(e => console.log(e.message));
    }

    const SubmitHandler = async (data) => {
        const { name, email, password } = data;
        const hashedPassword = await bcrypt.hash(password, 10)
        fetch("/api/admins/addAdmin", {
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
                    showErrorNotification(data.error);
                }else{
                    setMessage(data.message);
                    showSuccessNotification(data.message);
                }
                getAdmins();
            })
            .catch(e => console.log(e.message));
    }

    return (
        <Box component={"div"}>
            <Typography variant={"h4"} textAlign={"center"} sx={{ marginY : "2rem", color: theme.palette.primary.main }}>Admins</Typography>
            <Box component={"div"} sx={{ display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center" }}>
                <Box width={"35rem"} sx={{ boxShadow : 5, padding : "2rem", borderRadius : 5 }}>
                    <form onSubmit={handleSubmit(SubmitHandler)}>
                        <Controller control={control} render={({field}) => (<TextField {...field} label={"Name"} variant={"standard"} fullWidth sx={{ marginY : "1rem" }} type={"text"} error={!!errors.name} helperText={errors.name ? errors.name?.message : ""} />)} name="name" />
                        <br/>
                        <Controller control={control} render={({field}) => (<TextField {...field} label={"Email"} variant={"standard"} fullWidth sx={{ marginY : "1rem" }} type={"email"} error={!!errors.email} helperText={errors.email ? errors.email?.message : ""} />)} name="email" />
                        <br/>
                        <Controller control={control} render={({field}) => (<TextField {...field} label={"Password"} variant={"standard"} fullWidth sx={{ marginY : "1rem" }} type={"password"} error={!!errors.password} helperText={errors.password ? errors.password?.message : ""} />)} name="password" />
                        <Typography variant={"subtitle1"}>Role: Admin</Typography>
                        <br/>
                        <Button type={"submit"} size={"large"}  variant={"contained"} disableElevation={true} sx={{ color : "white", marginY : "1rem", borderRadius : 2, backgroundColor: theme.palette.primary.main }}>Add</Button>
                        <br/>
                        { message && <span>{message}</span> }
                    </form>
                </Box>
            </Box>
            <Grid container sx={{ marginY : "5rem"}} spacing={3}>
                {
                    admins.map((a, i) => (
                        <Grid key={i} item lg={2}>
                            <Card elevation={5} sx={{borderRadius: 5, padding: 2}}>
                                <CardContent>
                                    <Typography sx={{ marginY : "0.5rem", color: theme.palette.primary.main }} variant={"subtitle1"}>Name: <br/> {a.name}</Typography>
                                    <Typography variant="subtitle1" sx={{ marginY : "0.5rem", color: theme.palette.primary.main }}>Email: <br/> {a.email}</Typography>
                                    <Typography variant="subtitle1" sx={{ marginY : "0.5rem", color: theme.palette.primary.main }}>Privilege: <br/> {a.role}</Typography>
                                </CardContent>
                                <CardActions>
									<Button variant={"contained"} color={"error"} sx={{ marginBottom: 1, borderRadius: 2 }} disableElevation={true} size={"large"} onClick={ () => handleDelete(a.id)} startIcon={<DeleteIcon/>}>Delete</Button>
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
    const resp = await fetch(`${process.env.APP_URL}/api/admins/getAdmins`);
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