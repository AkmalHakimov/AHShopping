import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import ApiCall from "./ApiCall";

function OshpazPage(props) {

        const [orders,setOrders] = useState([])

        useEffect(()=>{
            getOrders()
        },[])

        function getOrders(){
            ApiCall({
                url: "/order/status/accepted",
                method: "get"
            }).then((res)=>{
                setOrders(res.data)
            })
        }

        function nextToAccepted(orderId,status) {
            ApiCall({
                url: "/order?orderId="+orderId + "&status=" + status,
                method: "put",
            }).then((res) => {
                if(res.data!==""){
                    alert(res.data)
                }
                getOrders()
            });
        }
    return (
        <div className={"container my-4"}>
            <h1>Cooker</h1>

            <table className={"table"}>
                <thead className={"table-dark"}>
                <tr>
                    <th>OrderId</th>
                    <th>OrderedTime</th>
                    <th>ProductName&Amount</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    orders.map((item,index)=>{
                        return <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.orderedDate}</td>
                            <td>{
                                item.orderProducts.map(item1=>{
                                    return <div key={item1.id}>
                                        {item1.productName} || {item1.amount}
                                    </div>
                                })
                            }</td>
                            <td>
                                <button onClick={()=>nextToAccepted(item.id,"INPROGRESS")} className={"btn btn-primary"}>Done</button>
                            </td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

export default OshpazPage;