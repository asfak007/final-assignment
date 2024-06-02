const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    categoryName:{type:String,require:true},
    categoryImg:{type:String,require:true},
},{timeStamp:true,versionKey:false})

const CategoryModel = mongoose.model('categories',DataSchema)

module.exports = CategoryModel