import React, {useCallback, useEffect, useState} from 'react';
import {getSession} from "next-auth/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { DataGrid } from '@mui/x-data-grid';
import Tag from "@mui/icons-material/Tag";
import AbcIcon from "@mui/icons-material/Abc";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PaymentIcon from '@mui/icons-material/Payment';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EditIcon from '@mui/icons-material/Edit';
import {toast} from "react-toastify";


export default function Events({events : _events, guests, venues, users}) {

    const [ loading, setLoading ] = useState(true);
    const [ events, setEvents ] = useState([]);
    const [ message, setMessage ] = useState("");

    //for setting the event in the details view
    const [ event, setEvent ] = useState({
        eventType : "",
        guest : "",
        venue : "",
        environment : "",
        starterFood : [],
        mainFood : [],
        dessertFood : [],
        equipment : [],
        date : new Date()
    });

    //for backdrop
    /*const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = (id, props) => {
        const selectedEvent = events.filter(event => event.id === id)[0];
        console.log(selectedEvent);
        setEvent({
            eventType : selectedEvent.event_type,
            guest : selectedEvent.guestCountId,
            venue : selectedEvent.venueId,
            environment : selectedEvent.event_environment,
            foods : selectedEvent.event_foods,
            equipment : selectedEvent.event_equipment,
        });
        setOpen(!open);
    };*/

    const fetchEvents = async () => {
        const res = await fetch("/api/events/getEvents");
        const {events} = await res.json();
        setEvents(events);
        setLoading(false);
    }

    useEffect( () => {
        setEvents(_events);
        setLoading(false);
    }, [])

    /*useEffect( () => {
        fetchEvents();
    }, [])*/

    const guestField = (props) => {
        let print;
        guests.map((g, i) => {
            if(g.id === props.value) {
                print =  <Typography variant={"subtitle1"} key={i}>{g.min} - {g.max}</Typography>
            }
        });
        return print;
    }

    const venueField = (props) => {
        let print;
        venues.map((v, i) => {
            if(v.id === props.value) {
                print =  <Typography variant={"subtitle1"} key={i}>{v.name}</Typography>
            }
        });
        return print;
    }

    const userField = (props) => {
        let print;
        users.map((u, i) => {
            if(u.id === props.value) {
                print =  <Typography variant={"subtitle1"} key={i}>{u.name}</Typography>
            }
        });
        return print;
    }

    const dateField = (props) => {
        let date = new Date(props.value);
        return  <Typography variant={"subtitle1"} >{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</Typography>
    }

    const paymentStatusField = (props) => {
        return (
            <Typography variant={"subtitle1"} >{props.value}</Typography>
        );
    }

    const paymentStatusEditField = (props) => {
        const { id, value, api, field } = props;
        return <div>
            <Select value={value} onChange={ async (e) => {
                api.setEditCellValue({id, field, value: e.target.value}, e);
                const isValid = await api.commitCellChange({id, field});
                if (isValid) {
                    api.setCellMode(id, field, 'view');
                }
            }
            }>
                <MenuItem value={"pending"} >Pending</MenuItem>
                <MenuItem value={"completed"} >Completed</MenuItem>
            </Select>
        </div>
    }

    const eventStatusField = (props) => {
        return (
            <Typography variant={"subtitle1"} >{props.value}</Typography>
        );
    }

    const eventStatusEditField = (params) => {
        const { id, value, api, field } = params;
        return <div>
            <Select value={value} onChange={ async (e) => {
                api.setEditCellValue({id, field, value: e.target.value}, e);
                const isValid = await api.commitCellChange({id, field});
                if (isValid) {
                    api.setCellMode(id, field, 'view');
                }
            }
            }>
                <MenuItem value={"pending"} >Pending</MenuItem>
                <MenuItem value={"completed"} >Completed</MenuItem>
            </Select>
        </div>
    }

    const deleteButton = (props) => {
        return (
            <>
                <Button variant={"contained"} color={"error"} onClick={ () => handleDelete(props.row.id) }>Delete</Button>
            </>
        );
    }

    /*const details = (props) => {
        console.log(props);
        return (
            <>
                <Button variant={"contained"} color={"info"} onClick={ () => handleToggle(props.row.id, props) }>Details</Button>
                <Backdrop
                    sx={{ color : "#f08a5d", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                >
                    Hello
                </Backdrop>
            </>
        );
    }*/


    const columns = [
        { field: 'id', headerName: 'Id', editable : false, renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><Tag fontSize={"small"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
        }
        },
        { field: 'event_type', headerName: 'Type', editable : false,flex : 1, renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><AbcIcon fontSize={"large"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
        }
        },
        { field: 'guestCountId', headerName: 'Guest Size', editable : false, flex : 1,
            renderCell : guestField,
            renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><PeopleIcon fontSize={"small"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            }
        },
        { field: 'venueId', headerName: 'Venue', editable : false, flex : 1,
            renderCell : venueField,
            renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><LocationOnIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            }
        },
        { field: 'userId', headerName: 'User', editable : false, flex : 1,
            renderCell : userField,
            renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><PersonIcon fontSize={"small"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            }
        },
        { field: 'phone_number', headerName: 'Phone Number', editable : false, flex : 1,
            renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><LocalPhoneIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            }
        },
        { field: 'date', headerName: 'Date', editable : false, flex : 1,
            renderCell : dateField,
            renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><DateRangeIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            }
        },
        { field: 'payment_status', headerName: 'Payment Status', editable : true, flex : 1,
            renderCell : paymentStatusField,
            renderEditCell : paymentStatusEditField,
            renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><PaymentIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            }
        },
        { field: 'event_status', headerName: 'Event Status', editable : true, flex : 1,
            renderCell : eventStatusField,
            renderEditCell : eventStatusEditField,
            renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><EventAvailableIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            }
        },
        { field: 'Action', headerName: 'Action', editable : false, flex : 1,
            renderCell : deleteButton,
            renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><EditIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            }
        },
    ];

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

    //to get the edited record from the table row
    const handleCellEditCommit = useCallback(async (params) => {
        setLoading(true);
        const { id, field, value } = params;
        const formData = new FormData();
        formData.append("id", id);
        formData.append("field", field);
        formData.append("value", value);

        fetch("/api/events/updateEventAdmin", {
            method : "POST",
            body : JSON.stringify({
                id,
                field,
                value
            })
        })
            .then(res => res.json())
            .then(data => {
                fetchEvents();
            })
            .catch(e => console.log(e.message));
    }, []);

    //delete the event
    const handleDelete = async (id) => {
            setLoading(true);
            fetch("/api/events/deleteEvent", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({
                    id
                })
            }).then(res => res.json()).then(data => {
                console.log(data);
                if(data.error){
                    setMessage(data.error);

                }
                else{
                    fetchEvents();
                    setMessage(data.message);
                }
            }).catch(e => console.log(e.message));
    }


    return (
        <Box component={"div"} sx={{ margin: "0 auto" }}>
            <Typography variant={"h4"} textAlign={"center"} sx={{ marginY : "2rem" }} color={"primary"}>Events</Typography>
            <Box component={"div"} sx={{ display : "flex", flexDirection : "row", alignItems : "center"}}>
                <div style={{ display: 'flex', width : "100%" }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid sx={{ boxShadow : 5, color : "#f08a5d", marginY : "15rem" }} autoHeight={true} loading={loading} disableSelectionOnClick={true} density={"comfortable"} rows={events} columns={columns} onCellEditCommit={handleCellEditCommit} />
                    </div>
                </div>
            </Box>
        </Box>
    );
}

Events.layout = "admin";

export async function getServerSideProps(context){
    const session = await getSession(context)

    const fetchEvents = async () => {
        const res = await fetch(`${process.env.APP_URL}/api/events/getEvents`);
        const {events} = await res.json();
        return events;
    }

    const fetchGuestCount = async () => {
        const res = await fetch(`${process.env.APP_URL}/api/guest/getGuestCount`);
        const {guests} = await res.json();
        return guests;
    }

    const fetchVenues = async () => {
        const res = await fetch(`${process.env.APP_URL}/api/venues/getVenues`);
        const {venues} = await res.json();
        return venues;
    }

    const fetchUsers = async () => {
        const res = await fetch(`${process.env.APP_URL}/api/users/getUsers`);
        const {users} = await res.json();
        return users;
    }

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
            const data = await Promise.all([fetchEvents(), fetchGuestCount(), fetchVenues(), fetchUsers()]).then(results => {
                return {
                    events : results[0],
                    guests : results[1],
                    venues : results[2],
                    users : results[3]
                }
            });

            return {
                props : {
                    user: session.user,
                    events : data.events,
                    guests : data.guests,
                    venues : data.venues,
                    users : data.users,
                }
            }
        }
    }
}
