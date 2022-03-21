import React, { useState } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { useParams } from 'react-router'
import './forms.css'

function Update(){

        const [name,setName]=useState('')
        const [quantity,setQuantity]=useState('')
        const {id}=useParams()
        const [status,setStatus]=useState('')
        console.log(id)
        var history=useHistory()
    
    
        const handleNameChange=(e)=>{
            setName(e.target.value)
            console.log(e.target.value)
        }
        const handleQuantityChange=(e)=>{
            setQuantity(e.target.value)
            console.log(e.target.value)
        }
        const handleStatus=(e)=>{
            setStatus(e.target.value)
            console.log(e.target.value)
        }
    
        const submit=(event)=>{
            console.log(name,quantity,status)
            event.preventDefault()
            const payload={
                id:id,
                orderName:name,
                orderQuantity:quantity,
                orderStatus:status

            }
        
            axios({
                url:'http://localhost:9000/update',
                method:"POST",
                data:payload,
                // headers:{'Access-Control-Allow-Origin': '*'  }
            })
            .then((res)=>{
                
                history.push('/login')
            })
            .catch(()=>{console.log('internal error')})
    
    
        }
        
            return(
                <div className="col-md-5">
                    <form  onSubmit={submit} >
                        <div className="form-outline mb-4">
                            <label className="form-label">Order name :</label>
                            <input className="form-control" type="text" name="orderName"  onChange={handleNameChange} placeholder="order item"  />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label">order Status</label>
                            <select className="form-control" type="string" name="order Status" onChange={handleStatus} placeholder="order status">
                                <option value="conformed">conformed</option>
                                <option value="dispatched">dispatched</option>
                                <option value="out_for_delivery">out for delivery</option>
                            </select>
                        </div>
                       
                        <div className="form-outline mb-4">
                            <label className="form-label">Order Quantity :</label>
                            <input className="form-control" type="number" name="orderQuantity" onChange={handleQuantityChange} placeholder="order quantity"  />
                        </div>
                       
                        <div>
                            <button style={{"width":"50%","display":"flex","justifyContent":"center","marginLeft":"25%"}} className="btn btn-primary" type="submit" >Update order</button>
                            
                        </div>
                    </form>
                </div> 
            )
        }
        
    
    
  


export default Update