import React, {useEffect, useState} from "react";
import Rodal from "rodal";
import "../Style/rodal.css"
import 'rodal/lib/rodal.css';
import Pic from "../AdminPage/media/uploadPic.jpg"
import ApiCall from "../UserPage/ApiCall";
import Header from "../../universalComponents/Header";
import toastr from 'toastr';
import 'toastr/build/toastr.css';

export default function AdminProduct() {

    const[products,setProducts] = useState([])
    const[categories,setCategories] = useState([])
  const[modalVisible,setModalVisible] = useState(false)
  const[isAdmin,setIsAdmin] = useState(false)
  const [currentItem,setCurrentItem] = useState("")
  const [hasImg,setHasImg] = useState("")
    const [basket, setBasket] = useState([]);


  useEffect(()=>{
    getProducts()
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

  function handlePhoto(e){
    let formData = new FormData
    formData.append("file",e.target.files[0])
    formData.append("prefix","/Images/productImages")
      ApiCall({
        url: "/file/upload",
        method:"post",
        data:formData
      }).then(res=>{
        setHasImg(res.data)
      })
  }


  function getProducts(){
    ApiCall({
      url: "/product",
      method:"get"
    }).then(res=>{
      setProducts(res.data)
    })
  }

  function handleSubmit(e){
      e.preventDefault()
      if(!isAdmin){
          toastr.error('You do not have permission')
          return
      }
    let obj = {
        photoId: hasImg,
        name: e.target[1].value,
        categoryId: e.target[4].value,
        price: e.target[2].value,
        description: e.target[3].value
    }
    if(currentItem===""){
        ApiCall({
        url: "/product",
        method:"post",
        data: obj
      }).then(res=>{
        getProducts()
      })
    }else {
        ApiCall({
        url: "/product/" + currentItem.id,
        method:"put",
        data:obj 
      }).then(res=>{
        getProducts()
        setCurrentItem("")
      })
    }
    document.forms[0].reset()
    setHasImg("")
  }

  function DelItm(id){
      if(!isAdmin){
          toastr.error('You do not have permission')
          return
      }
      ApiCall({
      url: "/product/" + id,
      method:"delete"
    }).then(res=>{
      getProducts()
    })
  }

  function EditItm(item){
      if(!isAdmin){
          toastr.error('You do not have permission')
          return
      }
    setModalVisible(true)
    setCurrentItem(item)
    let form = document.forms[0]
    form[1].value = item.name
    form[2].value = item.price
    form[3].value = item.description
    form[4].value = item.categoryId
    setHasImg(item.photoId)
  }
  return (
    <div className="p-3">
        <Header
            basket={basket}
        />
        <div className="my-2 d-flex align-items-center justify-content-between">
      <h1>Products</h1>
      <button onClick={()=>setModalVisible(true)} className="btn btn-dark"><i className="fa-sharp fa-solid fa-plus"></i></button>
      </div>
      <table className='table my-3'>
        <thead className='table table-dark'>
          <tr>
            <th>Photo</th>
            <th>Id</th>
            <th>Name</th>
            <th>CategoryName</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((item,index)=>{
              return <tr key={index}>
                <td><img width={100} height={50} src={"http://localhost:8080/api/file/getFile/" + item.photoId} /></td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{categories.length!==0? categories.filter(i=>i.id==item.categoryId)[0].name : ""}</td>
                <td>{item.price}$</td>
                <td>{item.description}</td>
                <td>
                  <button onClick={()=>DelItm(item.id)} className="btn btn-dark"><i className="fa-solid fa-trash"></i></button>
                  <button onClick={()=>EditItm(item)} className="btn btn-dark mx-3"><i className="fa-solid fa-pen-to-square"></i></button>
                  </td>
              </tr>
            })
          }
        </tbody>
      </table>
      <Rodal height={480} visible={modalVisible} onClose={()=>setModalVisible(false)}>
          <div>
            <h3 className="my-3">Product</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <input onChange={(e)=>handlePhoto(e)} type="file" className="visually-hidden" />
                    {
                        hasImg ?
                                <img style={{marginLeft: 130}} width={100} height={100} src={"http://localhost:8080/api/file/getFile/" + hasImg} />
                        :
                            <div>
                                <img style={{marginLeft: 130}} width={100} height={100} src={Pic} />
                            </div>
                    }
                </label>
            <input className="form-control my-3" type="text" placeholder="name..." />
            <input className="form-control my-3" type="text" placeholder="price..." />
            <input className="form-control my-3" type="text" placeholder="description..." />
            <select className="form-select my-3" defaultValue={""}>
                <option value="" disabled={true}>Choose an option</option>
                {
                    categories.map((item,index)=>{
                        return (
                            <option key={index} value={item.id}>{item.name}</option>
                        )
                    })
                }
            </select>
            <button style={{marginLeft: "310px"}} onClick={()=>setModalVisible(false)} className="btn btn-dark" >Save</button>
            </form>
          </div>
        </Rodal>

    </div>
  )
}
