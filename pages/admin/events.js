import React, {useCallback, useEffect, useState} from 'react';
import {getSession} from "next-auth/react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useForm, Controller,} from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { DataGrid } from '@mui/x-data-grid';
import Tag from "@mui/icons-material/Tag";
import AbcIcon from "@mui/icons-material/Abc";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import Backdrop from "@mui/material/Backdrop";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


export default function Events({events : _events, guests, venues, users}) {

    const [ loading, setLoading ] = useState(true);
    const [ events, setEvents ] = useState([]);
    const [ selectionModel, setSelectionModel ] = useState([]);

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
        const res = await fetch("http://localhost:3000/api/events/getEvents");
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
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><FactCheckIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            }
        },
        { field: 'venueId', headerName: 'Venue', editable : false, flex : 1,
            renderCell : venueField,
            renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><FactCheckIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            }
        },
        { field: 'userId', headerName: 'User', editable : false, flex : 1,
            renderCell : userField,
            renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><FactCheckIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            }
        },
        { field: 'phone_number', headerName: 'Phone Number', editable : false, flex : 1,
            renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><FactCheckIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            }
        },
        { field: 'date', headerName: 'Date', editable : false, flex : 1,
            renderCell : dateField,
            renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><FactCheckIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            }
        },
        { field: 'payment_status', headerName: 'Payment Status', editable : true, flex : 1,
            renderCell : paymentStatusField,
            renderEditCell : paymentStatusEditField,
            renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><FactCheckIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            }
        },
        { field: 'event_status', headerName: 'Event Status', editable : true, flex : 1,
            renderCell : eventStatusField,
            renderEditCell : eventStatusEditField,
            renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><FactCheckIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            }
        },
    ];

    //for getting the ids of the row to delete the selected record
    const handleOnSelectionModelChange = (newSelectionModel) => {
        setSelectionModel(newSelectionModel);
    }

    //to get the edited record from the table row
    const handleCellEditCommit = useCallback(async (params) => {
        setLoading(true);
        const { id, field, value } = params;
        const formData = new FormData();
        formData.append("id", id);
        formData.append("field", field);
        formData.append("value", value);

        fetch("http://localhost:3000/api/events/updateEventAdmin", {
            method : "POST",
            body : JSON.stringify({
                id,
                field,
                value
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                fetchEvents();
            })
            .catch(e => console.log(e.message));
    }, []);

    //delete the event
    const handleDelete = async () => {
        const id = selectionModel;
        if(id.length > 0){
            setLoading(true);
            fetch("http://localhost:3000/api/events/deleteEvent", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({
                    id
                })
            }).then(res => res.json()).then(data => {
                console.log(data)
                fetchEvents();
                // setMessage(data.message);
            }).catch(e => console.log(e.message));
        }
    }


    return (
        <Box component={"div"} sx={{ margin: "0 auto" }}>
            <Typography variant={"h4"} textAlign={"center"} sx={{ marginY : "2rem" }} color={"primary"}>Events</Typography>
            <Box component={"div"} sx={{ height : "60.6vh", display : "flex", flexDirection : "row", alignItems : "center"}}>
                <div style={{ display: 'flex', width : "100%" }}>
                    <div style={{ flexGrow: 1 }}>
                        <Button color={"error"} sx={{ marginY : 3 }} variant={"contained"} onClick={handleDelete}>Delete</Button>
                        {/* Todo : visually adjust the table */}
                        <DataGrid autoHeight={true} checkboxSelection={true} loading={loading} disableSelectionOnClick={true} density={"comfortable"} rows={events} columns={columns} onCellEditCommit={handleCellEditCommit} onSelectionModelChange={handleOnSelectionModelChange} selectionModel={selectionModel}  />
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
        const res = await fetch("http://localhost:3000/api/events/getEvents");
        const {events} = await res.json();
        return events;
    }

    const fetchGuestCount = async () => {
        const res = await fetch("http://localhost:3000/api/guest/getGuestCount");
        const {guests} = await res.json();
        return guests;
    }

    const fetchVenues = async () => {
        const res = await fetch("http://localhost:3000/api/venues/getVenues");
        const {venues} = await res.json();
        return venues;
    }

    const fetchUsers = async () => {
        const res = await fetch("http://localhost:3000/api/users/getUsers");
        const {users} = await res.json();
        return users;
    }

    if(!session){
        return {
            redirect : {
                destination : "/",
                permanent : false
            }
        }
    }
    if(session){

        const data = await Promise.all([fetchEvents(), fetchGuestCount(), fetchVenues(), fetchUsers()]).then(results => {
            return {
                events : results[0],
                guests : results[1],
                venues : results[2],
                users : results[3]
            }
        });

        const { role } = session.user;
        if(role === "user") {
            return {
                redirect : {
                    destination : "/",
                    permanent : false
                }
            }
        }
        else {
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