import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


export default function TransactionComplete(props) {

    const router = useRouter();

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('info'))
        console.log(data);
        const handleEvents = async () => {
            await fetch("/api/events/addEvent", {
                method: 'POST',
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(data => {
                    sessionStorage.removeItem('info');
                    console.log(data);
                })
        }
        handleEvents();
    }, []);

    return (
        <Box component={"div"}>
            <Typography variant={"h4"} color={"primary"} sx={{ marginY : "1rem" }} align={"center"}>Event Registered Successfully</Typography>
            <Typography variant={"h5"} color={"primary"} sx={{ marginY : "1rem" }} align={"center"}>You will be redirected to your dashboard after closing this window</Typography>
        </Box>
    );
}