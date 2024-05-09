import React, {useEffect, useState} from 'react';
import ApiCall from "./ApiCall";
import {Link, useNavigate} from "react-router-dom";
import Header from "../../universalComponents/Header";
function UserProfile(props) {


    const [orders,setOrders] = useState([])
    const [orderProducts,setOrderProducts] = useState([])
    const [users,setUsers] = useState([])
    const [modal,setModal] = useState(false)
    const navigate = useNavigate()
    const [selectedButton,setSelectedButton] = useState(false)
    const [basket, setBasket] = useState([])

    useEffect(()=>{
        getOrders()
        getUsers()
        if (localStorage.getItem("basket") !== null) {
            setBasket(JSON.parse(localStorage.getItem("basket")))
        }
    },[])

    function getOrders(){
        ApiCall({
            url: "/order/orderUser",
            method: "get"
        }).then((res)=>{
            setOrders(res.data)
        })
    }

    function getUsers(){
        ApiCall({
            url: "/user",
            method: "get",
        }).then((res) => {
            setUsers(res.data);
        });
    }

    function LogOut() {
        localStorage.removeItem("user")
        navigate("/login")
    }

    function openModal() {
        setModal(true)
        setSelectedButton(true)
    }

    return (
        <div>
            <Header
                basket={basket}
            />
            <div className={"parent"}>
                <div className={"left-bar"}>
                    <div className={"buttons"}>
                        <button onClick={openModal} className={"w-100 btn btn-outline-dark my-2" + (selectedButton ? " bg-dark text-white" : "")}>
                            MyOrders
                        </button>
                        <Link to={"/"} onClick={()=>setModal(true)} className={"w-100 btn btn-outline-dark my-2"}>
                            Home
                        </Link>
                        <button style={{marginTop:"350px"}} onClick={LogOut} className={"w-100 btn btn-danger"}>
                            LogOut
                        </button>
                    </div>
                </div>
                {
                    modal ?
                        <div className={"right-bar"}>
                            <h3 className={"my-4 number "}>Number of orders: {orders.length}</h3>
                            {
                                orders.map((item,index)=>{
                                    return <div  key={index} className={"content"}>
                                        <div style={{width:250}} >
                                            <p className={"number"} style={{width:170,marginRight:0}}>Ordered Date: {item.orderedDate.substring(0,10)} </p>
                                            <p className={"number"} style={{width:170,marginRight:0}}>Ordered Time: {item.orderedDate.substring(11,16)} </p>
                                            <p className={"number"} style={{width:170,marginRight:0,opacity:1}}>Current Status: {item.status } </p>
                                        </div>
                                        <div className={"separator"}></div>
                                        <table className={"table mx-3"}>
                                            <thead className={"table-dark"}>
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Price</th>
                                                <th>Amount</th>
                                                <th>Total Price</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                item.orderProducts.map((item1,index1)=>{
                                                    return <tr key={index1}>
                                                        <td>{item1.productName}</td>
                                                        <td>{item1.price}$</td>
                                                        <td>{item1.amount}</td>
                                                        <td>{item1.price * item1.amount}$</td>
                                                    </tr>
                                                })

                                            }
                                            </tbody>
                                        </table>

                                    </div>
                                })
                            }
                        </div> :""
                }
            </div>
        </div>

    );
}

export default UserProfile;