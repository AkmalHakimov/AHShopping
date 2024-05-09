import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import apiCall from "../../pages/UserPage/ApiCall";
import ApiCall from "../../pages/UserPage/ApiCall";

const Header = ({searchVal, SearchFunc, basket}) => {

    const navigate = useNavigate()
    const location = useLocation()
    const [isAdmin, setIsAdmin] = useState(false)


    function goToBasket() {
        navigate("/basket")
    }

    useEffect(()=>{
        detectIfItAdmin()
    })

    function detectIfItAdmin() {
        ApiCall({
            url: "/user/me",
            method: "get"
        }).then(res => {
            let userId = localStorage.getItem("user")
            if(res.data.role==="ROLE_ADMIN" || res.data.role==="ROLE_SUPERADMIN"){
               setIsAdmin(true)
            }
        }).catch(err => {
            alert(err)
        })
    }

    return (
        <header style={{ backgroundColor: "#f8f9fa" }}>
            <div className="p-3 text-center bg-white border-bottom">
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <div className="logo">AH Shopping</div>

                        <div className="order-lg-last col-lg-5 col-sm-8 col-8">
                            <div className="d-flex float-end">
                                {
                                    !localStorage.getItem("user") ? (
                                        <div className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
                                            <i className="fas fa-user-alt m-1 me-md-2"></i>
                                            <Link to={"/login"} className="nav-link">Sign in</Link>
                                        </div>
                                    ) : location.pathname !== "/userProfile" ? (
                                        <div className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
                                            <i className="fa-solid fa-pen-to-square m-1 me-md-2"></i>
                                            <Link to={"/userProfile"} className="nav-link">My Orders</Link>
                                        </div>
                                    ) : (
                                        ""
                                    )
                                }


                                <Link to={"/wishlist"}
                                   className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
                                    <i className="fas fa-heart m-1 me-md-2"></i>
                                    <p className="d-none d-md-block mb-0">Wishlist</p>
                                </Link>
                                <a style={{cursor:"pointer"}} onClick={goToBasket}
                                   className="border rounded py-1 px-3 nav-link d-flex align-items-center"
                                   target="_blank">
                                    <i className="fas fa-shopping-cart m-1 me-md-2"></i>
                                    <p className="d-none d-md-block mb-0">My cart</p>
                                    {
                                        basket.length !== 0 ?
                                            <div className="length mx-1">{basket.length}</div> : ""
                                    }
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 w-100 my-3 col-md-12 col-12">
                        {
                            searchVal!==undefined?
                                <div className="q-100 d-flex">
                                    <div className="w-100 form-outline">
                                        <input style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}
                                               onChange={(e) => SearchFunc(e.target.value)}
                                               value={searchVal}
                                               placeholder={"search"} type="search" id="form1" className="form-control"/>
                                    </div>
                                    <button style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}} type="button"
                                            className="btn btn-primary shadow-0">
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>
                                :""
                        }
                    </div>
                </div>
            </div>

            <div className="bg-primary">
                <div className="container py-4">
                    <nav className="d-flex">
                        <h6 className="mb-0">
                            <a href="/" className="text-white-50 shopping-link">Home</a>
                            <span className="text-white-50 mx-2"> > </span>
                            {
                                isAdmin?
                                    <a href="/adminPage " className="text-white shopping-link">
                                        Admin Page
                                    </a>
                                    :
                                    <a href="/basket" className="text-white shopping-link">
                                        Shopping cart
                                    </a>
                            }

                        </h6>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header