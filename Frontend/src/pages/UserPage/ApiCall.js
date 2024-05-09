import axios from "axios";

export default ({url,method,data})=>{
   return  axios({
        baseURL: "/api",
        url: url,
        method: method,
        data: data,
        headers: {
            "token" : localStorage.getItem("user")
        }
    })
}