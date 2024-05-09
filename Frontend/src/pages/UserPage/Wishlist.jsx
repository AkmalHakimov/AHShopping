import React, {useEffect, useState} from 'react';
import Header from "../../universalComponents/Header";
import apiCall from "./ApiCall";
import ApiCall from "./ApiCall";

function Wishlist(props) {

    const [basket, setBasket] = useState([])
    const [products,setProducts] = useState([])
    const [search,setSearch] = useState("")

    useEffect(() => {
        getProducts()
        if (localStorage.getItem("basket") !== null) {
            setBasket(JSON.parse(localStorage.getItem("basket")))
        }
    }, [search])

    function getProducts(){
        ApiCall({
            url: "/product?search=" + search,
            method: "get",
        }).then((res) => {
            setProducts(res.data);
        });
    }

    function Delete(item) {
        let arr = basket.filter(i => i.id !== item.id)
        setBasket(arr)
        SaveToLocal(arr)
    }

    function SaveToLocal(basket) {
        localStorage.setItem("basket", JSON.stringify(basket))
    }

    function AddToBasket(item) {
        basket.push({...item, amount: 1})
        setBasket([...basket])
        SaveToLocal(basket)
    }

    function changeWishlist(productId,wishlist){
        apiCall({
            url:"/product/wishlist/" + productId,
            method:"put",
            data:{
                wishlist:!wishlist
            }
        }).then((res)=>{
            getProducts()
        })
    }

    function Search(value) {
        setSearch(value);
        getProducts(value);
    }
    return (
        <div>
            <Header
                searchVal={search}
                SearchFunc={Search}
                basket={basket}
            />
            {
                products.filter(item=>item.wishlist).length===0?
                    <h1 className="text-center my-5 text-muted">No Items found</h1>
                    :
                    <div className={"container my-3"}>
                        <h1>Wishlist</h1>
                        <div className="d-flex flex-wrap gap-5">
                            {
                                products.filter(item=>item.wishlist).map((item1,index)=>{
                                    return (
                                        <div key={index} className="col-lg-3 col-md-6 col-sm-6">
                                            <div className="card px-4 border shadow-0 mb-4 mb-lg-0">
                                                <div className="mask px-2" style={{height: "50px"}}>
                                                    <div className="d-flex justify-content-between">
                                                        <h6><span className="badge bg-danger pt-1 mt-3 ms-2">New</span></h6>
                                                        <a onClick={()=>changeWishlist(item1.id,item1.wishlist)} href="#">
                                                            {
                                                                item1.wishlist?
                                                                    <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i>
                                                                    :
                                                                    <i className="far fa-heart text-primary fa-lg float-end pt-3 m-2"></i>
                                                            }
                                                        </a>
                                                    </div>
                                                </div>
                                                <a className="">
                                                    <img  src={"/api/file/getFile/" + item1.photoId}
                                                          className="card-img-top rounded-2" alt={""}/>
                                                </a>
                                                <div className="card-body d-flex flex-column pt-3 border-top">
                                                    <a className="nav-link">{item1.name}</a>
                                                    <div className="price-wrap mb-2">
                                                        <strong className="">{item1.price}</strong>
                                                        <del className="">$24.99</del>
                                                    </div>
                                                    <hr style={{margin:0}}/>
                                                    <div className="d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                                        {basket.filter(item2 => item2.id === item1.id).length !== 0 ?
                                                            <button onClick={() => Delete(item1)}
                                                                    className="btn btn-outline-danger w-100">
                                                                Remove
                                                            </button>
                                                            :
                                                            <button onClick={() => AddToBasket(item1)}
                                                                    className="btn btn-outline-primary w-100">
                                                                Add to cart
                                                            </button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
            }

        </div>
    );
}

export default Wishlist;