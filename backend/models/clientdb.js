const mongoose =require("mongoose")
var ClientSchema=new mongoose.Schema({
    name :{type:String, required:true,unique:true},
    email :{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true},
})
const Clientdb=mongoose.model('clientdb',ClientSchema)
module.exports=Clientdb