const express=require('express')
const router=express.Router()
const Orderdb=require('../models/database')
const Clientdb=require('../models/clientdb')
const bcrypt=require("bcrypt")
var jwt = require('jsonwebtoken')
const Ordersdb = require('../models/database')
const secret='secret'


router.get('/orderslist/:id',async function(req,res){
    const id=req.params.id
    // console.log(id)
    const data=await Orderdb.find({userId:id})
    res.json(data)
})

router.post('/register',async function(req,res){
    console.log('r',req.body.password.length)
    const email= await Clientdb.findOne({email:req.body.email})
    const name=await Clientdb.findOne({name:req.body.name})
    if (email || name){

        return res.sendStatus(400)
    }
    if (req.body.password.length <=5){
        return res.status(400).json({status:"invalid credentials"})
    }
    bcrypt.hash(req.body.password,10,async function(err,hash){
        if(err){
            console.log(err)
            return res.status(400).json({status:"failed"})
        }

    await Clientdb.create({
        name:req.body.name,
        email:req.body.email,
        password:hash
    })
    
})
    res.sendStatus(201)
})

router.post('/login',async function(req,res){
    const email=req.body.email
    const password=req.body.password
    const user=await Clientdb.findOne({email:email})
    if(!user){
        return res.sendStatus(404)
    }
    bcrypt.compare(password,user.password,function(error,result){
        if(!result){
            res.sendStatus(404)
        }
        else{
            const token=jwt.sign({
                _id:user._id
            },secret)
            jwt.verify(token,secret,function(error,decoded){
                if(error){
                    return res.sendStatus(404)
                }
            })
            
            res.status(201).send(token)
        }
    })
})

router.post('/placeorder',async function(req,res){
    // console.log("body: ",req.body)
    console.log(req.body.orderName)
    await Orderdb.create({
        orderName:req.body.orderName,
        orderQuantity:req.body.orderQuantity,
        orderDate:req.body.orderData,
        orderStatus:req.body.orderStatus,
        userId:req.body.userid
    })
    res.sendStatus(201)
    
})
router.post('/delete',async function(req,res){
    const id=req.body.id
    console.log('hello',req.body.id)
    await Ordersdb.deleteOne({_id:id})
    console.log(res)
    res.sendStatus(201)
    
})

router.post('/update',async function(req,res){
    console.log('server',req.body)
    console.log(req.body.id)
    const id=req.body.id
    await Orderdb.updateOne({_id:id},{
        orderName:req.body.orderName,
        orderQuantity:req.body.orderQuantity,
        orderStatus:req.body.orderStatus
    })
    res.sendStatus(201)
})
router.post('/orders',async function(req,res){
    console.log('hellllo')
    const id=req.body.id
    console.log(req.body)
    await Orderdb.updateOne({_id:id},{
        orderName:req.body.name,
        orderQuantity:req.body.quantity,
        orderStatus:req.body.orderStatus
    })
    res.sendStatus(201)
})

module.exports=router