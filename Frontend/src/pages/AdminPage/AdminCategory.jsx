import React, {useEffect, useState} from "react";
import Rodal from "rodal";
import "../Style/rodal.css"
import 'rodal/lib/rodal.css';
import ApiCall from "../UserPage/ApiCall";
import Header from "../../universalComponents/Header";
import toastr from "toastr";

export default function AdminCategory() {

  const[categories,setCategories] = useState([])
  const[modalVisible,setModalVisible] = useState(false)
  const [ctName,setCtName] = useState("")
  const [currentItem,setCurrentItem] = useState("")
  const [basket, setBasket] = useState([]);
  const[isAdmin,setIsAdmin] = useState(false)


  useEffect(()=>{
    getCategories()
    getMe()
    if (localStorage.getItem("basket") !== null) {
      setBasket(JSON.parse(localStorage.getItem("basket")))
    }
  },[])

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


  function getCategories(){
    ApiCall({
      url: "/category",
      method:"get"
    }).then(res=>{
      setCategories(res.data)
    })
  }

  function Save(){
    setModalVisible(false);
    if(!isAdmin){
      toastr.error('You do not have permission')
      return
    }
    if(currentItem===""){
      ApiCall({
        url: "/category",
        method:"post",
        data: {
          name:  ctName
        }
      }).then(res=>{
        getCategories()
      })
    }else {
      ApiCall({
        url: "/category/" + currentItem.id,
        method:"put",
        data: {
          name:  ctName
        }
      }).then(res=>{
        getCategories()
        setCurrentItem("")
      })
    }
    setCtName("")
  }

  function DelItm(id){
    if(!isAdmin){
      toastr.error('You do not have permission')
      return
    }
    ApiCall({
      url: "/category/" + id,
      method:"delete"
    }).then(res=>{
      getCategories()
    })
  }

  function EditItm(item){
    setModalVisible(true)
    setCtName(item.name)
    setCurrentItem(item)
  }
  return (
    <div className={"p-3"}>
      <Header
          basket={basket}
      />
      <div className="my-3 d-flex align-items-center justify-content-between">
      <h1>Categories</h1>
      <button onClick={()=>setModalVisible(true)} className="btn btn-dark"><i class="fa-sharp fa-solid fa-plus"></i></button>
      </div>
      <table className='table my-3'>
        <thead className='table table-dark'>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th >Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            categories.map((item,index)=>{
              return <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <button onClick={()=>DelItm(item.id)} className="btn btn-dark"><i className="fa-solid fa-trash"></i></button>
                  <button onClick={()=>EditItm(item)} className="btn btn-dark mx-3"><i className="fa-solid fa-pen-to-square"></i></button>
                  </td>
              </tr>
            })
          }
        </tbody>
      </table>
      <Rodal  visible={modalVisible} onClose={()=>setModalVisible(false)}>
          <div>
            <h3 className="my-3">Category</h3>
            <input value={ctName} onChange={(e)=>setCtName(e.target.value)} className="form-control my-4" type="text" placeholder="name..." />
            <button onClick={Save} className="btn btn-dark" >Save</button>
          </div>
        </Rodal>

    </div>
  )
}
