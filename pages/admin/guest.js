import React, {useCallback, useEffect, useState} from 'react';
import { getSession } from "next-auth/react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useForm, Controller,} from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { DataGrid } from '@mui/x-data-grid';
import Tag from "@mui/icons-material/Tag";
import PeopleIcon from '@mui/icons-material/People';


export default function Guest(props) {


    const [ guests, setGuests ] = useState([]);
    const [ message, setMessage ] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectionModel, setSelectionModel] = useState([]);

    useEffect(() => {
        setGuests(props.guests);
        setLoading(false)
    }, []);

    //for data grid column validation
    const validateMinGuests = (value) => {
        return value >= 100
    };

    const validateMaxGuests = (value) => {
        return value >= 200;
    };


    //column props for the DataGrid
    const columns = [
    { field: 'id', headerName: 'Id', flex : 1, editable : false, type: "number",renderHeader : (params) => {
            return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><Tag fontSize={"small"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
    }},
    { field: 'min', headerName: 'Min Guests',type : "number", flex : 1, editable : true, preProcessEditCellProps: (params) => {
            const validMinValue = validateMinGuests(params.props.value);
            return { ...params.props, error: !validMinValue };
        },renderHeader : (params) => {
            return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><PeopleIcon fontSize={"small"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
        }
    },
    { field: 'max', headerName: 'Max Guests',type : "number", flex : 1, editable : true, preProcessEditCellProps: (params) => {
            const validMaxValue = validateMaxGuests(params.props.value);
            return { ...params.props, error: !validMaxValue };
        },renderHeader : (params) => {
        return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><PeopleIcon fontSize={"small"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
    }
    },
    ]

    //schema for the validation being used in the form
    const schema = yup.object({
        max : yup.number().required().min(200).typeError('Must be a Number').positive("Value must be positive"),
        min : yup.number().required().min(100).typeError('Must be a Number').positive("Value must be positive")
    })

    const { control, formState : { errors }, handleSubmit, reset } = useForm({
        resolver : yupResolver(schema)
    });

    const getGuestCount = async () => {
        setLoading(true);
        const res =  await fetch("http://localhost:3000/api/guest/getGuestCount");
        const  { guests } = await res.json();
        setGuests(guests);
        setLoading(false);
    }


    //to get the edited record from the table row
    const handleCellEditCommit = useCallback(async (params) => {
        setLoading(true);
        const { id, field, value } = params;
        fetch("http://localhost:3000/api/guest/updateGuestCount", {
            method : "POST",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify({
                id,
                field,
                value
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setLoading(false)
            })
            .catch(e => console.log(e.message));

    }, []);


    //for getting the ids of the row to delete the selected record
    const handleOnSelectionModelChange = (newSelectionModel) => {
        setSelectionModel(newSelectionModel);
    }

    const handleDelete = async () => {
        const id = selectionModel;
        if(id.length > 0){
            setLoading(true);
            fetch("http://localhost:3000/api/guest/deleteGuestCount", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({
                    id
                })
            }).then(res => res.json()).then(data => {
                getGuestCount();
                setMessage(data.message);
            }).catch(e => console.log(e.message));
        }
    }


    //for form submission
    const SubmitHandler = async (data) => {
        setLoading(true)
        const { max, min } = data;
        fetch("http://localhost:3000/api/guest/addGuestCount", {
            method : "POST",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify({
                max,
                min
            })
        })
            .then(res => res.json())
            .then(data => {
                //setGuests(data.data);
                getGuestCount();
                //need to empty fields after form submission
                reset({
                    max : "",
                    min : ""
                });
            })
            .catch(e => console.log(e.message));
    }

    return (
        <Box component={"div"}>
            <Typography variant={"h4"} textAlign={"center"} sx={{ marginY : "2rem" }} color={"primary"}>Guest</Typography>
            <Box component={"div"} sx={{ display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center" }}>
                <Box sx={{ boxShadow : 5, padding : "2rem", borderRadius : "0.5rem" }}>
                    <form onSubmit={handleSubmit(SubmitHandler)}>
                        <Controller control={control} defaultValue={""} render={({field}) => (<TextField  {...field} label={"Min Guest"} sx={{ marginY : "1rem" }} fullWidth variant={"outlined"} type={"number"} error={!!errors.min} helperText={errors.min?.message} />)} name="min"/>
                        <Controller control={control} defaultValue={""} render={({field}) => (<TextField {...field} label={"Max Guest"} sx={{ marginY : "1rem" }} fullWidth variant={"outlined"} type={"number"} error={!!errors.max} helperText={errors.max?.message} />)} name="max"/>
                            <Button type={"submit"} size={"large"}  variant={"contained"} sx={{ color : "white", margin : "0 auto", borderRadius : "0.5rem" }}>Add</Button>
                    </form>
                </Box>
            </Box>
            <Box component={"div"} sx={{ display : "flex", flexDirection : "column", justifyContent : "center"}}>
                <Box sx={{ width : "55rem", margin : "0 auto", paddingY : "3rem" }}>
                    <Button color={"error"} sx={{ marginY : 3, borderRadius : "0.5rem" }} onClick={handleDelete} size={"large"} variant={"contained"}>Delete</Button>
                    <DataGrid autoHeight={true} checkboxSelection={true} sx={{ boxShadow : 5, color : "#f08a5d" }} loading={loading} disableSelectionOnClick={true} density={"comfortable"} rows={guests} columns={columns} onCellEditCommit={handleCellEditCommit} onSelectionModelChange={handleOnSelectionModelChange} selectionModel={selectionModel}  />
                </Box>
            </Box>
        </Box>
    )
};

Guest.layout = "admin";

export async function getServerSideProps(context){
    const session = await getSession(context)
    const res = await fetch("http://localhost:3000/api/guest/getGuestCount");
    const data = await res.json();
    if(!session){
        return {
            redirect : {
                destination : "/",
                permanent : false
            }
        }
    }
    if(session){
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
                    guests : data.guests
                }
            }
        }
    }
}