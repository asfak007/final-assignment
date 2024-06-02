const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    brandName:{type:String,unique:true,require:true},
    brandImg:{type:String,require:true}
},{timeStamp:true,versionKey:false})

const BrandModel = mongoose.model('brands',DataSchema);

module.exports=BrandModel