const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    productID:{type:mongoose.Schema.Types.ObjectId,require:true},
    userID:{type:mongoose.Schema.Types.ObjectId,require:true},
    color:{type:String,require:true},
    price:{type:Number,require:true},
    qty:{type:Number,require:true},
    size:{type:String,require:true}
},{timeStamp:true,versionKey:false})

const CartModel = mongoose.model('carts',DataSchema);

module.exports = CartModel