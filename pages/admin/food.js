import React, {useCallback, useEffect, useState} from 'react';
import {getSession} from "next-auth/react";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import {DataGrid} from "@mui/x-data-grid";
import Tag from "@mui/icons-material/Tag";
import Image from "next/image";
import AbcIcon from "@mui/icons-material/Abc";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

export default function Food(props) {

    const [ food, setFood ] = useState();
    const [ message, setMessage ] = useState("");
    const [ selectionModel, setSelectionModel ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        /*getFoods();*/
        setFood(props.food);
        setLoading(false);
    }, []);

    //for currency display
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PKR',
    });

    //for Food Category & editing them
    const SelectInput = (params) => {
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
                <MenuItem value={"Starter"} >Starter</MenuItem>
                <MenuItem value={"Main Course"} >Main Course</MenuItem>
                <MenuItem value={"Dessert"} >Dessert</MenuItem>
            </Select>
        </div>
    };

    const field = (props) => {
        return  <Typography variant={"subtitle"} >{props.value}</Typography>;
    }

    //for Images & editing them
    const DisplayImage = (props) => {
        return <Image src={"/Food/"+props.value} width={1000} height={500} className={"ImageSize"} alt=""/>
    }

    const SelectImage = (params) => {
        const { id, field, value, api } = params;
        return <TextField type={"file"} onChange={ async (e) => {
            api.setEditCellValue({id, field, value: e.target.files[0]}, e);
            const isValid = await api.commitCellChange({id, field});
            if (isValid) {
                api.setCellMode(id, field, 'view');
            }
        }
        }/>
    }

    //Food column edit validation function
    const validateFoodName = (value) => {
        //make a regex for validating string without numbers and special character
        const regex = new RegExp("^[a-zA-Z\\s]*$");
        if(regex.test(value)){
            const foodName = food.filter(food => food.name === value);
            if(foodName.length > 0) {
                return false;
            }else{
                return true;
            }
        }
        return false;
    }

    const validateFoodPrice = (value) => {
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
        { field: 'id', headerName: 'Id', editable : false, renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><Tag fontSize={"small"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            }},
        { field: 'name', headerName: 'Name', editable : true,flex : 1, renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><AbcIcon fontSize={"large"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            },
            preProcessEditCellProps : (params) => {
                const validValue = validateFoodName(params.props.value);
                return { ...params.props, error: !validValue };
            }
        },
        { field: 'category', headerName: 'Category', editable : true, flex : 1,
            renderCell : field,
            renderEditCell : SelectInput,
            renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><FactCheckIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            }
        },
        { field: 'price', headerName: 'Price', editable : true, type: "number", flex : 1, valueFormatter: ({ value }) => currencyFormatter.format(Number(value)), renderHeader : (params) => {
                return <Box component={"span"} sx={{ display : "flex", flex : "row", justifyContent : "center", alignItems : "center" }}><AttachMoneyIcon fontSize={"medium"}/><Typography variant={"subtitle2"} sx={{ paddingX : 1 }}>{params.colDef.headerName}</Typography></Box>
            },
            preProcessEditCellProps : (params) => {
                const validValue = validateFoodPrice(params.props.value);
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
        }
    ];

    const handleDeletion = () => {
        const id = selectionModel;
        if(id.length > 0){
            setLoading(true)
            fetch("http://localhost:3000/api/food/deleteFood", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({
                    id
                })
            }).then(res => res.json()).then(data => {
                getFoods();
                setMessage(data.message);
            }).catch(e => console.log(e.message));
        }
    };

    const handleOnSelectionModelChange = (newSelectionModel) => {
        setSelectionModel(newSelectionModel);
    }

    //validation schema for form
    const schema = yup.object({
        name : yup.string().required("Name is required").min(8, "Name must be at least 8 characters long"),
        price : yup.number().required("Price is required").positive("Price must be positive").min(1000, "Price must be greater than 1000"),
        foodCategory : yup.string().required("Category is required"),
        picture : yup.mixed().required("Picture is required")
    });

    const {control, formState : { errors }, handleSubmit, reset} = useForm({
        resolver : yupResolver(schema)
    });

    const getFoods = async () => {
        setLoading(true);
        const res =  await fetch("http://localhost:3000/api/food/getFoods");
        const { food } = await res.json();
        setFood(food);
        setLoading(false);
    }

    //to get the edited record from the table row
    const handleCellEditCommit = useCallback(async (params) => {
        setLoading(true);
        const { id, field, value } = params;
        const formData = new FormData();
        formData.append("id", id);
        formData.append("field", field);
        if(field === "picture"){
            formData.append("image", value);
        }else{
            formData.append("value", value);
        }
        fetch("http://localhost:3000/api/food/updateFood", {
            method : "POST",
            body : formData
        })
            .then(res => res.json())
            .then(data => {
                getFoods();
            })
            .catch(e => console.log(e.message));

    }, []);

    const SubmitHandler = async (data) => {
        setLoading(true);
        const { name, price, picture, foodCategory } = data;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("category", foodCategory);
        formData.append("image", picture[0]);
        fetch("http://localhost:3000/api/food/addFood", {
            method : "POST",
            body : formData
        })
            .then(res => res.json())
            .then(data => {
                getFoods();
                //need to empty fields after form submission !!pending
                reset({
                    name : "",
                    price : "",
                    foodCategory : "",
                    picture : ""
                });
            })
            .catch(e => console.log(e.message));
    }

    return (
        <Box component={"div"}>
            <Typography  variant={"h4"} textAlign={"center"} sx={{ marginY : "2rem" }} color={"primary"}>Food</Typography>
            <Box component={"div"} sx={{ display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center" }}>
                <Box width={"35rem"} sx={{ boxShadow : 5, padding : "2rem", borderRadius : "0.5rem" }}>
                    <form onSubmit={handleSubmit(SubmitHandler)}>
                        <Controller control={control} render={({field}) => (<TextField  {...field} label={"Name"} type={"text"} variant={"outlined"} sx={{ marginY : "1rem" }} fullWidth error={!!errors.name} helperText={errors.name?.message} />)} name="name"/>
                        <FormControl fullWidth sx={{marginY: "1rem"}}>
                            <InputLabel id="food">Food Category</InputLabel>
                            <Controller render={({ field }) => (<Select {...field} labelId={"food"} error={!!errors.foodCategory} label="Food Category">
                                    <MenuItem value={"Starter"} >Starter</MenuItem>
                                    <MenuItem value={"Main Course"} >Main Course</MenuItem>
                                    <MenuItem value={"Dessert"} >Dessert</MenuItem>
                                </Select>
                            )
                            } control={control} name="foodCategory" defaultValue={""}/>
                            {errors.foodCategory && <FormHelperText sx={{color: "red"}}>{errors.foodCategory?.message}</FormHelperText>}
                        </FormControl>
                        <Controller control={control} render={({field}) => (<TextField {...field} variant={"outlined"} sx={{ marginY : "1rem" }} fullWidth label={"Price"} type={"number"} error={!!errors.price} helperText={errors.price?.message} />)} name="price"/>
                        <Controller control={control} render={({field}) => (<TextField type={"file"} onChange={ ({target}) => field.onChange(target.files) } sx={{ marginY : "1rem" }} error={!!errors.picture} helperText={errors.picture?.message} fullWidth />)} name="picture"/>
                        <Button type={"submit"} variant={"contained"} sx={{ color : "white" }}>Add</Button>
                    </form>
                </Box>
            </Box>
            <Box component={"div"} sx={{ display : "flex", flexDirection : "column", justifyContent : "center"}}>
                <Box sx={{ width : "80rem", margin : "0 auto", paddingY : "3rem" }}>
                    <Button variant={"contained"} color={"error"} sx={{ marginY : 3, borderRadius : "0.5rem" }} size={"large"} onClick={handleDeletion}>Delete</Button>
                    <DataGrid columns={columns} rows={food ? food : []} autoHeight={true} loading={loading} sx={{ boxShadow : 5, color : "#f08a5d" }} checkboxSelection={true} disableSelectionOnClick={true} density={"comfortable"} onCellEditCommit={handleCellEditCommit} onSelectionModelChange={handleOnSelectionModelChange} selectionModel={selectionModel}  />
                </Box>
            </Box>
        </Box>
    );
}

Food.layout = "admin";

export async function getServerSideProps({req, res}){
    const session = await getSession({req})
    const resp = await fetch("http://localhost:3000/api/food/getFoods");
    const {food} = await resp.json();
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
                    food : food
                }
            }
        }
    }
}