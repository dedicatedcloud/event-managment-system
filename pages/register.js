import React, {useState} from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import bcrypt from 'bcryptjs';
import { signIn } from "next-auth/react";
import Image from "next/image";
import registerImage from "../public/assets/registerImage.jpg";
import Link from "next/link";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Register = () => {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const [message, setMessage ] = useState("");
    const schema = yup.object({
        name : yup.string().required().trim().min(5).max(24),
        email : yup.string().required().email().trim(),
        password : yup.string().required().min(5).max(24).trim()
    });

    const { handleSubmit, formState: { errors }, control } = useForm({
        resolver : yupResolver(schema)
    });


    const SubmitHandler = async (data) => {
        const { name, email, password } = data;
        const hashedPassword = await bcrypt.hash(password, 10)
        fetch("http://localhost:3000/api/auth/registerUser", {
            method : "POST",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify({
                name : name,
                email : email,
                password : hashedPassword
            })
        }).then(res => res.json())
            .then(data => {
                if(data?.user){
                    setMessage(data.message)
                    signIn("credentials",{
                        email : email,
                        password : password,
                        callbackUrl : "/"
                    })
                }
                if(data?.error){
                    setMessage(data.error)
                }
            })
            .catch(e => console.log(e.message));
    }

    return (
        <Box component={"div"} sx={{ width : { xs : "20rem", sm : "30rem", md : "50rem", lg : "60rem" }, margin : { xs : "10rem auto", sm : "10rem auto", md : "10rem auto", lg : "10rem auto" },paddingY : { xs : 3, sm : 3, md : 0, lg : 0  },  display : "flex", flexDirection : {  xs : "column", sm : "column", md : "row",  lg : "row",  }, justifyContent : "center", boxShadow : 6 }}>
            { !matches && <Box component={"div"} sx={{height: "100%", flex: 1, marginBottom: "-4px"}}>
                <Image src={registerImage} width={500} height={700}/>
            </Box>}
            <Box component={"div"} sx={{ display : "flex", flexDirection : "column",justifyContent : "center", alignItems : "center", flex : 1 }}>
                <Box component={"div"} sx={{ textAlign : "left", width : "100%", paddingLeft : "2rem", paddingTop : 1, marginBottom : { xs : 1, sm : 1, md : "1rem", lg : "3rem" } }}>
                    <Typography variant={"h5"} color={"primary"}>Register</Typography>
                    <Typography variant={"subtitle1"} color={"primary"}>Sign Up to Manage your Events</Typography>
                </Box>
                <Box component={"div"} sx={{ width : "100%", paddingX : "2rem" }} >
                    <form onSubmit={handleSubmit(SubmitHandler)}>
                        <Controller control={control} render={({field}) => (<TextField {...field} sx={{ marginY : "1rem" }} label={"Name"} type={"text"} variant={"outlined"} fullWidth error={!!errors.name} helperText={errors.name ? errors.name?.message : ""} />)} name="name" />
                        <Controller name="email" control={ control } defaultValue={""} render={({field}) => (<TextField {...field} sx={{ marginY : "1rem" }} label={"Email"} type={"email"} variant={"outlined"} fullWidth error={!!errors.email} helperText={errors.email ? errors.email?.message : ""} />)} />
                        <Controller name="password" control={ control } defaultValue={""} render={({field}) => (<TextField {...field} sx={{ marginY : "1rem" }} label={"Password"} type={"password"} variant={"outlined"} fullWidth error={!!errors.password} helperText={errors.password ? errors.password?.message : ""} />)} />
                        <Box component={"div"} sx={{ display : "flex", flexDirection : "column", justifyContent : "start", alignItems : "center", marginTop : 1 }}>
                            <Button type="submit" value={"Submit"} variant={"contained"} sx={{ color : "white", borderRadius : "0.5rem" }} size={"large"}>Register</Button>
                            <Link href={"/login"}><Button color={"primary"} sx={{ marginY : "1rem", color : "white" }} size={"small"} variant={"contained"}>Back</Button></Link>
                        </Box>
                    </form>
                    { message && <Typography variant={"subtitle1"} color={"red"} fontSize={16} sx={{ padding : "1rem" }}>{message}</Typography> }
                </Box>
            </Box>
        </Box>
    );
};

Register.layout = "user";

export default Register;
