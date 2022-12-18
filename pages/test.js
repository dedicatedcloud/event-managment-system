import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import Switch from "@mui/material/Switch";
import {pink} from "@mui/material/colors";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";

const SignUp = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    console.log(errors);
    const handleRegister = (data) => {

        console.log(data);
    }

    useEffect(() => {
        const asyncFunction = async () => {
            fetch("/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: {
                    client_id: "MBRCHlyw7o1FABH",
                    client_secret: "dcklffqXVqmteqW"
                }
            }).then(res => res.json()).then(res => {
                console.log(res);
            })
        }
        asyncFunction();
    }, [])


    return (
        <div className="formContainer">
            <div className="formHeading">
                <h3 className="heading">SIGNUP</h3>
            </div>
            <form onSubmit={handleSubmit(handleRegister)}>
                <div className="row">
                    <div className="column">
                        <label htmlFor="">First Name*</label>
                        <input type="text" {...register("firstName", {required: true, maxLength: 20})}  />
                        {/* {errors.firstName?.type==="required" && <span className="error">This field is required</span>} */}
                    </div>
                    <div className="column">
                        <label htmlFor="">Last Name*</label>
                        <input type="text" {...register("lastName", {required: true, maxLength: 20})} />
                        {/* {errors.lastName?.type==="required" && <span className="error">This field is required</span>} */}
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <label htmlFor="">Mobile Number*</label>
                        <input type="tel" {...register("mobileNumber", {required: true, maxLength: 11})} />
                        {/* {errors.mobileNumber?.type==="required" && <span className="error">This field is required</span>} */}
                    </div>
                    <div className="column">
                        <label htmlFor="">Email*</label>
                        <input type="email" {...register("email", {required: true, maxLength: 30})} />
                        {/* {errors.email?.type==="required" && <span className="error">This field is required</span>} */}
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <label htmlFor="">Cnic*</label>
                        <input type="text" {...register("cnic", {
                            required: true,
                            maxLength: 20
                        }, {pattern: "[7-9]{1}[0-9]{9}"})} />
                        {/* {errors.cnic?.type==="required" && <span className="error">This field is required</span>} */}
                    </div>
                    <div className="column">
                        <label htmlFor="">Address*</label>
                        <input type="text" {...register("address", {required: true, maxLength: 20})} />
                        {/* {errors.address?.type==="required" && <span className="error">This field is required</span>} */}
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <label htmlFor="">Password*</label>
                        <input type="text" {...register("password", {required: true, maxLength: 20})} />
                        {/* {errors.password?.type==="required" && <span className="error">This field is required</span>} */}
                    </div>
                    <div className="column">
                        <label htmlFor="">Confirm Password*</label>
                        <input type="password" {...register("confirmPassword", {required: true, maxLength: 20})} />
                        {/* {errors.confirmPassword?.type==="required" && <span className="error">This field is required</span>} */}
                    </div>
                </div>
                <div className="genderRow">
                    <p>Gender:</p>
                    <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        {...register("gender", {required: true})}
                    >
                        <FormControlLabel
                            sx={{fontSize: "18px", color: "#524242"}}
                            value="female"
                            control={
                                <Radio
                                    sx={{
                                        "&.Mui-checked": {
                                            color: pink[600],
                                        },
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 20,
                                        },
                                    }}
                                />
                            }
                            label="Female"
                        />
                        <FormControlLabel
                            sx={{fontSize: "18px", color: "#524242", marginLeft: "45px"}}
                            value="male"
                            control={
                                <Radio
                                    sx={{
                                        "&.Mui-checked": {
                                            color: pink[600],
                                        },
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 20,
                                        },
                                    }}
                                />
                            }
                            label="Male"
                        />
                    </RadioGroup>
                    {/* {errors.gender?.type==="required" && <span className="error">This field is required</span>} */}
                </div>
                <div className="row">
                    <div className="switchCheck">
                        <Switch color="success" {...register("acceptTerms", {required: true})} /><span
                        className="checkConditionText">
                            I understand and agree that the use of this Website are subject to the.
                        </span> <br/>
                        {/* {errors.acceptTerms?.type==="required" && <span className="error">This field is required</span>} */}
                    </div>
                </div>
                <div className="formBtn">
                    {/* <input type="submit" className="signupBtn" value="SIGN UP"/> */}
                    <button className="signupBtn" type="submit">SIGN UP</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
