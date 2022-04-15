import React from 'react';
import {getSession} from "next-auth/react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useForm, Controller,} from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { DataGrid } from '@mui/x-data-grid';


export default function Events(props) {



    return (
        <Box component={"div"} sx={{ margin: "0 auto" }}>
            <Typography variant={"h5"} textAlign={"center"}>Events</Typography>
            {/*<form onSubmit={handleSubmit(SubmitHandler)}>
                <Controller control={control} render={({field}) => (<TextField  {...field} label={"Min Guest"} type={"number"} error={!!errors.min} helperText={errors.min?.message} />)} name="min"/>
                <ErrorMessage errors={errors} name="singleErrorInput" />
                <Controller control={control} render={({field}) => (<TextField {...field} label={"Max Guest"} type={"number"} error={!!errors.max} helperText={errors.max?.message} />)} name="max"/>
                <Button type={"submit"} variant={"contained"} sx={{ color : "white" }}>Add</Button>
            </form>*/}
            <div style={{ width: 700 }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        {/*<Button color={"error"} sx={{ marginY : 3 }} onClick={handleDelete} variant={"contained"}>Delete</Button>
                        <DataGrid autoHeight={true} checkboxSelection={true} loading={loading} disableSelectionOnClick={true} density={"comfortable"} rows={guests} columns={columns} onCellEditCommit={handleCellEditCommit} onSelectionModelChange={handleOnSelectionModelChange} selectionModel={selectionModel}  />*/}
                    </div>
                </div>
            </div>
        </Box>
    );
}

Events.layout = "admin";

export async function getServerSideProps(context){
    const session = await getSession(context)
  /*  const res = await fetch("http://localhost:3000/api/guest/getGuestCount");
    const data = await res.json();*/
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
                    /*guests : data.guests*/
                }
            }
        }
    }
}