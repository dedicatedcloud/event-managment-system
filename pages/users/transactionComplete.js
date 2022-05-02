import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {CircularProgress} from "@mui/material";


export default function TransactionComplete(props) {

    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('info'))
        const handleEvents = async () => {
            await fetch("/api/events/addEvent", {
                method: 'POST',
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(data => {
                    setLoading(false);
                    sessionStorage.removeItem('info');
                    console.log(data);
                })
        }
        handleEvents();
    }, []);

    if(loading) {
        return (
            <Box component={"div"} sx={{ display : "flex", justifyContent : "center", alignItems : "center" }}>
                <CircularProgress color={"primary"} size={"3rem"}/>
            </Box>
        );
    }else {
        return (
            <Box component={"div"}>
                <Typography variant={"h4"} color={"primary"} sx={{ marginY : "1rem" }} align={"center"}>Event Registered Successfully</Typography>
                <Typography variant={"h5"} color={"primary"} sx={{ marginY : "1rem" }} align={"center"}>You will be redirected to your dashboard after closing this window</Typography>
            </Box>
        );
    }
}