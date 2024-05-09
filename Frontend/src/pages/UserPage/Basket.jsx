import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import button from "bootstrap/js/src/button";
import ApiCall from "./ApiCall";
import toastr from 'toastr';
import 'toastr/build/toastr.css';

export default function Basket() {

    const [basket,setBasket] = useState([])
    const [currentUser,setCurrentUser] = useState("")
    const [modalVisible,setModalVisible] = useState(false)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem("basket")!==null){
            setBasket(JSON.parse(localStorage.getItem("basket")))
        }
        if(localStorage.getItem("user")!==null){
            setCurrentUser(localStorage.getItem("user"))
        }
    },[])

    function Increment(id){
      let x = basket.filter(i=>i.id===id)[0]
      x.amount++
      setBasket([...basket])
      SaveToLocal(basket);
    }

    function Decrement(id){
      let x = basket.filter(i=>i.id===id)[0]
      if(x.amount!==1){
        x.amount--
      }
      setBasket([...basket])
      SaveToLocal(basket);
    }
    function SaveToLocal(basket){
      localStorage.setItem("basket",JSON.stringify(basket))
    }

    function Total(){
      let s = 0;
      basket.map(i=>{
        s += i.amount*i.price
      })
      return s
    }
    function Rasmiylashtirish(){
        let form = document.getElementById("myForm")
        let radioButton = form.elements.fav_language.value;
        if(radioButton===""){
            toastr.error('check pay_type!')
            return;
        }
                let myArr =basket.map(item=>{
                    return {productId: item.id,amount: item.amount}
                })
            let obj = {
                    amount: Total(),
                payType: radioButton,
                reqOrderProducts: myArr
            }
            ApiCall({
                url: "/order",
                method: "post",
                data: obj
            }).then((res) => {
                alert("successful")
                navigate("/")
                localStorage.removeItem('basket');
            });
    }

    function delItm(id) {
            let arr = basket.filter(i=>i.id!==id)
        setBasket(arr)
        SaveToLocal(arr)
    }

    function OpenModal() {
        if(localStorage.getItem("user")!==null){
            setModalVisible(true)
        }else {
            alert("Birinchi login qiling")
            navigate("/login")
        }
    }

    return (
    <div className="container my-4">
        {
            basket.length!==0?
                <section className="bg-light my-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="card border shadow-0 p-3">
                                    <h4 className="card-title mb-4">Your shopping cart</h4>
                                    <div className="m-4">
                                        {
                                            basket.map((item,index)=>{
                                                return<div key={index} className="row gy-3 mb-4">
                                                    <div className="col-lg-3">
                                                        <div className="me-lg-5">
                                                            <div className="d-flex">
                                                                <img
                                                                    src={"/api/file/getFile/" + item.photoId}
                                                                    className="border rounded me-3"
                                                                    style={{ width: '96px', height: '96px' }}
                                                                />
                                                                <div className="">
                                                                    <a href="#" className="nav-link">{item.name}</a>
                                                                    <p className="text-muted">{item.description}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                                                        <div className="d-flex align-items-center mx-5    gap-2">
                                                            <button onClick={()=>Increment(item.id)} className="btn btn-outline-primary">+</button>
                                                            <h3>{item.amount}</h3>
                                                            <button onClick={()=>Decrement(item.id)} className="btn btn-outline-primary">-</button>
                                                        </div>
                                                        <div className="">
                                                            <h6 className="h6">${item.price*item.amount}.00</h6>
                                                            <br/>
                                                            <small className="text-muted text-nowrap"> ${item.price}.00 / per item </small>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                                        <div className="float-md-end">
                                                            <a className="btn btn-light border px-2 icon-hover-primary"><i
                                                                className="fas fa-heart fa-lg px-1 text-secondary"></i></a>
                                                            <a  onClick={()=>delItm(item.id)}
                                                                className="btn btn-light border text-danger icon-hover-danger"> Remove</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>

                                    <div className="border-top pt-4 mx-4 mb-4">
                                        <p><i className="fas fa-truck text-muted fa-lg"></i> Free Delivery within 1-2 weeks
                                        </p>
                                        <p className="text-muted">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                            nostrud exercitation ullamco laboris nisi ut
                                            aliquip
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="card mb-3 border shadow-0">
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group">
                                                <label className="form-label">Have coupon?</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control border" name=""
                                                           placeholder="Coupon code"/>
                                                    <button className="btn btn-light border">Apply</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="card shadow-0 border">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-2">Total price:</p>
                                            <p className="mb-2 fw-bold">${Total()}.00</p>
                                        </div>

                                        <div className="mt-3">
                                            <a onClick={OpenModal} href="#" className="btn btn-success w-100 shadow-0 mb-2"> Make Purchase </a>
                                            <a href="/" className="btn btn-light w-100 border mt-2"> Back to shop </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <div className={"d-flex align-items-center justify-content-center"}>
                    <div>
                        <h4 className={"text-center"}>Your Cart is currently empty!</h4>
                        <p>Start with the collections on the home page or find the product you need by searching</p>
                        <div className={"d-flex justify-content-center"}>
                            <Link to={"/"} className={"btn btn-dark"}>Home</Link>
                        </div>
                    </div>
                </div>
        }

        <Rodal height={localStorage.getItem("user")===null ? 600 : 450} visible={modalVisible} onClose={()=>setModalVisible(false)}>
            <div className="p-4 bg-white rounded">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Please select your payment method:</h4>
                        <form id="myForm" className="d-flex flex-column gap-2">
                            <div className="form-check">
                                <input type="radio" id="PAYME" name="fav_language" value="PAYME" className="form-check-input"/>
                                <label htmlFor="PAYME" className="form-check-label">PAYME</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" id="CLICK" name="fav_language" value="CLICK" className="form-check-input"/>
                                <label htmlFor="CLICK" className="form-check-label">CLICK</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" id="CASH" name="fav_language" value="CASH" className="form-check-input"/>
                                <label htmlFor="CASH" className="form-check-label">CASH</label>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="card my-4">
                    <div className="card-body d-flex bg-light">
                        <h3 className="card-title mb-0">Total Sum:</h3>
                        <p style={{marginTop:3,marginLeft:10,fontSize:20}} className="">${Total()}.00</p>
                    </div>

                </div>
                <button onClick={Rasmiylashtirish} className="w-100 btn btn-dark">Done</button>
            </div>
        </Rodal>

    </div>
  );
}
