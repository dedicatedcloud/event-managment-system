import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import loginImage from "../public/assets/loginImage.jpg";
import Image from "next/image";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Login() {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const { error } = useRouter().query;

    const schema = yup.object({
        email : yup.string().required().email().trim(),
        password : yup.string().required().min(5).max(24).trim()
    });

    const {  handleSubmit,formState: { errors }, control } = useForm({
        resolver : yupResolver(schema)
    });
    const formSubmit = async (data) => {
        const { email, password } = data;
        await signIn('credentials',
            {
                email : email,
                password : password,
                // The page where you want to redirect to after a
                // successful login
                callbackUrl: "/"
            }
        ).then((error) => console.log(error))
            .catch((error) => console.log(error));
    };

    return (
        <Box component={"div"} sx={{ width : { xs : "20rem", sm : "30rem", md : "50rem", lg : "60rem" }, margin : { xs : "10rem auto", sm : "10rem auto", md : "10rem auto", lg : "10rem auto" },paddingY : { xs : 3, sm : 3, md : 0, lg : 0  },  display : "flex", flexDirection : {  xs : "column", sm : "column", md : "row",  lg : "row",  }, justifyContent : "center", boxShadow : 6 }}>
            { !matches &&  <Box component={"div"} sx={{height: "100%", flex : 1, marginBottom : "-4px"}}>
                <Image src={loginImage} width={500} height={600}/>
            </Box>}
            <Box component={"div"} sx={{ display : "flex", flexDirection : "column",justifyContent : "center", alignItems : "center", flex : 1 }}>
                <Box component={"div"} sx={{ textAlign : "left", width : "100%", paddingLeft : "2rem", marginBottom : { xs : 1, sm : 1, md : "2rem", lg : "3rem" } }}>
                    <Typography variant={"h5"} color={"primary"}>Login</Typography>
                    <Typography variant={"subtitle1"} color={"primary"}>Please Login to Continue</Typography>
                </Box>
                <Box component={"div"} sx={{ paddingX : "2rem" }} >
                    <form onSubmit={handleSubmit(formSubmit)}>
                        <Controller name="email" control={ control } defaultValue={""} render={({field}) => (<TextField {...field} sx={{ marginY : "1rem" }} label={"Email"} type={"email"} variant={"outlined"} fullWidth error={!!errors.email} helperText={errors.email ? errors.email?.message : ""} />)} />
                        <Controller name="password" control={ control } defaultValue={""} render={({field}) => (<TextField {...field} sx={{ marginY : "1rem" }} label={"Password"} type={"password"} variant={"outlined"} fullWidth error={!!errors.password} helperText={errors.password ? errors.password?.message : ""} />)} />
                        <Link href={"/forgotPassword"}><Typography color={"primary"} sx={{ cursor : "pointer", marginY : "1rem", ":hover" : { color : "#6d6e71" } }} variant={"subtitle1"} width={"8rem"}>Forgot Password?</Typography></Link>
                        <Box component={"div"} sx={{ display : "flex", flexDirection : "row", justifyContent : "start", alignItems : "center" }}>
                            <Button type="submit" value={"Submit"} variant={"contained"} sx={{ color : "white", borderRadius : "0.5rem", marginRight : "1.5rem" }} size={"large"}>Login</Button>
                            <Link href={"/register"}><Typography color={"primary"}  sx={{ cursor : "pointer", marginY : "1rem", ":hover" : { color : "#6d6e71" } }} variant={"subtitle1"}>Create an Account</Typography></Link>
                        </Box>
                    </form>
                    { error && <Typography variant={"subtitle1"} color={"red"} fontSize={16} sx={{ padding : "1rem" }}>Provided Credentials are either Incorrect or Do not Exist!</Typography> }
                </Box>
            </Box>
        </Box>
    );
};

Login.layout = "user";
