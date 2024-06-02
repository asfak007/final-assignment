const express = require('express')

const ProductController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController')
const AuthVerification = require('../middlewares/AuthVerification')
const WishListController = require('../controllers/WishListController')
const CartListController = require('../controllers/CartController')

const router = express.Router();

//product api 
router.get('/ProductBrandList',ProductController.ProductBrandList);
router.get('/ProductCategoryList',ProductController.ProductCategoryList);
router.get('/productSliderList',ProductController.ProductSliderList);
router.get('/ProductListByBrand/:BrandID',ProductController.ProductListByBrand);
router.get('/ProductListByCategory/:categoryID',ProductController.ProductListByCategory);
router.get('/ProductListByRemark/:Remark',ProductController.ProductListByRemark);
router.get('/ProductDetails/:ProductID',ProductController.ProductDetails);
router.get('/ProductListBySimilar/:categoryID',ProductController.ProductListBySimilar);
router.get('/ProductListByKeyWord/:Keyword',ProductController.ProductListByKeyword);
router.get('/ProductReviewList/:ProductID',ProductController.ProductReviewList);


//User Route 
//Auth
router.get('/UserOTP/:email',UserController.SendOtp);
router.get('/VerifyLogin/:email/:otp',UserController.VerifyLogin);
router.get('/UserLogout',AuthVerification,UserController.logout);

router.post('/CreateProfile',AuthVerification,UserController.CreateProfile);
router.post('/UpdateProfile',AuthVerification,UserController.UpdateProfile);
router.get('/ReadProfile',AuthVerification,UserController.ReadProfile)

//Wish list routes 

router.post('/SaveWishList',AuthVerification,WishListController.SaveWishList);
router.post('/RemoveWishList',AuthVerification,WishListController.RemoveWishList);
router.get('/WishList',AuthVerification,WishListController.WishList)

//Cart list routes
router.post('/SaveCartList',AuthVerification,CartListController.SaveCartList)
router.post('/UpdateCartList/:cartID',AuthVerification,CartListController.UpdateCartList)
router.post('/RemoveCartList',AuthVerification,CartListController.RemoveCartList)
router.get('/CartList',AuthVerification,CartListController.CartList)


module.exports = router;