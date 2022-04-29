import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";


export default function TransactionComplete(props) {

    /*const router = useRouter();

    const [ data, setData ] = useState({});

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('info'))
        setData(data);
        handleEvents().then(res => {
            sessionStorage.clear();
            router.push("/users/dashboard")
        });
    }, []);


    const handleEvents = async () => {
        const res = await fetch("/api/events/addEvent", {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const json = await res.json();
        console.log(json);
    }*/
    return (
        <div>
        </div>
    );
}