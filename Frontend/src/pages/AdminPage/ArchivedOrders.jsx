import React, {useEffect, useState} from 'react';
import ApiCall from "../UserPage/ApiCall";
import Header from "../../universalComponents/Header";

function ArchivedOrders(props) {

    const [orders,setOrders] = useState([])
    const [basket, setBasket] = useState([]);


    useEffect(()=>{
        getOrders()
        if (localStorage.getItem("basket") !== null) {
            setBasket(JSON.parse(localStorage.getItem("basket")))
        }
    },[])

    function getOrders(){
        ApiCall({
            url: "/order/status/archived",
            method: "get"
        }).then((res)=>{
            setOrders(res.data)
        })
    }
    return (
        <div className={"p-3"}>
            <Header
                basket={basket}
            />
            <h1>ArchivedOrders</h1>
            <table className={"table my-4"}>
                <thead className={"table-dark"}>
                <tr>
                    <th>OrderId</th>
                    <th>OrderedTime</th>
                    <th>Name</th>
                    <th>ProductName&Amount</th>
                    <th>PayType</th>
                </tr>
                </thead>
                <tbody>
                {
                    orders.map((item,index)=>{
                        return <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.orderedDate.substring(0,10)} {item.orderedDate.substring(11,19)}</td>
                            <td>{item.firstNameUser} {item.lastNameUser}</td>
                            <td>{
                                item.orderProducts.map((item1, index2)=>{
                                    return <div key={index2}>
                                        {item1.productName} || {item1.amount}
                                    </div>
                                })
                            }</td>
                            <td>{item.payType}</td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

export default ArchivedOrders;