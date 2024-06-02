const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    name:{type:String,require:true},
    description:{type:String,require:true},
    img:{type:String,require:true}
},{timeStamp:true,versionKey:false})

const FeaturesModel = mongoose.model('features',DataSchema);

module.exports= FeaturesModel;