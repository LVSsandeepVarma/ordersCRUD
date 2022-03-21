import axios from 'axios'
import { useHistory } from 'react-router'
import React, { useState } from 'react'
import './forms.css'

function Register(){
    const history=useHistory()
    const [name,setName]=useState('')
    const [email,setEamil]=useState('')
    const [password,setPassword]=useState('')     

    const changeName=(e)=>{
        setName(e.target.value)
    }
    const changeEmail=(e)=>{
        setEamil(e.target.value)
    }
    const changePassword=(e)=>{
        setPassword(e.target.value)
    }

    const handleSubmit=(event)=>{
        event.preventDefault()
        const payload={
            name:name,
            email:email,
            password:password
        }

        axios({
            url:'http://localhost:9000/register',
            method:'POST',
            data:payload
        })
        .then((res)=>{
            history.push('/login')
        })
        .catch((err)=>{
            alert("invalid credentials")
            console.log(err,'internal error')})
    }

    const handleClick=()=>{
        history.push('/login')

    }
    return(
        <div className="col-md-5">
            <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                    <label className="form-label">Username</label>
                    <input className="form-control" type="text" onChange={changeName} placeholder="name to be displayed  " / >
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label">Email</label>
                    <input className="form-control" type="email" onChange={changeEmail}  placeholder="email...." />
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label">password</label>
                    <input className="form-control" type="password" onChange={changePassword} placeholder="********"/>
                </div>
                <div>
                    <div className="mb-4">
                        <button style={{"width":"50%","display":"flex","justifyContent":"center","marginLeft":"25%"}} className="btn btn-primary" type="submit">Register</button>
                    </div>
                    <div className="mb-4">
                        <samll style={{"display":"flex","justifyContent":"center"}}>already a uesr?</samll>
                        <button style={{"width":"80%","display":"flex","justifyContent":"center","marginLeft":"10%"}} className="btn btn-primary" onClick={handleClick}>sign in</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Register