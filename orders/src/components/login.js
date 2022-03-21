import axios from 'axios'
import React,{useState} from 'react'
import { useHistory } from 'react-router'
import { decodeToken } from "react-jwt";
import './forms.css'

function Login(){
    const history=useHistory()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const changeEmail=(e)=>{
        setEmail(e.target.value)
    }
    const changePassword=(e)=>{
        setPassword(e.target.value)
    }
    const handleSubmit=(event)=>{
        event.preventDefault()
        const payload={
            email:email,
            password:password
        }
        axios({
            url:'http://localhost:9000/login',
            method:"POST",
            data:payload
        })
        .then((res)=>{
            console.log(res.data)
            const token=res.data
            const myDecodedToken = decodeToken(token);
            const id=myDecodedToken._id
            history.push(`/orders/${id}`)
        })
        .catch(()=>{
            alert('invalid credentials')
            history.push('/')})
    }
    const handleRegister=()=>{
        axios.get('/')
    }
    return(
        <div className=" col-md-5">
            <form  onSubmit={handleSubmit}>
                <div className="form-outline mb-4"> 
                    <label className="form-label">Email</label>
                    <input className="form-control" type="email" onChange={changeEmail} placeholder="@gmail.com"/>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label">password</label>
                    <input className="form-control" type="password" onChange={changePassword} placeholder="*************" />
                </div>
                <div className="buttons">
                    <div className="mb-4">
                        <button style={{"width":"50%","display":"flex","justifyContent":"center","marginLeft":"25%"}} className="btn btn-primary" type="submit">Login</button>
                    </div>
                    <div className="mb-4">
                        <p style={{"display":"flex","justifyContent":"center"}}>new uersr?</p>
                        <button style={{"width":"80%","display":"flex","justifyContent":"center","marginLeft":"10%"}} className="btn btn-primary" onClick={handleRegister}>Register</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login