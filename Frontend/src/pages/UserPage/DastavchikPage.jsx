import React, {useEffect, useState} from 'react';
import ApiCall from "./ApiCall";

function DastavchikPage(props) {

    const [orders,setOrders] = useState([])

    useEffect(()=>{
        getOrders()
    },[])

    function getOrders(){
        ApiCall({
            url: "/order/status/completed",
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
            <h1>Courier</h1>

            <table className={"table my-4"}>
                <thead className={"table-dark"}>
                <tr>
                    <th>OrderId</th>
                    <th>OrderedTime</th>
                    <th>ProductName&Amount</th>
                    <th>PayType</th>
                    <th>Name</th>
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
                            <td>{item.payType}</td>
                            <td>{item.firstNameUser} {item.lastNameUser}</td>
                            <td>
                                <button onClick={()=>nextToAccepted(item.id,"DELIVERED")} className={"btn btn-primary"}>Delivered</button>
                            </td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

export default DastavchikPage;