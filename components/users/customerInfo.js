import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React,{useState} from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";

export default function CustomerDetails ({ next, back, props }){

    const [ phoneNumber, setPhoneNumber ] = useState("");
    const { user } = props;


    return (
        <Box component={"div"}>
            <form onSubmit={ (e) => next({phoneNumber}, e) }>
                <Grid container rowSpacing={4} columnSpacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant={"h5"} color={"primary"} align={"center"}>Customer Details:</Typography><br/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField  label="Name" aria-readonly={true} value={user.name} InputLabelProps={{ shrink : true }} variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField  label="Email" aria-readonly={true} value={user.email} InputLabelProps={{ shrink : true }} variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl required fullWidth>
                            <TextField  label="Phone" type={"text"} value={phoneNumber} onChange={ ({target}) => setPhoneNumber(target.value)  }  variant="outlined" fullWidth/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <Box  component={"div"} sx={{ display : "flex", flexDirection : "row", justifyContent : "space-between"}}>
                            <Button onClick={ back } variant={"contained"} sx={{ color : "white"}} color={"primary"}>Back</Button>
                            <Button variant={"contained"} sx={{ color : "white"}} type={"submit"} color={"primary"} disabled={phoneNumber.length !== 11}>Next</Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
};