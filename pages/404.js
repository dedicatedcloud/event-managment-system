import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import Button from "@mui/material/Button";

const NotFound = () => {

    const router = useRouter();

    /*useEffect(() => {
        setTimeout(()=>{
            router.push('/');
        }, 5000)
    }, []);*/


    return (
        <div>
            <Button onClick={() => router.back()} color={"primary"}>GoBack</Button>
        </div>
    );
};

export default NotFound;