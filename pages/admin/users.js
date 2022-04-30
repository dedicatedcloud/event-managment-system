import React, {useEffect, useState} from 'react';
import {getSession} from "next-auth/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { DataGrid } from '@mui/x-data-grid';
import Tag from "@mui/icons-material/Tag";
import AbcIcon from "@mui/icons-material/Abc";
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from "@mui/icons-material/Edit";

export default function Users(props) {


    const [ users, setUsers ] = useState([]);
    const [ message, setMessage ] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setUsers(props.users);
        setLoading(false);
        // getUsers();
    }, []);

    //for actions column
    const deleteButton = (props) => {
        return (
            <>
                <Button variant={"contained"} color={"error"} onClick={ () => handleDeletion(props.row.id) }>Delete</Button>
            </>
        );
    }

    //column props for the DataGrid
    const columns = [
        { field: 'id', headerName: 'Id', flex : 1, editable : false, type: "number", renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><Tag fontSize={"small"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
        }
        },
        { field: 'name', headerName: 'Name', flex : 1, editable : false, renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><AbcIcon fontSize={"large"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
        }
        },
        { field: 'email', headerName: 'Email', flex : 1, editable : false, renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><EmailIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            }
        },
        { field: 'Action', headerName: 'Action', editable : false, flex : 1,
            renderCell : deleteButton,
            renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><EditIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            }
        },
    ]

    const getUsers = async () => {
        setLoading(true);
        const res =  await fetch("http://localhost:3000/api/users/getUsers");
        const  { users } = await res.json();
        setUsers(users);
        setLoading(false);
    }


    const handleDeletion = async (id) => {
        setLoading(true);
        fetch("http://localhost:3000/api/users/deleteUser", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                id
            })
        }).then(res => res.json()).then(data => {
            setLoading(false);
            console.log(data);
            getUsers();
            if(data.error){
                setMessage(data.error);
            }else{
                setMessage(data.message);
            }
        }).catch(e => console.log(e.message));
    }

    return (
        <Box component={"div"}>
            <Typography  variant={"h4"} textAlign={"center"} sx={{ marginY : "2rem" }} color={"primary"}>Users</Typography>
            <Box component={"div"} sx={{ display : "flex", flexDirection : "column", justifyContent : "center", marginY : "8rem"}}>
                <Box sx={{ width : "50rem", margin : "0 auto", paddingY : "3rem" }}>
                    <DataGrid autoHeight={true} loading={loading} disableSelectionOnClick={true} sx={{ boxShadow : 5, color : "#f08a5d", marginY : "1rem" }} density={"comfortable"} rows={users} columns={columns} />
                </Box>
            </Box>
        </Box>
    );
}

Users.layout = "admin";

export async function getServerSideProps({req, res}){
    const session = await getSession({req})
    const resp = await fetch("http://localhost:3000/api/users/getUsers");
    const data = await resp.json();
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
            res.setHeader(
                'Cache-Control',
                'public, s-maxage=10, stale-while-revalidate=59'
            )
            return {
                props : {
                    user: session.user,
                    users : data.users
                }
            }
        }
    }
}