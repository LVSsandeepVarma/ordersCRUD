import React from "react"
import { useHistory } from "react-router"
import axios from 'axios'

function Orders(props){
    console.log('date',props.orderDate.slice(0,10))
    console.log('userid',props.userId)
    const history=useHistory()
    const handleClick=()=>{
        history.push(`/orders/update/${props.id}`)
    }
    const handleDelete=()=>{
        const payload={
            id:props.id
        }
        axios({
            url:`http://localhost:9000/delete`,
            method:"POST",
            data:payload
        })
        .then(()=>{history.push(`/login`)})
        .catch(()=>{alert('internal error')})
    }
    return(
    
        <tr>
        {/* // <form action={`/orders/update/${props.id}`} > */}
        {/* <table style={{"width":"100%"}}> */}
            
                <td>{props.orderName } </td>
                <td>{props.orderQuantity } </td>
                <td>{props.orderDate.slice(0,10) } </td>
                <td>{props.orderStatus } </td>
                <td><button type="submit" onClick={handleClick}>Update</button></td>
                <td><button type="submit" onClick={handleDelete}>Delete</button></td>
            
        {/* </table> */}
        {/* </form> */}
        </tr>
    
    )
}

export default Orders