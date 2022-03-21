const mongoose =require("mongoose")
var OrdersSchema=new mongoose.Schema({
    orderName :{type:String, required:true},
    orderQuantity :{type:Number,required:true},
    orderDate:{type:Date,default:new Date()},
    orderStatus:{type:String , default:"comformed"},
    userId:{type:String}
})
const Ordersdb=mongoose.model('orderdb',OrdersSchema)
module.exports=Ordersdb
