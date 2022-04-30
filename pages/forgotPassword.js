import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useSession} from "next-auth/react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import logo from "../public/assets/logo.png";
import Image from "next/image";

export default function ForgotPassword(props) {


    const router = useRouter();
    const { email_verified, email} = router.query;

    const { data : session, status } = useSession();
    if(status === "authenticated") router.push("/")

    const schema = yup.object({
        email : yup.string().required().email().trim(),
        password : yup.string().required().min(5).max(24).trim()
    });

    const { handleSubmit, formState: { errors }, control } = useForm({
        resolver : yupResolver(schema)
    });

    const formSubmit = async (data) => {
        if(email_verified){
            const { password } = data;
            console.log(password);
            fetch("http://localhost:3000/api/auth/changePassword",{
                method : "POST",
                headers:{
                    "Content-type" : "application/json"
                },
                body : JSON.stringify({
                    email : email,
                    password
                })
            }).then(res => res.json()).then(data => console.log(data)).catch(e => console.log(e.message));
        }
        else{
            const { email } = data;
            fetch("http://localhost:3000/api/auth/verifyEmail",{
                method : "POST",
                headers:{
                    "Content-type" : "application/json"
                },
                body : JSON.stringify({
                    email
                })
            }).then(res => res.json()).then(data => console.log(data)).catch(e => console.log(e.message));
        }
    };

    return (
        <Box sx={{ display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center", marginTop : "10rem", marginBottom : "14rem" }}>
            <Box sx={{ marginY : "2rem" }}>
                <Image src={logo} width={150} height={150}/>
                <Typography variant={"h6"} align={"center"} color={"primary"}>Password Reset</Typography>
            </Box>
            <Box sx={{ display : "flex", flexDirection : "column", justifyContent : "center" }} component={"div"}>
                <form onSubmit={handleSubmit(formSubmit)}>
                    { !email_verified && <Controller name="email" control={ control } defaultValue={""} render={({field}) => (<TextField {...field} fullWidth label={"Email"} type={"email"} variant={"outlined"} error={!!errors.email} helperText={errors.email ? errors.email?.message : ""} />)} />}
                    { email_verified && <Controller name="password" control={ control } defaultValue={""} render={({field}) => (<TextField {...field} fullWidth variant={"outlined"} label={"Password"} type={"password"} error={!!errors.password} helperText={errors.password ? errors.password?.message : ""} />)} />}
                    <Button variant={"contained"} type={"submit"} sx={{ color : "white", marginY : "1rem" }}>{!email_verified ? "Verify Email" : "Reset Password"}</Button>
                </form>
                { !email_verified && <Link href={"/login"}><Button color={"primary"} sx={{color: "white", margin: "0 auto"}} size={"small"} variant={"contained"}>Back</Button></Link>}
            </Box>
        </Box>
    );
};

ForgotPassword.layout = "user";

/*export async function getServerSideProps({ req }){
    const session = await getSession(req);
    console.log(session);
    if(session){
        return {
            redirect : {
                destination : "/"
            }
        }
    }
    else {
        return {
            props : session
        }
    }
}*/
