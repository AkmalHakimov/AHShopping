import React from 'react';
import "./style.css"

function Index(props) {
    return (
        <div>
            <header>
                <div className="p-3 text-center bg-white border-bottom">
                    <div className="container">
                        <div className="d-flex justify-content-between">
                            <div className="col-lg-2 col-sm-4 col-4">
                                <a href="https://mdbootstrap.com/" target="_blank" className="float-start">
                                    <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png"
                                         height="35"/>
                                </a>
                            </div>

                            <div className="order-lg-last col-lg-5 col-sm-8 col-8">
                                <div className="d-flex float-end">
                                    <a href="https://github.com/mdbootstrap/bootstrap-material-design"
                                       className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                                       target="_blank">
                                        <i className="fas fa-user-alt m-1 me-md-2"></i>
                                        <p className="d-none d-md-block mb-0">Sign in</p>
                                    </a>
                                    <a href="https://github.com/mdbootstrap/bootstrap-material-design"
                                       className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                                       target="_blank">
                                        <i className="fas fa-heart m-1 me-md-2"></i>
                                        <p className="d-none d-md-block mb-0">Wishlist</p>
                                    </a>
                                    <a href="https://github.com/mdbootstrap/bootstrap-material-design"
                                       className="border rounded py-1 px-3 nav-link d-flex align-items-center"
                                       target="_blank">
                                        <i className="fas fa-shopping-cart m-1 me-md-2"></i>
                                        <p className="d-none d-md-block mb-0">My cart</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 w-100 my-3 col-md-12 col-12">
                            <div className="q-100 d-flex">
                                <div className="w-100 form-outline">
                                    <input style={{borderTopRightRadius:0,borderBottomRightRadius:0}} placeholder={"search"} type="search" id="form1" className="form-control"/>
                                </div>
                                <button style={{borderTopLeftRadius:0,borderBottomLeftRadius:0}} type="button" className="btn btn-primary shadow-0">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-primary">
                    <div className="container py-4">
                        <nav className="d-flex">
                            <h6 className="mb-0">
                                <a href="" className="text-white-50">Home</a>
                                <span className="text-white-50 mx-2"> > </span>
                                <a href="" className="text-white"><u>Shopping cart</u></a>
                            </h6>
                        </nav>
                    </div>
                </div>
            </header>

            {/*<section className="bg-light my-5">*/}
            {/*    <div className="container">*/}
            {/*        <div className="row">*/}
            {/*            <div className="col-lg-9">*/}
            {/*                <div className="card border shadow-0">*/}
            {/*                    <div className="m-4">*/}
            {/*                        <h4 className="card-title mb-4">Your shopping cart</h4>*/}
            {/*                        <div className="row gy-3 mb-4">*/}
            {/*                            <div className="col-lg-5">*/}
            {/*                                <div className="me-lg-5">*/}
            {/*                                    <div className="d-flex">*/}
            {/*                                        <img*/}
            {/*                                            src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/11.webp"*/}
            {/*                                            className="border rounded me-3"*/}
            {/*                                            style={{ width: '96px', height: '96px' }}*/}
            {/*                                        />*/}
            {/*                                        <div className="">*/}
            {/*                                            <a href="#" className="nav-link">Winter jacket for men and*/}
            {/*                                                lady</a>*/}
            {/*                                            <p className="text-muted">Yellow, Jeans</p>*/}
            {/*                                        </div>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                            <div*/}
            {/*                                className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">*/}
            {/*                                <div className="">*/}
            {/*                                    <select style={{width: "100px"}} className="form-select me-4">*/}
            {/*                                        <option>1</option>*/}
            {/*                                        <option>2</option>*/}
            {/*                                        <option>3</option>*/}
            {/*                                        <option>4</option>*/}
            {/*                                    </select>*/}
            {/*                                </div>*/}
            {/*                                <div className="">*/}
            {/*                                    <h6 className="h6">$1156.00</h6>*/}
            {/*                                    <br/>*/}
            {/*                                    <small className="text-muted text-nowrap"> $460.00 / per item </small>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                            <div*/}
            {/*                                className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">*/}
            {/*                                <div className="float-md-end">*/}
            {/*                                    <a href="#!" className="btn btn-light border px-2 icon-hover-primary"><i*/}
            {/*                                        className="fas fa-heart fa-lg px-1 text-secondary"></i></a>*/}
            {/*                                    <a href="#"*/}
            {/*                                       className="btn btn-light border text-danger icon-hover-danger"> Remove</a>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}

            {/*                        <div className="row gy-3 mb-4">*/}
            {/*                            <div className="col-lg-5">*/}
            {/*                                <div className="me-lg-5">*/}
            {/*                                    <div className="d-flex">*/}
            {/*                                        <img*/}
            {/*                                            src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/12.webp"*/}
            {/*                                            className="border rounded me-3"*/}
            {/*                                            style={{width: "96px", height: "96px"}}/>*/}
            {/*                                        <div className="">*/}
            {/*                                            <a href="#" className="nav-link">Mens T-shirt Cotton Base</a>*/}
            {/*                                            <p className="text-muted">Blue, Medium</p>*/}
            {/*                                        </div>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                            <div*/}
            {/*                                className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">*/}
            {/*                                <div className="">*/}
            {/*                                    <select style={{width: "100px"}} className="form-select me-4">*/}
            {/*                                        <option>1</option>*/}
            {/*                                        <option>2</option>*/}
            {/*                                        <option>3</option>*/}
            {/*                                        <option>4</option>*/}
            {/*                                    </select>*/}
            {/*                                </div>*/}
            {/*                                <div className="">*/}
            {/*                                    <h6 className="h6">$44.80</h6>*/}
            {/*                                    <br/>*/}
            {/*                                    <small className="text-muted text-nowrap"> $12.20 / per item </small>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                            <div*/}
            {/*                                className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">*/}
            {/*                                <div className="float-md-end">*/}
            {/*                                    <a href="#!" className="btn btn-light border px-2 icon-hover-primary"><i*/}
            {/*                                        className="fas fa-heart fa-lg px-1 text-secondary"></i></a>*/}
            {/*                                    <a href="#"*/}
            {/*                                       className="btn btn-light border text-danger icon-hover-danger"> Remove</a>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}

            {/*                        <div className="row gy-3">*/}
            {/*                            <div className="col-lg-5">*/}
            {/*                                <div className="me-lg-5">*/}
            {/*                                    <div className="d-flex">*/}
            {/*                                        <img*/}
            {/*                                            src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/13.webp"*/}
            {/*                                            className="border rounded me-3"*/}
            {/*                                            style={{width: "96px", height: "96px"}}/>*/}
            {/*                                        <div className="">*/}
            {/*                                            <a href="#" className="nav-link">Blazer Suit Dress Jacket for*/}
            {/*                                                Men</a>*/}
            {/*                                            <p className="text-muted">XL size, Jeans, Blue</p>*/}
            {/*                                        </div>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                            <div*/}
            {/*                                className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">*/}
            {/*                                <div className="">*/}
            {/*                                    <select style={{width: "100px"}} className="form-select me-4">*/}
            {/*                                        <option>1</option>*/}
            {/*                                        <option>2</option>*/}
            {/*                                        <option>3</option>*/}
            {/*                                        <option>4</option>*/}
            {/*                                    </select>*/}
            {/*                                </div>*/}
            {/*                                <div className="">*/}
            {/*                                    <h6 className="h6">$1156.00</h6>*/}
            {/*                                    <br/>*/}
            {/*                                    <small className="text-muted text-nowrap"> $460.00 / per item </small>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                            <div*/}
            {/*                                className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">*/}
            {/*                                <div className="float-md-end">*/}
            {/*                                    <a href="#!" className="btn btn-light border px-2 icon-hover-primary"><i*/}
            {/*                                        className="fas fa-heart fa-lg px-1 text-secondary"></i></a>*/}
            {/*                                    <a href="#"*/}
            {/*                                       className="btn btn-light border text-danger icon-hover-danger"> Remove</a>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}

            {/*                    <div className="border-top pt-4 mx-4 mb-4">*/}
            {/*                        <p><i className="fas fa-truck text-muted fa-lg"></i> Free Delivery within 1-2 weeks*/}
            {/*                        </p>*/}
            {/*                        <p className="text-muted">*/}
            {/*                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor*/}
            {/*                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis*/}
            {/*                            nostrud exercitation ullamco laboris nisi ut*/}
            {/*                            aliquip*/}
            {/*                        </p>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="col-lg-3">*/}
            {/*                <div className="card mb-3 border shadow-0">*/}
            {/*                    <div className="card-body">*/}
            {/*                        <form>*/}
            {/*                            <div className="form-group">*/}
            {/*                                <label className="form-label">Have coupon?</label>*/}
            {/*                                <div className="input-group">*/}
            {/*                                    <input type="text" className="form-control border" name=""*/}
            {/*                                           placeholder="Coupon code"/>*/}
            {/*                                    <button className="btn btn-light border">Apply</button>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </form>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="card shadow-0 border">*/}
            {/*                    <div className="card-body">*/}
            {/*                        <div className="d-flex justify-content-between">*/}
            {/*                            <p className="mb-2">Total price:</p>*/}
            {/*                            <p className="mb-2">$329.00</p>*/}
            {/*                        </div>*/}
            {/*                        <div className="d-flex justify-content-between">*/}
            {/*                            <p className="mb-2">Discount:</p>*/}
            {/*                            <p className="mb-2 text-success">-$60.00</p>*/}
            {/*                        </div>*/}
            {/*                        <div className="d-flex justify-content-between">*/}
            {/*                            <p className="mb-2">TAX:</p>*/}
            {/*                            <p className="mb-2">$14.00</p>*/}
            {/*                        </div>*/}
            {/*                        <hr/>*/}
            {/*                        <div className="d-flex justify-content-between">*/}
            {/*                            <p className="mb-2">Total price:</p>*/}
            {/*                            <p className="mb-2 fw-bold">$283.00</p>*/}
            {/*                        </div>*/}

            {/*                        <div className="mt-3">*/}
            {/*                            <a href="#" className="btn btn-success w-100 shadow-0 mb-2"> Make Purchase </a>*/}
            {/*                            <a href="#" className="btn btn-light w-100 border mt-2"> Back to shop </a>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
            <section>
                <div className="container my-5">
                    <header className="mb-4">
                        <h3>Recommended items</h3>
                    </header>

                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="card px-4 border shadow-0 mb-4 mb-lg-0">
                                <div className="mask px-2" style={{height: "50px"}}>
                                    <div className="d-flex justify-content-between">
                                        <h6><span className="badge bg-danger pt-1 mt-3 ms-2">New</span></h6>
                                        <a href="#"><i
                                            className="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i></a>
                                    </div>
                                </div>
                                <a href="#" className="">
                                    <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/7.webp"
                                         className="card-img-top rounded-2"/>
                                </a>
                                <div className="card-body d-flex flex-column pt-3 border-top">
                                    <a href="#" className="nav-link">Gaming Headset with Mic</a>
                                    <div className="price-wrap mb-2">
                                        <strong className="">$18.95</strong>
                                        <del className="">$24.99</del>
                                    </div>
                                    <hr style={{margin:0}}/>
                                    <div className="d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                        <a href="#" className="btn btn-outline-primary w-100">Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="card px-4 border shadow-0 mb-4 mb-lg-0">
                                <div className="mask px-2" style={{height: "50px"}}>
                                    <a href="#"><i
                                        className="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i></a>
                                </div>
                                <a href="#" className="">
                                    <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/5.webp"
                                         className="card-img-top rounded-2"/>
                                </a>
                                <div className="card-body d-flex flex-column pt-3 border-top">
                                    <a href="#" className="nav-link">Apple Watch Series 1 Sport </a>
                                    <div className="price-wrap mb-2">
                                        <strong className="">$120.00</strong>
                                    </div>
                                    <hr style={{margin:0}}/>
                                    <div className="d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                        <a href="#" className="btn btn-outline-primary w-100">Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="card px-4 border shadow-0">
                                <div className="mask px-2" style={{height: "50px"}}>
                                    <a href="#"><i
                                        className="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i></a>
                                </div>
                                <a href="#" className="">
                                    <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/9.webp"
                                         className="card-img-top rounded-2"/>
                                </a>
                                <div className="card-body d-flex flex-column pt-3 border-top">
                                    <a href="#" className="nav-link">Men's Denim Jeans Shorts</a>
                                    <div className="price-wrap mb-2">
                                        <strong className="">$80.50</strong>
                                    </div>
                                    <hr style={{margin:0}}/>
                                    <div className="d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                        <a href="#" className="btn btn-outline-primary w-100">Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="card px-4 border shadow-0">
                                <div className="mask px-2" style={{height: "50px"}}>
                                    <a href="#"><i
                                        className="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i></a>
                                </div>
                                <a href="#" className="">
                                    <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp"
                                         className="card-img-top rounded-2"/>
                                </a>
                                <div className="card-body d-flex flex-column pt-3 border-top">
                                    <a href="#" className="nav-link">Mens T-shirt Cotton Base Layer Slim fit </a>
                                    <div className="price-wrap mb-2">
                                        <strong className="">$13.90</strong>
                                    </div>
                                    <hr style={{margin:0}}/>
                                    <div className="d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                        <a href="#" className="btn btn-outline-primary w-100">Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="text-center text-lg-start text-muted bg-primary mt-3">
                <section className="">
                    <div className="container text-center text-md-start pt-4 pb-4">
                        <div className="row mt-3">
                            <div className="col-12 col-lg-3 col-sm-12 mb-2">
                                <a href="https://mdbootstrap.com/" target="_blank" className="text-white h2">
                                    MDB
                                </a>
                                <p className="mt-1 text-white">
                                    © 2023 Copyright: MDBootstrap.com
                                </p>
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
        </div>
    )
        ;
}

export default Index;
