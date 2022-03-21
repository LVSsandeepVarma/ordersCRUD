import React, { useState } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { useParams } from 'react-router'
import './forms.css'

function Create(){
    const {id}=useParams()
    const [name,setName]=useState('')
    const [quantity,setQuantity]=useState('')
    const [date,setDate]=useState('')
    const [status,setStatus]=useState('')
    var history=useHistory()


    const handleNameChange=(e)=>{
        setName(e.target.value)
        console.log(e.target.value)
    }
    const handleQuantityChange=(e)=>{
        setQuantity(e.target.value)
        console.log(e.target.value)
    }
    const handleDateChange=(e)=>{
        console.log(e.target.value)
        setDate(e.target.value)
    }
    const handleStatus=(e)=>{
        console.log(e.target.value)
        setStatus(e.target.value)
    }

    const submit=(event)=>{
        event.preventDefault()
        const payload={
            orderName:name,
            orderQuantity:quantity,
            orderDate:date,
            orderStatus:status,
            userid:id
        }


        axios({
            url:'http://localhost:9000/placeorder',
            method:"POST",
            data:payload,
            // headers:{'Access-Control-Allow-Origin': '*'  }
        })
        .then((res)=>{
            history.push(`/orders/${id}`)
        })
        .catch(()=>{console.log('internal error')})


    }
        return(
            <div className="col-md-5" >
                <form  onSubmit={submit} >
                    <div className="form-outline mb-4">
                        <label className="form-label">Order name :</label>
                        <input className="form-control" type="text" name="orderName"  onChange={handleNameChange} placeholder="order item"  />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label" >Order Quantity :</label>
                        <input className="form-control" type="number" name="orderQuantity" onChange={handleQuantityChange} placeholder="order quantity"  />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label" >order Status</label>
                        <select className="form-control" type="string" name="order Status" onChange={handleStatus}>
                            <option  value="conformed">conformed</option>
                            <option value="dispatched">dispatched</option>
                            <option value="out for delivery">out for delivery</option>
                        </select>
                    </div>
                    
                    <div className="form-outline mb-4">
                        <label className="form-label" >Order Date :</label>
                        <input className="form-control" type="date" name="orderDate" onChange={handleDateChange}  />
                    </div>
                    
                    <div>
                        <button style={{"width":"50%","display":"flex","justifyContent":"center","marginLeft":"25%"}} className="btn btn-primary" type="submit" >"Place order</button>
                        
                    </div>
                </form>
            </div> 
        )
    }
    


export default Create