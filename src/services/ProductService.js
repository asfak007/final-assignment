
const BrandListModel = require("../models/BrandModel")
const CategoryModel = require("../models/CategoryModel")
const ProductSliderModel = require("../models/ProductSliderModel")
const ProductModel = require("../models/ProductModel")
const ReviewModel = require("../models/ReviewModel")
const { default: mongoose } = require("mongoose")
const { formToJSON } = require("axios")

const ObjectId = mongoose.Types.ObjectId;

const BrandListService = async()=>{
    try{

        let data = await BrandListModel.find();

        return {status:'success',data:data}

    }catch(err){
        return {status:'fail',data:err.toString()}
    }
}

const CategoryListService = async()=>{
    try{

        let data  = await CategoryModel.find();

        return {status:'success',data:data}

    }catch(err){
        return {status:'fail',data:err.tostring}
    }
}

const ProductSliderListService = async()=>{
    try{
        let data = await ProductSliderModel.find();
        return {status:'success',data:data}
    }catch(err){
        return {status:'fail',data:err.toString()}
    }
}

const ProductListByBrandService = async (req)=>{
    try{

        let BrandId = new ObjectId(req.params.BrandID)

        

        let MatchStage  = {$match:{brandID:BrandId}};

        let JoinWithCategory = {$lookup:{from:'categories',localField:"categoryID",foreignField:'_id',as:"category"}};
        let JoinWithBrand = {$lookup:{from:'brands',localField:"brandID",foreignField:"_id",as:"brand"}};
        let UnwindCategory ={$unwind:"$category"} 
        let UnwindBrand ={$unwind:"$brand"} 

        let ProjectionStage = {$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0,'createdAt':0,'updatedAt':0}}



        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithCategory,
            JoinWithBrand,
            UnwindCategory,
            UnwindBrand,
            ProjectionStage
        ])
        return {status:'success',data:data}
    }catch(err){

        return {status:'fail',data:err.toString()}
    }
}

const ProductListByCategoryService = async (req)=>{
    

    try{

        let CategoryId = new ObjectId(req.params.categoryID);

        let MatchStage = {$match:{categoryID:CategoryId}}

        let JoinWithCategoryStage = {$lookup:{from:'categories',localField:'categoryID',foreignField:'_id',as:'category'}};
        let JoinWithBrandStage = {$lookup:{from:'brands',localField:'brandID',foreignField:'_id',as:'brand'}}

        let UnwindBrand = {$unwind:'$brand'}
        let UnwindCategory = {$unwind:'$category'}

        let ProjectionStage = {$project:{'brand._id':0,'category._id':0,'createdAt':0,'updatedAt':0}}


        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrand,
            UnwindCategory,
            ProjectionStage
        ])

        return {status:'success',data:data}

    }catch(err){
        return{status:"fail",data:err.toString()}
    }
}

const ProductListByRemarkService = async (req)=>{
    
    try{
        let Remark = req.params.Remark;

        let MatchStage = {$match:{remark:Remark}}
        
        let JoinWithCategory = {$lookup:{from:'categories',localField:'categoryID',foreignField:'_id',as:'category'}};
        let JoinWithBrand = {$lookup:{from:'brands',localField:'brandID',foreignField:'_id',as:'brand'}}

        let UnwindBrand = {$unwind:"$category"}
        let UnWindCategory = {$unwind:"$brand"}

        let ProjectionStage = {$project:{'brand._id':0,'category._id':0,'createdAt':0,'updatedAt':0}}



        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithCategory,
            JoinWithBrand,
            UnWindCategory,
            UnwindBrand,
            ProjectionStage
        ])



    return {status:'success',data:data}

    }catch(err){
        return {status:'fail',data:err.toString()}
    }
}


const ProductDetailsService  = async (req)=>{
    try{

        let productId = new ObjectId(req.params.ProductID)
        
        let MatchStage = {$match:{_id:productId}}

        let JoinWithBrand = {$lookup:{from:'brands',localField:'brandID',foreignField:'_id',as:"brand"}}
        let JoinWithCategory = {$lookup:{from:'categories',localField:'categoryID',foreignField:'_id',as:"category"}}
        let JoinWithProductDetails = {$lookup:{from:'productdetails',localField:'_id',foreignField:'productID',as:"detail"}}

        let UnwindBrand = {$unwind:"$brand"}
        let UnWindCategory = {$unwind:"$category"}
        let UnWindDetail = {$unwind:"$detail"}


        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}


        let data  = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrand,
            JoinWithCategory,
            JoinWithProductDetails,
            UnWindDetail,
            UnwindBrand,
            UnWindCategory,
            ProjectionStage


        ])

        return {status:'success',data:data}

    }catch(err){
        return {status:'fail',data:err.toString()}
    }
}

let ProductListBySimilarService = async(req)=>{
    try{

      

         let CategoryId = new ObjectId(req.params.categoryID);

        let MatchStage = {$match:{categoryID:CategoryId}}

        let JoinWithCategoryStage = {$lookup:{from:'categories',localField:'categoryID',foreignField:'_id',as:'category'}};
        let JoinWithBrandStage = {$lookup:{from:'brands',localField:'brandID',foreignField:'_id',as:'brand'}}

        let UnwindBrand = {$unwind:'$brand'}
        let UnwindCategory = {$unwind:'$category'}

        let limitStage={$limit:20}

        let ProjectionStage = {$project:{'brand._id':0,'category._id':0,'createdAt':0,'updatedAt':0}}


        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrand,
            UnwindCategory,
            ProjectionStage,
            limitStage
        ])

        return {status:"success",data:data}

    }catch(err){
            return {status:'fail',data:err.toString()}
    }
   
}

let ProductListByKeywordService = async(req)=>{
    try{

        let SearchRegex = {'$regex':req.params.Keyword, '$options':'i'}
        let SearchParams = [{title:SearchRegex},{shortDes:SearchRegex}]
        let SearchQuery = {$or:SearchParams}

        let MatchStage = {$match:SearchQuery}

        let JoinWithCategoryStage = {$lookup:{from:'categories',localField:'categoryID',foreignField:'_id',as:'category'}};
        let JoinWithBrandStage = {$lookup:{from:'brands',localField:'brandID',foreignField:'_id',as:'brand'}}

        let UnwindBrand = {$unwind:'$brand'}
        let UnwindCategory = {$unwind:'$category'}

        let limitStage={$limit:20}

        let ProjectionStage = {$project:{'brand._id':0,'category._id':0,'createdAt':0,'updatedAt':0}}


        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrand,
            UnwindCategory,
            ProjectionStage,
            limitStage
        ])

        return {status:"success",data:data}

    }catch(err){
        return {status:'fail',data:err.toString()}
    }
}

let ProductReviewListService = async(req)=>{
    try{

        let ProductID = new ObjectId(req.params.ProductID)
        let MatchStage = {$match:{productID:ProductID}}

        let JoinWithProfileStage= {$lookup:{from:"profiles",localField:"userID",foreignField:'userID',as:'profile'}}
        let UnWindProfileStage = {$unwind:"$profile"}
        
        let ProjectionStage = {$project:{'des':1 , 'rating':1,'profile.cus_name':1}}

        let data = await ReviewModel.aggregate([
            MatchStage,
            JoinWithProfileStage,
            UnWindProfileStage,
            ProjectionStage
        ])

        return {status:'success',data:data}
    }catch(err){
        return {status:'fail',data:err.toString()}
    }
}


module.exports = {
    BrandListService,
    CategoryListService,
    ProductSliderListService,
    ProductListByBrandService,
    ProductListByCategoryService,
    ProductListByRemarkService,
    ProductDetailsService,
    ProductListBySimilarService,
    ProductListByKeywordService,
    ProductReviewListService
}