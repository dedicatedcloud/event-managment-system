import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Controller, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {DataGrid} from "@mui/x-data-grid";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {getSession} from "next-auth/react";
import Tag from "@mui/icons-material/Tag";
import AbcIcon from "@mui/icons-material/Abc";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import EditIcon from "@mui/icons-material/Edit";
import ArticleIcon from '@mui/icons-material/Article';
import Image from "next/image";


export default function CompanyEvents(props) {


    const [ourEvents, setOurEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const schema = yup.object({
        name : yup.string().required("Name is required").min(8, "Name must be at least 8 characters long"),
        location : yup.string().required("Location is required").min(5, "Location must be at least 10 characters long"),//change back to 10
        description : yup.string().required("Description is required").min(5, "Description must be at least 100 characters long"),//change back to 10
        picture : yup.mixed().required("Pictures are required")
    });

    const {control, formState : { errors }, handleSubmit, reset} = useForm({
        resolver : yupResolver(schema),
        reValidateMode : "OnBlur"
    });

    useEffect(() => {
        setOurEvents(props.ourEvents);
    }, []);

    const getEvents = async () => {
        const res = await fetch("/api/companyEvents/getCompanyEvent");
        const { ourEvents } = await res.json();
        setOurEvents(ourEvents);
    }


    //for Images & editing them
    const DisplayImage = (props) => {
        return <Image src={"/CompanyEvents/"+props.value} width={1000} height={400} className={"ImageSize"} alt=""/>
    }

    const SelectImage = (props) => {
        const { id, field, value, api } = props;
        return <TextField type={"file"} onChange={ async (e) => {
            api.setEditCellValue({id, field, value: e.target.files[0]}, e);
            const isValid = await api.commitCellChange({id, field});
            if (isValid) {
                api.setCellMode(id, field, 'view');
            }
        }
        }/>
    }

    //for actions column
    const deleteButton = (props) => {
        return (
            <>
                <Button variant={"contained"} color={"error"} onClick={ () => handleDeletion(props.row.id) }>Delete</Button>
            </>
        );
    }

    //Company Event name column edit validation function
    const validateName = (value) => {
        //make a regex for validating string without numbers and special character
        const regex = new RegExp("^[a-zA-Z\\s]*$");
        if(regex.test(value)){
            const name = ourEvents.filter(oe => oe.name === value);
            if(name.length > 0) {
                return false;
            }else{
                return true;
            }
        }
        return false;
    }

    const validateDescription = (value) => {
        if (value > 1000) {
            return true;
        } else{
            return false;
        }
    }

    const columns = [
        { field: 'id', headerName: 'Id', editable : false, type : "number", renderHeader : (props) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><Tag fontSize={"small"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{props.colDef.headerName}</Typography></Box>
            }},
        { field: 'name', headerName: 'Name', editable : true, flex : 1, renderHeader : (props) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><AbcIcon fontSize={"large"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{props.colDef.headerName}</Typography></Box>
            },
            preProcessEditCellProps : (props) => {
                const validValue = validateName(props.props.value);
                return { ...props.props, error: !validValue };
            }
        },
        { field: 'location', headerName: 'Location', flex: 1, editable : true, renderHeader : (props) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><LocationOnIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{props.colDef.headerName}</Typography></Box>
            },
            preProcessEditCellProps : (props) => {
                const validValue = props.props.value.length > 10;
                return { ...props.props, error: !validValue };
            }
        },
        { field: 'description', headerName: 'Description', flex: 1, editable : true, renderHeader : (props) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><ArticleIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{props.colDef.headerName}</Typography></Box>
            },
            preProcessEditCellProps : (props) => {
                const validValue = props.props.value.length > 10;
                return { ...props.props, error: !validValue };
            }
        },
        {
            field: 'picture', headerName: "Picture", editable: true, flex: 2,
            renderCell : DisplayImage,
            renderEditCell : SelectImage,
            renderHeader : (props) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><InsertPhotoIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{props.colDef.headerName}</Typography></Box>
            }
        },
        { field: 'Action', headerName: 'Action', editable : false, flex : 1,
            renderCell : deleteButton,
            renderHeader : (props) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><EditIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{props.colDef.headerName}</Typography></Box>
            }
        },
    ];

    const SubmitHandler = async (data) => {
        setLoading(true);
        const { name, location, description, picture } = data;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("location", location);
        formData.append("description", description);
        formData.append("image", picture[0]);
        fetch("/api/companyEvents/addCompanyEvent", {
            method : "POST",
            body : formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data, "response from server");
                if(data.error){
                    setLoading(false);
                    setMessage(data.error);
                }else{
                    getEvents();
                    setLoading(false);
                    setMessage(data.message);
                }
                //need to empty fields after form submission
                reset({
                    name : "",
                    location : "",
                    description : "",
                    picture : ""
                });
            })
            .catch(e => console.log(e.message));
    };

    const handleDeletion = async (id) => {
        setLoading(true);
        fetch("/api/companyEvents/deleteCompanyEvent", {
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
                getEvents();
                setLoading(false);
                setMessage(data.message)
            }
        }).catch(e => console.log(e.message));
    };


    const handleCellEditCommit = (props) => {
        setLoading(true);
        const { id, field, value } = props;
        const formData = new FormData();
        formData.append("id", id);
        formData.append("field", field);
        if(field === "picture"){
            console.log(value, "value");
            formData.append("image", value);
        }else{
            formData.append("value", value);
        }
        fetch("/api/companyEvents/updateCompanyEvent", {
            method : "POST",
            body : formData
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                console.log(data);
                if(data.error){
                    setMessage(data.error);
                }else{
                    getEvents();
                    setLoading(false);
                    setMessage(data.message);
                }
            })
            .catch(e => console.log(e.message));
    }

    return (
        <>
            <Box component={"div"}>
                <Typography  variant={"h4"} textAlign={"center"} sx={{ marginY : "2rem" }} color={"primary"}>Our Events</Typography>
                {/*Insert Form*/}
                <Box component={"div"} sx={{ display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center" }}>
                    <Box width={"35rem"} sx={{ boxShadow : 5, padding : "2rem", borderRadius : "0.5rem" }}>
                        <form onSubmit={handleSubmit(SubmitHandler)}>
                            <Controller control={control} defaultValue={""} render={({field}) => (<TextField  {...field} label={"Name"} type={"text"} sx={{ marginY : "1rem" }} fullWidth error={!!errors.name} helperText={errors.name?.message} />)} name="name"/>
                            <Controller control={control} defaultValue={""} render={({field}) => (<TextField {...field} label={"Location"} multiline={true} type={"text"} sx={{ marginY : "1rem" }} fullWidth error={!!errors.location} helperText={errors.location?.message} />)} name="location"/>
                            <Controller control={control} defaultValue={""}  render={({field}) => (<TextField {...field} label={"Description"} multiline={true} type={"text"} sx={{ marginY : "1rem" }} fullWidth error={!!errors.description} helperText={errors.description?.message} />)} name="description"/>
                            <Controller control={control} render={({field}) => (<TextField type={"file"} onChange={ ({target}) => field.onChange(target.files) } sx={{ marginY : "1rem" }} error={!!errors.picture} helperText={errors.picture?.message} fullWidth />)} name="picture"/>
                            <Button type={"submit"} size={"large"}  variant={"contained"} sx={{ color : "white", marginY : "1rem", borderRadius : "0.5rem" }}>Add</Button>
                        </form>
                    </Box>
                </Box>
                <Box component={"div"} sx={{ display : "flex", flexDirection : "column", justifyContent : "center"}}>
                    <Box sx={{ width : "80rem", margin : "0 auto", paddingY : "3rem" }}>
                        <DataGrid autoHeight={true} disableSelectionOnClick={true} loading={loading} sx={{ boxShadow : 5, color : "#f08a5d", marginY : "1rem" }} density={"comfortable"} rows={ourEvents} columns={columns} onCellEditCommit={handleCellEditCommit} />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

CompanyEvents.layout = "admin";

export async function getServerSideProps({req}){
    const session = await getSession({req});
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
                }
            }
        }
        else {
            const res = await fetch(`${process.env.APP_URL}/api/companyEvents/getCompanyEvent`);
            const { ourEvents } = await res.json();
            console.log(ourEvents);
            return {
                props : {
                    user: session.user,
                    ourEvents : ourEvents
                },
            }
        }
    }
}
