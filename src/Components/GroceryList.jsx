import React, { useEffect, useState } from 'react'
import axios from "axios"
export default function GroceryList() {
    const [formData,setFormData]=React.useState({
        name:"",
        qty:"",
        price:"",
        description:"",
        image:"",
        true:true
    })

    const [groceryData,setGroceryData]=useState(null)
    const [edit,setEdit]=useState(true)

    const handleChange=(e)=>{
        console.log("e", e.target.value);
        const {id,value,type}=e.target
        setFormData({
            ...formData,
            [id]:value
        })
    }
    const  handlepostGrocery = (e)=>{
        e.preventDefault()
        console.log(formData);
        if(formData.name.length<=2 || typeof(formData.qty)!== Number || formData.price==="" ){
            return 
        }
         axios.post(`http://localhost:3001/grocerylis`,formData)
            .then((res)=>{
                console.log(res);
                getGorceryList()

            })
            .catch((err)=>{
               console.log(err); 
            })
    }

    const getGorceryList=()=>{
       axios.get(`http://localhost:3001/grocerylis`)
        .then((res)=>{
            // console.log(res);
            setGroceryData(res.data)
            setFormData({
                name:"",
                qty:"",
                price:"",
                description:"",
                image:"",
                true:true
            })
            // console.log(groceryData);
        })
        .catch((err)=>{
            console.log(err);
        })
      
    }

    useEffect(()=>{
        getGorceryList()
    },[])

    const handleDelete=(id)=>{
        axios.delete(`http://localhost:3001/grocerylis/${id}`)
        .then((res)=>{
            getGorceryList()
        })
        .catch((err)=>{
            console.log(err);
        })

    }
    const editText=(id,name,qty,price,description,image)=>{
        console.log(name,qty,price,description,image);
       let a= groceryData.map((items)=> {
           if(items.id === id){
               
             for(let key in items){
                 console.log(key)
                 if(items[key] === true){
                     items[key]=false
                 }
             }
             
             return items
        }else{
            return items
        }
    }
       )
       console.log(a);
       setGroceryData(a)
        setFormData({
            name:name,
            qty:qty,
            price:price,
            description:description,
            image:image,
            true:false
        })
        // id && setEdit(false)

    }

    const handleEditSubmit=({id,name,qty,price})=>{
        if(name.length<=2 || typeof(qty)!== Number || price==="" ){
            return 
        }
        axios.put(`http://localhost:3001/grocerylis/${id}`,formData)
        .then((res)=>{
            console.log(res);
            getGorceryList()

        })
        .catch((err)=>{
            console.log(err);
        })
        // console.log(id);

    }
    const {name,qty,price,description,image}=formData
  return (
    <div>
        <div>
        <form onSubmit={handlepostGrocery}>
            <input type="text" onChange={handleChange} placeholder="Item" id='name' value={name}/> <br /> <br />
            <input type="text" onChange={handleChange} placeholder="Qty" id='qty' value={qty}/><br /> <br />
            <input type="Number" onChange={handleChange} placeholder="Price" id='price' value={price}/><br /> <br />
            <input type="text" onChange={handleChange} placeholder="Description" id='description' value={description}/><br /> <br />
            <input type="file" onChange={handleChange} placeholder="Image" id='image' value={image}/> <br /> <br />
            <button type='submit'>Submit</button>
        </form>
        </div>
        <div>
            {
            groceryData ? 
            <div>
                {
                    groceryData.map((items)=> <div key={items.id}>
                        <span>Name:- {items.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>Qty:- {items.qty}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>Price:- {items.price}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>Description:- {items.description}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>{items.image}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={()=>handleDelete(items.id)} >Delete</button>
                        {

                        items.true ?<button onClick={()=>editText(items.id,items.name,items.qty,items.price,items.description,items.image)}>Edite</button> :
                        <button onClick={()=>handleEditSubmit(items)}>Save</button>
                        }
                    </div>)
                }
            </div> 
            :
            <div>
aa
            </div>
            }
        </div>
    </div>
  )
}
// Create a grocery list application
// use axios and json server
// a user should be able to add grocery name, qty, price, description, image ( use base64 or url )
// a user can add a new one, delete
// for modifying, on clicking edit, a user should be able to see a popup or modal and see the info there
// when a user lands on the page, use componentDidMount
// create pagination
// use componentDidUpdate to see if the page number has changed and make a request to get new data for the page based on page number