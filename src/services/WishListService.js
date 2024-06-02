
const { default: mongoose } = require('mongoose');
const WishListModel = require('../models/WishModel.js');
const WishModel = require('../models/WishModel.js');

const ObjectId = mongoose.Types.ObjectId

const SaveWishListService = async (req)=>{
    try{
        

        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;

        await WishListModel.updateOne(reqBody,{$set:reqBody},{upsert:true})

        return {status:"success",message:"Wish List save Success"}

    }catch(err){
        return {status:'fail',message:err.toString()}
    }
}

const RemoveWishListService = async (req) => {
    try{
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;

        await WishListModel.deleteOne(reqBody)

        return {status:"Success",message:"Wish List Remove Success"}

    }catch (err){
        return {status:"fail",message:err.toString()}
    }
}

const WishListService= async (req)=>{
    try{
        let user_id = new ObjectId(req.headers.user_id);
        let MatchState = {$match:{userID:user_id}};
        let JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
        let unwindProductStage={$unwind:"$product"}
  
        let JoinStageBrand={$lookup:{from:"brands",localField:"product.brandID",foreignField:"_id",as:"brand"}}
        let unwindBrandStage={$unwind:"$brand"}
  
  
        let JoinStageCategory={$lookup:{from:"categories",localField:"product.categoryID",foreignField:"_id",as:"category"}}
        let unwindCategoryStage={$unwind:"$category"}
        
        let projectionStage={
            $project:{
                '_id':0,'userID':0,'createdAt':0,'updatedAt':0,'product._id':0,
                'product.categoryID':0,'product.brandID':0,
                'brand._id':0,'category._id':0
  
            }
        }


        let data = await WishModel.aggregate([
            MatchState,
            JoinStageProduct,
            unwindProductStage,
            JoinStageBrand,
            unwindBrandStage,
            JoinStageCategory,
            unwindCategoryStage,
            projectionStage
        ])
        return {status:"success",data:data}

    }catch(err){
        return {status:"fail",data:err.toString()}
    }
}


module.exports = {
    SaveWishListService,
    RemoveWishListService,
    WishListService
}