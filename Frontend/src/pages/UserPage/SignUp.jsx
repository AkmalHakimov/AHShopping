import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import button from "bootstrap/js/src/button";
import {useForm} from "react-hook-form";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow
} from "mdb-react-ui-kit";

export default function SignUp() {

    const navigate = useNavigate()
    const {register, handleSubmit,trigger,watch, formState: {errors}} = useForm();
    const [passwordVisible,setPasswordVisible] = useState(false);
    const [repeatPasswordVisible,setRepeatPasswordVisible] = useState(false);

    const mySubmit = (data) => {
        if(data.password!==data.repeatPassword){
            alert("check Passwords!")
            return;
        }
        let obj = {
            firstName: data.firstName,
            lastName: data.lastName,
            age: data.age,
            email: data.email,
            password: data.password,
            repeatPassword: data.repeatPassword,
        }
        axios({
            url: "/api/auth/signUp",
            method: "post",
            data: obj
        }).then(res => {
            navigate("/login")
        })
    }
    return (
        <MDBContainer fluid>

            <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                            <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4">Sign up</p>

                            <form onSubmit={handleSubmit(mySubmit)}>
                                <div className="d-flex flex-column align-items-start">
                                    <p style={{marginLeft: 34}}
                                       className="text-danger mb-1">{errors.firstName && !watch("firstName")? errors.firstName.message:"" }</p>
                                    <div className="d-flex flex-row align-items-center">
                                        <MDBIcon fas icon="user me-3" size='lg'/>
                                        <MDBInput
                                            className={`w-100${errors.firstName?.message && !watch("firstName") ? " form-control is-invalid" : ""}`}
                                            {...register("firstName", {required: "First Name is required"})}
                                            label='First Name'
                                            id='form1'
                                            type='text'
                                            onBlur={() => trigger("firstName")}
                                        />
                                    </div>
                                </div>


                                <div className="d-flex flex-column align-items-start">
                                    <p style={{marginLeft:34}} className="text-danger mb-1">{errors.lastName && !watch("lastName") ? errors.lastName.message:""}</p>
                                    <div className="d-flex flex-row align-items-center">
                                        <MDBIcon fas icon="user me-3" size='lg'/>
                                        <MDBInput
                                            className={`w-100${errors.lastName?.message  && !watch("lastName") ? " form-control is-invalid" : ""}`}
                                            {...register("lastName", { required: "Last Name is required" })}
                                            label='Last Name'
                                            id='form2'
                                            type='text'
                                            onBlur={() => trigger("lastName")}
                                        />
                                    </div>
                                </div>

                                <div className="d-flex flex-column align-items-start">
                                    <p style={{marginLeft:34}} className="text-danger mb-1">{errors.age?.message && !watch("age")? errors.age.message:""}</p>
                                    <div className="d-flex flex-row align-items-center">
                                        <MDBIcon fas icon="user me-3" size='lg'/>
                                        <MDBInput
                                            className={`w-100${errors.age?.message && !watch("age") ? " form-control is-invalid" : ""}`}
                                            {...register("age", { required: "Age is required" })}
                                            label='Your Age'
                                            id='form3'
                                            type='text'
                                            onBlur={() => trigger("age")}
                                        />
                                    </div>
                                </div>

                                <div className="d-flex flex-column align-items-start">
                                    <p style={{marginLeft:34}} className="text-danger mb-1">{errors.email?.message  && !watch("email")? errors.email.message:""}</p>
                                    <div className="d-flex flex-row align-items-center">
                                        <MDBIcon fas icon="user me-3" size='lg'/>
                                        <MDBInput
                                            className={`w-100${errors.email?.message && !watch("email") ? " form-control is-invalid" : ""}`}
                                            {...register("email", { required: "Email is required" })}
                                            label='Your Email'
                                            id='form4'
                                            type='email'
                                            onBlur={() => trigger("email")}
                                        />
                                    </div>
                                </div>

                                <div className="d-flex flex-column align-items-start">
                                    <p style={{marginLeft:34}} className="text-danger mb-1">{errors.password?.message && !watch("password")? errors.password.message:""}</p>
                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <MDBIcon fas icon="lock me-3" size='lg'/>
                                        <div className={`position-relative flex-grow-1${errors.password?.message ? " is-invalid" : ""}`}>
                                            <MDBInput
                                                className={`w-100${errors.password?.message  && !watch("password") ? " form-control is-invalid" : ""}`}
                                                {...register("password", { required: "Password is required" })}
                                                label='Your Password'
                                                id='form5'
                                                type={passwordVisible ? 'text' : 'password'}
                                                onBlur={() => trigger("password")}
                                            />
                                            {
                                                !errors.password?.message || watch("password") ?
                                                    <i
                                                        style={{top:20}}
                                                        className={`fa-solid fa-eye${passwordVisible ? "-slash" : ""} position-absolute end-0 translate-middle-y me-3 cursor-pointer`}
                                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                                    ></i>:""
                                            }
                                        </div>
                                    </div>

                                </div>

                                <div className="d-flex flex-column align-items-start mb-4">
                                    <p style={{marginLeft:34}} className="text-danger mb-1">{errors.repeatPassword?.message && !watch("repeatPassword")? errors.repeatPassword.message:""}</p>
                                    <div className="position-relative d-flex flex-row align-items-center">
                                        <MDBIcon fas icon="user me-3" size='lg'/>
                                        <MDBInput
                                            className={`w-100${errors.repeatPassword?.message && !watch("repeatPassword") ? " form-control is-invalid" : ""}`}
                                            {...register("repeatPassword", { required: "Repeat Password is required" })}
                                            label='Repeat Password'
                                            id='form6'
                                            type={repeatPasswordVisible ? 'text' : 'password'}
                                            onBlur={() => trigger("repeatPassword")}
                                        />
                                        {
                                            !errors.repeatPassword?.message || watch("repeatPassword") ?
                                                <i
                                                    style={{top:20}}
                                                    className={`fa-solid fa-eye${repeatPasswordVisible ? "-slash" : ""} position-absolute end-0 translate-middle-y me-3 cursor-pointer`}
                                                    onClick={() => setRepeatPasswordVisible(!repeatPasswordVisible)}
                                                ></i>:""
                                        }
                                    </div>
                                </div>
                                <button className='btn btn-primary mb-4' size='lg'>Register</button>
                            </form>


                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage
                                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
                                fluid/>
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
    );
}
