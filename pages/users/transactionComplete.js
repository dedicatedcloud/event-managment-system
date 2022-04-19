import React, {useEffect, useState} from 'react';


export default function TransactionComplete(props) {

    const [ data, setData ] = useState({});

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('info'))
        setData(data);
    }, []);
    //TODO: add events after payment
    const handleEvents = () => {
        const res = fetch("/api/events/addEvent", {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const json = res.json();
        console.log(json);
    }
    return (
        <div>
        </div>
    );
}