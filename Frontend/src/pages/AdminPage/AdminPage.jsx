import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import ApiCall from "../UserPage/ApiCall";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import Header from "../../universalComponents/Header";
import toastr from "toastr";

function AdminPage(props) {

    const [ordersCreated, setOrdersCreated] = useState([])
    const [ordersAccepted, setOrdersAccepted] = useState([])
    const [ordersInprogress, setOrdersInprogress] = useState([])
    const [ordersCompleted, setOrdersCompleted] = useState([])
    const [ordersDelivered, setOrdersDelivered] = useState([])
    const [users, setUsers] = useState([])
    const [selectedBtn, setSelectedBtn] = useState("")
    const [selectedBtnMain, setSelectedBtnMain] = useState("")
    const [sumCash, setSumCash] = useState("")
    const [sumClick, setSumClick] = useState("")
    const [sumPayme, setSumPayme] = useState("")
    const [dataProducts, setDataProducts] = useState([])
    const [dataUsers, setDataUsers] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [editUser,setEditUser ] = useState("")
    const [email,setEmail ] = useState("")
    const [password,setPassword ] = useState("")
    const [select,setSelect ] = useState("")
    const [fileSize,setFileSize ] = useState("")
    const [basket, setBasket] = useState([]);
    const navigate = useNavigate()
    const[isAdmin,setIsAdmin] = useState(false)

    const roles = [
        {value: "ROLE_COOKER"},
        {value: "ROLE_CASHIER"},
        {value: "ROLE_COURIER"},
        {value: "ROLE_USER"},
        {value: "ROLE_ADMIN"},
    ]


    useEffect(() => {
        getOrdersCreated()
        getOrdersAccepted()
        getOrdersInprogress()
        getOrdersCompleted()
        getOrdersDelivered()
        getPayTypeSumForCash()
        getPayTypeSumForClick()
        getPayTypeSumForPayme()
        getDataOfProducts()
        getDataOfUsers()
        getUsers()
        getSize()
        getMe()
        if (localStorage.getItem("selectedBtn") !== null) {
            setSelectedBtn(localStorage.getItem("selectedBtn"))
        }
        if (localStorage.getItem("selectedBtnMain") !== null) {
            setSelectedBtnMain(localStorage.getItem("selectedBtnMain"))
        }
        if (localStorage.getItem("basket") !== null) {
            setBasket(JSON.parse(localStorage.getItem("basket")))
        }
    }, [])

    function getOrdersCreated() {
        ApiCall({
            url: "/order/status/created",
            method: "get"
        }).then((res) => {
            setOrdersCreated(res.data)
        })
    }

    function getOrdersAccepted() {
        ApiCall({
            url: "/order/status/accepted",
            method: "get"
        }).then((res) => {
            setOrdersAccepted(res.data)
        })
    }

    function getOrdersInprogress() {
        ApiCall({
            url: "/order/status/inprogress",
            method: "get"
        }).then((res) => {
            setOrdersInprogress(res.data)
        })
    }

    function getOrdersCompleted() {
        ApiCall({
            url: "/order/status/completed",
            method: "get"
        }).then((res) => {
            setOrdersCompleted(res.data)
        })
    }

    function getOrdersDelivered() {
        ApiCall({
            url: "/order/status/delivered",
            method: "get"
        }).then((res) => {
            setOrdersDelivered(res.data)
        })
    }

    function nextToAccepted(orderId, status) {
        if(!isAdmin){
            toastr.error('You do not have permission')
            return
        }
        ApiCall({
            url: "/order?orderId=" + orderId + "&status=" + status,
            method: "put",
        }).then((res) => {
            getOrdersCreated()
            getOrdersAccepted()
            getOrdersDelivered()
        });
    }

    function handleClik(btn) {
        if (btn !== "") {
            setSelectedBtn(btn)
        }
        if(btn === "products"){
            navigate("/admin/product")
        }
        if(btn === "categories"){
            navigate("/admin/category")
        }
        localStorage.setItem("selectedBtn", btn);
    }

    function getPayTypeSumForCash() {
        ApiCall({
            url: "/payment?payType=CASH",
            method: "get"
        }).then(res => {
            setSumCash(res.data);
        })
    }

    function getPayTypeSumForClick() {
        ApiCall({
            url: "/payment?payType=CLICK",
            method: "get"
        }).then(res => {
            setSumClick(res.data)
        })
    }

    function getPayTypeSumForPayme() {
        ApiCall({
            url: "/payment?payType=PAYME",
            method: "get"
        }).then(res => {
            setSumPayme(res.data)
        })
    }

    function getDataOfProducts() {
        ApiCall({
            url: "/order/orderProduct",
            method: "get"
        }).then(res => {
            setDataProducts(res.data)
        })
    }

    function getDataOfUsers() {
        ApiCall({
            url: "/user/data",
            method: "get"
        }).then(res => {
            setDataUsers(res.data)
        }).catch(err => {
            alert(err)
        })
    }

    function handleClickMain(btn) {
        if (btn !== "") {
            setSelectedBtnMain(btn)
        }
        localStorage.setItem("selectedBtnMain", btn);
    }

    function getUsers(){
        ApiCall({
            url: "/user/adminUser",
            method: "get"
        }).then(res => {
            setUsers(res.data)
        })
    }

    function EditeItm(item) {
        setEditUser(item.id)
        setModalVisible(true)
        setEmail(item.email)
        setSelect(item.role)
    }

    function getMe(){
        ApiCall({
            url: "/user/me",
            method: "get"
        }).then((res) => {
            if(res.data.role==="ROLE_SUPERADMIN"){
                setIsAdmin(true)
            }
        })
    }

    function handleSubmit() {
        if(!isAdmin){
            toastr.error('You do not have permission')
            return
        }
        let obj = {
            email: email,
            password: password,
            role: select
        }
        ApiCall({
            url: "/user?userId=" + editUser,
            method: "put",
            data: obj
        }).then(res => {
            getUsers();
            setModalVisible(false)
            setSelect("")
            setEmail("")
            setPassword("")
        }).catch(err=>{
            alert("sizga bunga ruxsat yoq!")
            setModalVisible(false)
            setSelect("")
            setEmail("")
            setPassword("")
        })
    }

    function getSize() {
        ApiCall({
            url: "/file/size",
            method: "get"
        }).then(res => {
            setFileSize(res.data)
        })
    }

    function removeAttachment() {
        ApiCall({
            url: "/file",
            method: "delete"
        }).then(res => {
            getSize()
        })
    }

    function LogOut() {
        localStorage.removeItem("user")
        navigate("/login")
    }

    return (
        <div>
            <Header
                basket={basket}
            />
            <div className={"parent"}>

                <div className={"left-bar"}>
                    <button onClick={() => handleClik("main")}
                            className={"btn-outline-dark btn w-100 my-2" + (selectedBtn === "main" ? " bg-dark text-white" : "")}>Main
                    </button>
                    <button onClick={() => handleClik("order")}
                            className={"btn-outline-dark btn w-100 my-2" + (selectedBtn === "order" ? " bg-dark text-white" : "")}>Orders
                    </button>
                    <button onClick={() => handleClik("user")}
                            className={"btn-outline-dark btn w-100 my-2" + (selectedBtn === "user" ? " bg-dark text-white" : "")}>Users
                    </button>
                    <button onClick={() => handleClik("products")}
                            className={"btn-outline-dark btn w-100 my-2" + (selectedBtn === "products" ? " bg-dark text-white" : "")}>Products
                    </button>
                    <button onClick={() => handleClik("categories")}
                            className={"btn-outline-dark btn w-100 my-2" + (selectedBtn === "categories" ? " bg-dark text-white" : "")}>Categories
                    </button>
                    <button onClick={removeAttachment}
                            className={"btn-outline-dark btn w-100 my-2"}>removeAttachments({fileSize}kB)
                    </button>
                    <div className={"my-2"} style={{width: "100%"}}>
                        <Link to={"/archivedOrders"} style={{width: "100%"}} className={"btn btn-outline-dark"}>Archived
                            Orders</Link>
                    </div>
                    <div className={"my-2"} style={{width: "100%"}}>
                        <Link to={"/login"} style={{marginTop:"90px"}} onClick={LogOut} className={"w-100 btn btn-danger"}>
                            LogOut
                        </Link>
                    </div>
                </div>
                {
                    selectedBtn === "order" ?
                        <div className={"right-bar1"}>
                            <div className={"box"}>
                                <h2>Created</h2>
                                {
                                    ordersCreated.map((item, index) => {
                                        return <div key={index} className={"box-child"}>
                                            <div className={"d-flex gap-1"}>
                                                <div>
                                                    <h3>
                                                        Order time:
                                                    </h3>
                                                    <p>{item.orderedDate.substring(0,19)}</p>
                                                </div>
                                                <h3>{item.id}</h3>
                                            </div>
                                            <div>
                                                <p>{item.firstNameUser} {item.lastNameUser}</p>
                                            </div>
                                            <div>
                                                <h4>Products</h4>
                                                <div>
                                                    {
                                                        item.orderProducts.map((item1, index1) => {
                                                            return <div key={index1} className={"d-flex"}>
                                                                <p>Name: {item1.productName} ||</p>
                                                                <p> {item1.amount}</p>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className={"d-flex gap-3 align-items-center"}>
                                                <h5>Payment Type: {item.payType}</h5>
                                                <button onClick={() => nextToAccepted(item.id, "ACCEPTED")}
                                                        className={"btn btn-primary"}><i
                                                    className="fa-solid fa-forward"></i></button>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            <div className={"box"}>
                                <h2>Accepted</h2>
                                {
                                    ordersAccepted.map((item, index) => {
                                        return <div key={index} className={"box-child"}>
                                            <div className={"d-flex gap-3"}>
                                                <div>
                                                    <h4>
                                                        Order time:
                                                    </h4>

                                                        <p>
                                                            {item.orderedDate.substring(0,10)} {item.orderedDate.substring(11,19)}</p>
                                                </div>

                                                <h3>{item.id}</h3>
                                            </div>
                                            <div>
                                                <p>{item.firstNameUser} {item.lastNameUser}</p>
                                            </div>
                                            <div>
                                                <h4>Products</h4>
                                                <div>
                                                    {
                                                        item.orderProducts.map((item1, index1) => {
                                                            return <div key={index1} className={"d-flex"}>
                                                                <p>Name: {item1.productName} ||</p>
                                                                <p>{item1.amount}</p>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className={"d-flex gap-3 align-items-center"}>
                                                <h5>Payment Type: {item.payType}</h5>
                                            </div>
                                            <div style={{width: "100%"}}>
                                                <Link style={{width: "100%"}} to={"/login"}
                                                      className={"btn btn-primary"}>Cooker</Link>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            <div className={"box"}>
                                <h2>Inprogress</h2>
                                {
                                    ordersInprogress.map((item, index) => {
                                        return <div key={index} className={"box-child"}>
                                            <div className={"d-flex gap-3"}>
                                                <div>
                                                    <h3>
                                                        Order time:
                                                    </h3>
                                                    <p>{item.orderedDate.substring(0,10)} {item.orderedDate.substring(11,19)}</p>
                                                </div>
                                                <h3>{item.id}</h3>
                                            </div>
                                            <div>
                                                <p>{item.firstNameUser} {item.lastNameUser}</p>
                                            </div>
                                            <div>
                                                <h4>Products</h4>
                                                <div>
                                                    {
                                                        item.orderProducts.map((item1, index1) => {
                                                            return <div key={index1} className={"d-flex"}>
                                                                <p>Name: {item1.productName} ||</p>
                                                                <p> {item1.amount}</p>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className={"d-flex gap-3 align-items-center"}>
                                                <h5>Payment Type: {item.payType}</h5>
                                            </div>
                                            <div style={{width: "100%"}}>
                                                <Link style={{width: "100%"}} to={"/login"}
                                                      className={"btn btn-primary"}>Cashier</Link>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            <div className={"box"}>
                                <h2>Completed</h2>
                                {
                                    ordersCompleted.map((item, index) => {
                                        return <div key={index} className={"box-child"}>
                                            <div className={"d-flex gap-3"}>
                                                <div>
                                                    <h3>
                                                        Order time:
                                                    </h3>
                                                    <p>{item.orderedDate.substring(0,10)} {item.orderedDate.substring(11,19)}</p>
                                                </div>
                                                <h3>{item.id}</h3>
                                            </div>
                                            <div>
                                                <p>{item.firstNameUser} {item.lastNameUser}</p>
                                            </div>
                                            <div>
                                                <h4>Products</h4>
                                                <div>
                                                    {
                                                        item.orderProducts.map((item1, index1) => {
                                                            return <div key={index1} className={"d-flex"}>
                                                                <p>Name: {item1.productName} ||</p>
                                                                <p> {item1.amount}</p>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className={"d-flex gap-3 align-items-center"}>
                                                <h5>Payment Type: {item.payType}</h5>
                                            </div>
                                            <Link to={"/login"} className={"btn btn-primary w-100"}>Courier</Link>
                                        </div>
                                    })
                                }
                            </div>
                            <div className={"box"}>
                                <h2>Delivered</h2>
                                {
                                    ordersDelivered.map((item, index) => {
                                        return <div key={index} className={"box-child"}>
                                            <div className={"d-flex gap-3"}>
                                                <div>
                                                    <h3>
                                                        Order time:
                                                    </h3>
                                                    <p>{item.orderedDate.substring(0,10)} {item.orderedDate.substring(11,19)}</p>
                                                </div>
                                                <h3>{item.id}</h3>
                                            </div>
                                            <div>
                                                <p>{item.firstNameUser} {item.lastNameUser}</p>
                                            </div>
                                            <div>
                                                <h4>Products</h4>
                                                <div>
                                                    {
                                                        item.orderProducts.map((item1, index1) => {
                                                            return <div key={index1} className={"d-flex"}>
                                                                <p>Name: {item1.productName} ||</p>
                                                                <p> {item1.amount}</p>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className={"d-flex gap-3 align-items-center"}>
                                                <h5>Payment Type: {item.payType}</h5>
                                            </div>
                                            <button onClick={() => nextToAccepted(item.id, "ARCHIVED")}
                                                    className={"btn btn-primary w-100"}>Archive
                                            </button>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        : selectedBtn === "main" ?
                            <div className={"right-bar_main"}>
                                <div className={"top"}>
                                    <div className={"top-child"}>
                                        <h3 className={"text-center"}>CASH</h3>
                                        <h5 className={"text-center my-3"}>Total Income: {sumCash? sumCash : "0"}$</h5>
                                    </div>
                                    <div className={"top-child"}>
                                        <h3 className={"text-center"}>CLICK</h3>
                                        <h5 className={"text-center my-3"}>Total Income: {sumClick? sumClick : "0"}$</h5>
                                    </div>
                                    <div className={"top-child"}>
                                        <h3 className={"text-center"}>PAYME</h3>
                                        <h5 className={"text-center my-3"}>Total Income: {sumPayme? sumPayme : "0"}$</h5>
                                    </div>
                                </div>
                                <div>
                                    <div className={"d-flex gap-3 align-items-center my-1"}>
                                        <button onClick={() => handleClickMain("product")}
                                                className={"btn btn-outline-dark" + (selectedBtnMain === "product" ? " bg-dark text-white" : "")}>Products
                                        </button>
                                        <button onClick={() => handleClickMain("client")}
                                                className={"btn btn-outline-dark" + (selectedBtnMain === "client" ? " bg-dark text-white" : "")}>Clients
                                        </button>
                                    </div>
                                    <div className={"bottom-adminpage"}>
                                        {
                                            selectedBtnMain === "product" ?
                                                <table className={"table"}>
                                                    <thead className={"table-primary"}>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Price</th>
                                                        <th>Count Total Prepared</th>
                                                        <th>Order Frequency</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        dataProducts.map((item, index) => {
                                                            return <tr key={index}>
                                                                <td>{item.productName}</td>
                                                                <td>{item.productPrice}</td>
                                                                <td>{item.countTotalPrepared}</td>
                                                                <td>{item.countAttendedOrder}</td>
                                                            </tr>
                                                        })
                                                    }
                                                    </tbody>
                                                </table> :
                                                <table className={"table"}>
                                                    <thead className={"table-primary"}>
                                                    <tr>
                                                        <th>firstName</th>
                                                        <th>lastName</th>
                                                        <th>sumCash</th>
                                                        <th>sumClick</th>
                                                        <th>sumPayme</th>
                                                        <th>countOrder</th>
                                                        <th>lastOrderedDate</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        dataUsers.map((item, index) => {
                                                            return <tr key={index}>
                                                                <td>{item.firstName}</td>
                                                                <td>{item.lastName}</td>
                                                                <td>{item.sumCash}$</td>
                                                                <td>{item.sumPayme}$</td>
                                                                <td>{item.sumClick}$</td>
                                                                <td>{item.countOrder}</td>
                                                                <td>{item.lastOrderedDate.substring(0,19)}</td>
                                                            </tr>
                                                        })
                                                    }
                                                    </tbody>
                                                </table>
                                        }


                                    </div>
                                </div>

                            </div>
                            :
                            selectedBtn==="user" ?
                                <div className={"right-bar-user"}>
                                    <h1>Users</h1>
                                    <table className={"table"}>
                                        <thead className={"table-dark"}>
                                        <tr>
                                            <th>FirstName</th>
                                            <th>LastName</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            users.map((item,index)=>{
                                                return <tr key={index}>
                                                    <td>{item.firstName}</td>
                                                    <td>{item.lastName}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.role}</td>
                                                    <td>
                                                        <button onClick={()=>EditeItm(item)} className={"btn btn-warning"}><i
                                                            className="fa-solid fa-pen-to-square"></i></button>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                        </tbody>
                                    </table>

                                </div>
                                : ""
                }
                <Rodal height={250} visible={modalVisible} onClose={()=>setModalVisible(false)}>
                    <div>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} className={"form-control my-4"} type="text" placeholder={"email.."}/>
                        <input value={password} onChange={(e)=>setPassword(e.target.value)} className={"form-control my-3"} type="text" placeholder={"password..."}/>
                        <select defaultChecked={""} value={select} onChange={(e)=>setSelect(e.target.value)} className={"form-select"} defaultValue={""}>
                            <option value={""} disabled={true} >Select role</option>
                            {
                                roles.map((item,index)=>{
                                    return <option value={item.value} key={index}>
                                        {item.value}
                                    </option>
                                })
                            }
                        </select>
                        <button onClick={handleSubmit} className={"btn btn-warning my-2"} style={{marginLeft:"310px"}}>Edite</button>
                    </div>
                </Rodal>

            </div>
        </div>
    );
}

export default AdminPage;