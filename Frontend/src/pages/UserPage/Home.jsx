import React, {useEffect, useState} from "react";
import "rodal/lib/rodal.css";
import ApiCall from "./ApiCall";
import apiCall from "./ApiCall";
import Header from "../../universalComponents/Header";

function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [basket, setBasket] = useState([]);
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState("")

    useEffect(() => {
        getProducts(search);
        getCategories();
        getUsers()
        if (localStorage.getItem("basket") !== null) {
            setBasket(JSON.parse(localStorage.getItem("basket")))
        }
        if (localStorage.getItem("user") !== null) {
            setCurrentUser(localStorage.getItem("user"))
        }
    }, []);

    useEffect(() => {
        getProducts(search);
        getCategories();
        getUsers()
        if (localStorage.getItem("basket") !== null) {
            setBasket(JSON.parse(localStorage.getItem("basket")))
        }
    }, [search]);

    function getUsers() {
        ApiCall({
            url: "/user",
            method: "get",
        }).then((res) => {
            setUsers(res.data);
        });
    }

    function getProducts() {
        ApiCall({
            url: "/product?search=" + search,
            method: "get",
        }).then((res) => {
            setProducts(res.data);
        });
    }

    function getCategories() {
        ApiCall({
            url: "/category",
            method: "get",
        }).then((res) => {
            setCategories(res.data);
        });
    }

    function Search(value) {
        setSearch(value);
        getProducts(value);
    }
    function AddToBasket(item) {
        basket.push({...item, amount: 1})
        setBasket([...basket])
        SaveToLocal(basket)
    }

    function Delete(item) {
        let arr = basket.filter(i => i.id !== item.id)
        setBasket(arr)
        SaveToLocal(arr)
    }

    function SaveToLocal(basket) {
        localStorage.setItem("basket", JSON.stringify(basket))
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

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
        return () => {
            // Clean up by removing the scroll event listener
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        // Show the button when scrolled down, and hide it when at the top
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div>
            <Header
            searchVal={search}
            SearchFunc={Search}
            basket = {basket}
            />
            {
                products.length==0?
                    <h1 className="text-center my-5 text-muted">No Items found</h1>
                    :
                    <div>
                        {categories.map((item) => {
                            return (
                                <div key={item.id} className="container my-4">
                                    {
                                        products.filter((i2) => i2.categoryId === item.id).length === 0 ?
                                            "" : <h1 className="category-title">{item.name}</h1>
                                    }
                                    <div className="d-flex flex-wrap gap-5">

                                        {products
                                            .filter((i) => i.categoryId === item.id)
                                            .map((item1, index) => {
                                                return (
                                                    <div key={index} className="col-lg-3 col-md-6 col-sm-6">
                                                        <div className="card px-4 border shadow-0 mb-4 mb-lg-0">
                                                            <div className="mask px-2" style={{height: "50px"}}>
                                                                <div className="d-flex justify-content-between">
                                                                    <h6><span className="badge bg-danger pt-1 mt-3 ms-2">New</span></h6>
                                                                    <a style={{cursor: "pointer"}} onClick={()=>changeWishlist(item1.id,item1.wishlist)}>
                                                                        {
                                                                            item1.wishlist?
                                                                                <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i>
                                                                                :
                                                                                <i className="far fa-heart text-primary fa-lg float-end pt-3 m-2"></i>
                                                                        }
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <a className="image-link">
                                                                <img
                                                                    src={"/api/file/getFile/" + item1.photoId}
                                                                    className="card-img-top rounded-2"
                                                                    alt={""}
                                                                />
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
                                                );
                                            })}
                                    </div>

                                </div>
                            );
                        })}
                    </div>
            }
            <footer className="text-center text-lg-start text-muted bg-primary mt-3">
                <section className="">
                    <div className="container text-center text-md-start pt-4 pb-4">
                        <div className="row mt-3">
                            <div className="col-12 col-lg-3 col-sm-12 mb-2">
                                <p className="mt-1 text-white">
                                    © 2023 Copyright: Uzum-Market.com
                                </p>
                                <div className="logo">AH Shopping</div>
                            </div>

                            <div className="col-6 col-sm-4 col-lg-2">
                                <h6 className="text-uppercase text-white fw-bold mb-2">
                                    Store
                                </h6>
                                <ul className="list-unstyled mb-4">
                                    <li><a className="text-white-50" href="#">About us</a></li>
                                    <li><a className="text-white-50" href="#">Find store</a></li>
                                    <li><a className="text-white-50" href="#">Categories</a></li>
                                    <li><a className="text-white-50" href="#">Blogs</a></li>
                                </ul>
                            </div>

                            <div className="col-6 col-sm-4 col-lg-2">
                                <h6 className="text-uppercase text-white fw-bold mb-2">
                                    Information
                                </h6>
                                <ul className="list-unstyled mb-4">
                                    <li><a className="text-white-50" href="#">Help center</a></li>
                                    <li><a className="text-white-50" href="#">Money refund</a></li>
                                    <li><a className="text-white-50" href="#">Shipping info</a></li>
                                    <li><a className="text-white-50" href="#">Refunds</a></li>
                                </ul>
                            </div>

                            <div className="col-6 col-sm-4 col-lg-2">
                                <h6 className="text-uppercase text-white fw-bold mb-2">
                                    Support
                                </h6>
                                <ul className="list-unstyled mb-4">
                                    <li><a className="text-white-50" href="#">Help center</a></li>
                                    <li><a className="text-white-50" href="#">Documents</a></li>
                                    <li><a className="text-white-50" href="#">Account restore</a></li>
                                    <li><a className="text-white-50" href="#">My orders</a></li>
                                </ul>
                            </div>

                            <div className="col-12 col-sm-12 col-lg-3">
                                <h6 className="text-uppercase text-white fw-bold mb-2">Newsletter</h6>
                                <p className="text-white">Stay in touch with latest updates about our products and
                                    offers</p>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control border" placeholder="Email"
                                           aria-label="Email" aria-describedby="button-addon2"/>
                                    <button className="btn btn-light border shadow-0" type="button" id="button-addon2"
                                            data-mdb-ripple-color="dark">
                                        Join
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="">
                    <div className="container">
                        <div className="d-flex justify-content-between py-4 border-top">
                            <div>
                                <i className="fab fa-lg fa-cc-visa text-white"></i>
                                <i className="fab fa-lg fa-cc-amex text-white"></i>
                                <i className="fab fa-lg fa-cc-mastercard text-white"></i>
                                <i className="fab fa-lg fa-cc-paypal text-white"></i>
                            </div>

                            <div className="dropdown dropup">
                                <a className="dropdown-toggle text-white" href="#" id="Dropdown" role="button"
                                   data-mdb-toggle="dropdown" aria-expanded="false"> <i
                                    className="flag-united-kingdom flag m-0 me-1"></i>English </a>

                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="Dropdown">
                                    <li>
                                        <a className="dropdown-item" href="#"><i
                                            className="flag-united-kingdom flag"></i>English <i
                                            className="fa fa-check text-success ms-2"></i></a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i className="flag-poland flag"></i>Polski</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i
                                            className="flag-china flag"></i>中文</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i className="flag-japan flag"></i>日本語</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i
                                            className="flag-germany flag"></i>Deutsch</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i
                                            className="flag-france flag"></i>Français</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i className="flag-spain flag"></i>Español</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i
                                            className="flag-russia flag"></i>Русский</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i
                                            className="flag-portugal flag"></i>Português</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <button
                className={`btn btn-danger btn-rounded btn-floating btn-lg scroll-to-top-button ${isVisible ? 'visible' : ''}`}
                onClick={scrollToTop}
            >
                <i className="fas fa-arrow-up"></i>
            </button>
        </div>
    );
}

export default Home;
