import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes, useNavigate} from "react-router-dom"
import Home from './pages/UserPage/Home';
import AdminProduct from './pages/AdminPage/AdminProduct';
import AdminCategory from './pages/AdminPage/AdminCategory';
import "./index.css"
import Basket from './pages/UserPage/Basket';
import Login from './pages/UserPage/Login';
import SignUp from './pages/UserPage/SignUp';
import ApiCall from "./pages/UserPage/ApiCall";
import {useEffect} from "react";
import {useState} from "react";
import {useLocation} from "react-router-dom";
import UserProfile from "./pages/UserPage/UserProfile";
import AdminPage from "./pages/AdminPage/AdminPage";
import OshpazPage from "./pages/UserPage/OshpazPage";
import CassirPage from "./pages/UserPage/CassirPage";
import DastavchikPage from "./pages/UserPage/DastavchikPage";
import ArchivedOrders from "./pages/AdminPage/ArchivedOrders";
import UnknownPage from "./pages/UnknownPage";
import Wishlist from "./pages/UserPage/Wishlist";
import NotFound from "./pages/404/NotFound";

function App() {

    const [user, setUser] = useState("")
    const location = useLocation()
    const navigate = useNavigate();

    let permissions = [
        {url: "/admin/product", role: "ROLE_ADMIN"},
        {url: "/admin/product", role: "ROLE_SUPERADMIN"},
        {url: "/admin/category", role: "ROLE_ADMIN"},
        {url: "/admin/category", role: "ROLE_SUPERADMIN"},
        {url: "/admin/order", role: "ROLE_ADMIN"},
        {url: "/admin/order", role: "ROLE_SUPERADMIN"},
        {url: "/adminPage", role: "ROLE_ADMIN"},
        {url: "/adminPage", role: "ROLE_SUPERADMIN"},
        {url: "/oshpazPage", role: "ROLE_COOKER"},
        {url: "/oshpazPage", role: "ROLE_SUPERADMIN"},
        {url: "/cassirPage", role: "ROLE_CASHIER"},
        {url: "/cassirPage", role: "ROLE_SUPERADMIN"},
        {url: "/dastavchikPage", role: "ROLE_COURIER"},
        {url: "/dastavchikPage", role: "ROLE_SUPERADMIN"},
        {url: "/archivedOrders", role: "ROLE_ADMIN"},
        {url: "/archivedOrders", role: "ROLE_SUPERADMIN"},
    ]

    function CheckFree() {
        let arr = []
        permissions.map(item => {
            if (item.url === location.pathname) {
                arr.push(item.role)
            }
        })
        if (arr.length === 0) {
            return ["FREE"]
        } else {
            return arr;
        }
    }

    useEffect(() => {
        ApiCall({
            url: "/user/me",
            method: "get"
        }).then((res) => {
            let user = res.data
            let permittedRoles = CheckFree();
            if (permittedRoles[0] !== "FREE") {
                if (user.role == null) {
                    navigate("/404")
                } else {
                    if (!permittedRoles.includes(user.role)) {
                        navigate("/404")
                    }
                }
            }
            setUser(res.data)
        })
    }, [location.pathname])
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home></Home>}></Route>
                <Route path='/admin/product' element={<AdminProduct></AdminProduct>}></Route>
                <Route path='/admin/category' element={<AdminCategory></AdminCategory>}></Route>
                <Route path='/basket' element={<Basket></Basket>}></Route>
                <Route path='/login' element={<Login></Login>}></Route>
                <Route path='/signUp' element={<SignUp></SignUp>}></Route>
                <Route path='/userProfile' element={<UserProfile></UserProfile>}></Route>
                <Route path='/adminPage' element={<AdminPage></AdminPage>}></Route>
                <Route path='/oshpazPage' element={<OshpazPage></OshpazPage>}></Route>
                <Route path='/cassirPage' element={<CassirPage></CassirPage>}></Route>
                <Route path='/dastavchikPage' element={<DastavchikPage></DastavchikPage>}></Route>
                <Route path='/archivedOrders' element={<ArchivedOrders></ArchivedOrders>}></Route>
                <Route path='/wishlist' element={<Wishlist></Wishlist>}></Route>
                <Route path='/404' element={<NotFound></NotFound>}></Route>
            </Routes>
        </div>
    );
}

export default App

