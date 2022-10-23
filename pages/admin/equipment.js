import React, {useCallback, useEffect, useState} from 'react';
import {getSession} from "next-auth/react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {DataGrid} from "@mui/x-data-grid";
import Tag from "@mui/icons-material/Tag";
import Image from "next/image";
import AbcIcon from "@mui/icons-material/Abc";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import EditIcon from "@mui/icons-material/Edit";
import {toast} from "react-toastify";
import {useTheme} from "@mui/material/styles";

export default function Equipment(props) {

    const theme = useTheme();

    const [ equipment, setEquipment ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setEquipment(props.equipment)
        setLoading(false);
    }, []);

    //for Images & editing them
    const DisplayImage = (props) => {
        return <Image src={"/Equipment/"+props.value} width={1000} height={400} className={"ImageSize"} alt=""/>
    }

    const SelectImage = (params) => {
        const { id, field, value, api } = params;
        return <TextField type={"file"} variant={"standard"} onChange={ async (e) => {
            api.setEditCellValue({id, field, value: e.target.files[0]}, e);
            const isValid = await api.commitCellChange({id, field});
            if (isValid) {
                api.setCellMode(id, field, 'view');
            }
        }
        }/>
    }

    const deleteButton = (props) => {
        return (
            <>
                <Button variant={"contained"} disableElevation={true} color={"error"} onClick={ () => handleDeletion(props.row.id) }>Delete</Button>
            </>
        );
    }

    //for currency display
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PKR',
    });

    const validateEquipmentName = (value) => {
        //make a regex for validating string without numbers and special character
        const regex = new RegExp("^[a-zA-Z\\s]*$");
        if(regex.test(value)){
            const equipmentName = equipment.filter(equipment => equipment.name === value);
            if(equipmentName.length > 0) {
                return false;
            }else{
                return true;
            }
        }
        return false;
    }

    const validateEquipmentPrice = (value) => {
        //make a regex for validating price
        const regex = new RegExp("^[0-9]*$");
        if (regex.test(value)) {
            if (value > 1000) {
                return true;
            } else{
                return false;
            }
        }
        return false;
    }

    const columns = [
        { field: 'id', headerName: 'Id', type : "number",editable : false, renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><Tag fontSize={"small"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            } },
        { field: 'name', headerName: 'Name', editable : true, flex : 1, renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><AbcIcon fontSize={"large"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            },
            preProcessEditCellProps : (params) => {
                const validValue = validateEquipmentName(params.props.value);
                return { ...params.props, error: !validValue };
            }
        },
        { field: 'price', headerName: 'Price', editable : true, type: "number", flex : 1, valueFormatter: ({ value }) => currencyFormatter.format(Number(value)), renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><AttachMoneyIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            },
            preProcessEditCellProps : (params) => {
                const validValue = validateEquipmentPrice(params.props.value);
                return { ...params.props, error: !validValue };
            }
        },
        {
            field: 'picture', headerName: "Picture", editable: true, flex: 2,
            renderCell : DisplayImage,
            renderEditCell : SelectImage,
            renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><InsertPhotoIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            }
        },
        { field: 'Action', headerName: 'Action', editable : false, flex : 1,
            renderCell : deleteButton,
            renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><EditIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            }
        },
    ];

    //validation schema for form
    const schema = yup.object({
        name : yup.string().required("Name is required").min(8, "Name must be at least 8 characters long"),
        price : yup.number().required("Price is required").positive("Price must be positive").min(1000, "Price must be at least 1000"),
        picture : yup.mixed().required("Picture is required")
    });

    const {control, formState : { errors }, handleSubmit, reset} = useForm({
        resolver : yupResolver(schema)
    });

    const getEquipment = async () => {
        setLoading(true);
        const res =  await fetch("/api/equipment/getEquipments");
        const  { equipment } = await res.json();
        setEquipment(equipment);
        setLoading(false);
    }

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

    const handleDeletion = (id) => {
        setLoading(true);
        fetch("/api/equipment/deleteEquipment", {
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

                showErrorNotification(data.error);
            }
            else{
                showSuccessNotification(data.message);
                getEquipment();
            }
        }).catch(e => console.log(e.message));
    };

    //to get the edited record from the table row
    const handleCellEditCommit = useCallback(async (params) => {
        setLoading(true)
        const { id, field, value } = params;
        const formData = new FormData();
        formData.append("id", id);
        formData.append("field", field);
        if(field === "picture"){
            formData.append("image", value);
        }else{
            formData.append("value", value);
        }
        fetch("/api/equipment/updateEquipment", {
            method : "POST",
            body : formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.error){
                    showErrorNotification(data.error);
                }
                else{
                    showSuccessNotification(data.message);
                    getEquipment();
                }
            })
            .catch(e => console.log(e.message));

    }, []);

    const SubmitHandler = async (data) => {
        setLoading(true);
        const { name, price, picture } = data;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("image", picture[0]);
        fetch("/api/equipment/addEquipment", {
            method : "POST",
            body : formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                getEquipment();
                if(data.error){
                    showErrorNotification(data.error);
                }
                else{
                    showSuccessNotification(data.message);
                    getEquipment();
                }
                //need to empty fields after form submission
                reset({
                    name : "",
                    price : "",
                    picture : ""
                });
            })
            .catch(e => console.log(e.message));
    }

    return (
        <Box component={"div"}>
            <Typography  variant={"h4"} textAlign={"center"} sx={{ marginY : "2rem", color: theme.palette.primary.main }} >Equipment</Typography>
            <Box component={"div"} sx={{ display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center" }}>
                <Box width={"35rem"} sx={{ boxShadow : 5, padding : "2rem", borderRadius : 5 }}>
                    <form onSubmit={handleSubmit(SubmitHandler)}>
                        <Controller control={control} render={({field}) => (<TextField  {...field} label={"Name"} variant={"standard"} sx={{ marginY : "1rem" }} fullWidth type={"text"} error={!!errors.name} helperText={errors.name?.message} />)} name="name"/>
                        <Controller control={control} render={({field}) => (<TextField {...field} label={"Price"}  variant={"standard"} sx={{ marginY : "1rem" }} fullWidth type={"number"} error={!!errors.price} helperText={errors.price?.message} />)} name="price"/>
                        <Controller control={control} render={({field}) => (<TextField type={"file"} onChange={ ({target}) => field.onChange(target.files) } sx={{ marginY : "1rem" }} variant={"standard"} error={!!errors.picture} helperText={errors.picture?.message} fullWidth />)} name="picture"/>
                        <Button type={"submit"} size={"large"}  variant={"contained"} disableElevation={true} sx={{ color : "white", marginY : "1rem", borderRadius : 2, backgroundColor: theme.palette.primary.main }}>Add</Button>
                    </form>
                </Box>
            </Box>
            {/*Table*/}
            <Box component={"div"} sx={{ display : "flex", flexDirection : "column", justifyContent : "center"}}>
                <Box sx={{ width : "70rem", margin : "0 auto", paddingY : "3rem" }}>
                    <DataGrid columns={columns} rows={equipment} loading={loading} sx={{ boxShadow : 5, color : theme.palette.primary.main, marginY : "1rem", borderRadius : 5 }} autoHeight={true} disableSelectionOnClick={true} density={"comfortable"} onCellEditCommit={handleCellEditCommit} />
                </Box>
            </Box>
        </Box>
    );
}

Equipment.layout = "admin";

export async function getServerSideProps({req}){
    const session = await getSession({req});
    const resp = await fetch(`${process.env.APP_URL}/api/equipment/getEquipments`);
    const {equipment} = await resp.json();
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
            return {
                props : {
                    user: session.user,
                    equipment : equipment
                }
            }
        }
    }
}
