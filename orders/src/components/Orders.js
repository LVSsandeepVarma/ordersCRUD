import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Order from './orderslist'
import { useHistory } from 'react-router'
import { useParams } from 'react-router'
import './orders.css'


// cors({
    
//     exposedHeaders:{'Access-Control-Allow-Origin':'*'} 
//   })
  


function Orders(){
    const history=useHistory()
    const [orders,setOrders]=useState([])
    const {id}=useParams()
    useEffect(()=>{
        console.log("component did mount")
        axios({
            url:'http://localhost:9000/orderslist/'+id,
            method:"GET",
            
        })
        .then(res=>{
            setTimeout(() => {
                setOrders(Object.values(res.data))
                console.log('timeout',orders)
            }, 100);
        })
        .catch(err=>{console.log(err)})
    
    },[])
    const handleCreate=()=>{
        history.push(`/create/${id}`)
    }
        return(
            <div>
                <h1>Your Orders</h1>
                <button type="submit" onClick={handleCreate}>Add Orders</button>
                <form>
                    
                    <table style={{"width":"100%"}}>
                        <tr>
                            <td><b>orderName </b></td>
                            <td><b>orderQuantity </b></td>
                            <td><b>orderDate </b></td>
                            <td><b>orderStatus </b></td>
                            <td><b>update</b></td>
                            <td><b>Delete</b></td>
                        </tr>
                    {Object.values(orders).map((value)=>{
                        return(
                        
                            <Order  id={value._id}
                                    orderName={value.orderName}
                                    orderQuantity={value.orderQuantity} 
                                    orderDate={value.orderDate} 
                                    orderStatus={value.orderStatus}
                                    userId={id}
                            />                            
                        )
                    })}
                    </table>
                </form>
            </div>
        )
    
}



export default Orders