import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox} from 'mdb-react-ui-kit';
import ApiCall from "./ApiCall";
import {useForm} from "react-hook-form";
import toastr from 'toastr';
import 'toastr/build/toastr.css';

export default function Login() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const {register, handleSubmit,trigger,watch, formState: {errors}} = useForm();
    const [passwordVisible,setPasswordVisible] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);


    function getUsers() {
        ApiCall({
            url: "/user", method: "get",
        }).then((res) => {
            setUsers(res.data);
        });
    }

    function mySubmit(data) {
        let obj = {
            email: data.email, password: data.password
        }
        axios({
            url: "/api/auth/login", method: "post", data: obj
        }).then((res) => {
            localStorage.setItem("user", res.data)
            let currentUser = users.filter(i => i.id === res.data)[0];
            let x = JSON.parse(localStorage.getItem("basket"));
            if (currentUser.role === "ROLE_ADMIN" || currentUser.role === "ROLE_SUPERADMIN") {
                navigate("/adminPage")
            } else if (currentUser.role === "ROLE_COOKER") {
                navigate("/oshpazPage")
            } else if (currentUser.role === "ROLE_CASHIER") {
                navigate("/cassirPage")
            } else if (currentUser.role === "ROLE_COURIER") {
                navigate("/dastavchikPage")
            } else {
                if (x) {
                    if (x === "" || x.length === 0) {
                        navigate("/")
                    } else {
                        navigate("/basket")
                    }
                } else {
                    navigate("/")
                }
            }
        }).catch((err) => {
            toastr.error("login or password is invalid")
        })
    }

    return (<MDBContainer fluid className="p-3 my-5 h-custom">
            <MDBRow>

                <MDBCol col='10' md='6'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                         className="img-fluid" alt="Sample image"/>
                </MDBCol>

                <MDBCol col='4' md='6'>

                    <div className="d-flex flex-row align-items-center justify-content-center">

                        <p className="lead fw-normal mb-0 me-3">Sign in with</p>

                        <MDBBtn floating size='md' tag='a' className='me-2'>
                            <MDBIcon fab icon='facebook-f'/>
                        </MDBBtn>

                        <MDBBtn floating size='md' tag='a' className='me-2'>
                            <MDBIcon fab icon='twitter'/>
                        </MDBBtn>

                        <MDBBtn floating size='md' tag='a' className='me-2'>
                            <MDBIcon fab icon='linkedin-in'/>
                        </MDBBtn>

                    </div>
                    <div className={"d-flex align-items-center"}>
                        <hr style={{width:"100%"}} className={"bg-red"}/>
                        <p className="text-center fw-bold mx-3 my-4">Or</p>
                        <hr style={{width:"100%"}}/>
                    </div>
                    <form id={"myForm"} onSubmit={handleSubmit(mySubmit)}>
                            <div className="">
                                <MDBInput
                                    maxLength={50}
                                    className={`w-100 ${errors.email?.message && !watch("email") ? " form-control is-invalid" : ""}`}
                                    {...register("email", {required: "Email is required"})}
                                    wrapperClass='mb-4' label='Email' id='formControlLg' type='tel' size="lg"
                                    onBlur={() => trigger("email")}
                                />
                            </div>


                            <div className={`position-relative flex-grow-1${errors.password?.message ? " is-invalid" : ""}`}>
                                <MDBInput
                                    className={`w-100${errors.password?.message && !watch("password") ? " form-control is-invalid" : ""}`}
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                    maxLength={20}
                                    type={passwordVisible ? 'text' : 'password'}
                                    onBlur={() => trigger("password")}
                                    wrapperClass='mb-4' label='Password' size="lg"
                                />
                                {
                                    !errors.password?.message || watch("password") ?
                                        <i
                                            style={{top:25}}
                                            className={`fa-solid fa-eye${passwordVisible ? "-slash" : ""} position-absolute end-0 translate-middle-y me-3 cursor-pointer`}
                                            onClick={() => setPasswordVisible(!passwordVisible)}
                                        ></i>:""
                                }
                            </div>
                    </form>

                    <div className="d-flex justify-content-between mb-4">
                        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me'/>
                        <a href="/login">Forgot password?</a>
                    </div>

                    <div className='text-center text-md-start mt-4 pt-2'>
                        <button form={"myForm"} className="btn btn-primary" style={{width:100}}>Login</button>
                        <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <Link to={"/signUp"}
                                                                                                 className="link-danger">Register</Link>
                        </p>
                    </div>

                </MDBCol>

            </MDBRow>

        </MDBContainer>
        // <div className='container my-5 d-flex justify-content-center'>
        //     <div className="col-4 card p-4">
        //         <h1>Login</h1>
        //         <form onSubmit={LoginUser}>
        //             <input className='form-control my-1' type="text" placeholder='email' />
        //             <input className='form-control my-1' type="password" placeholder='password' />
        //             <div className={"d-flex justify-content-between"}>
        //                 <button className="btn btn-dark my-1">Save</button>
        //                 <Link type={button} to={"/signUp"} className="btn btn-dark my-1">Signup</Link>
        //             </div>
        //         </form>
        //     </div>
        // </div>
    )
}
