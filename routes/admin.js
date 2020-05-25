const express=require('express');

const adminController=require('../controllers/admin');

const router=express.Router();

const {body} =require('express-validator/check'); // validator


//.use is generic route which will handle all type requests. but if you you 
// want specific type then mention get or post.
router.get('/add-products',adminController.showAddProductPage)

router.post('/add-products',adminController.postAddProduct);
// router.post('/add-products',  [
//     body('title')
//         .isString()
//         .isLength({min:3})
//         .withMessage('Please enter title !!')
//         .trim(),
//     //body('imageurl').isURL(),
//     //body('price').isFloat(),
//     body('description')
//         .isLength({min:3,Max:20})
//         .trim()
//     ],adminController.postAddProduct);

router.get('/admin-products',adminController.adminProducts);  


router.get('/edit-product/:productId',adminController.getEditProduct);

router.post('/edit-product',adminController.postEditProduct);

router.post('/delete-product',adminController.postDeleteProduct);


//  router.post('/edit-product' , 
//  [
//  body('title')
//      .isString()
//      .isLength({min:3})
//      .trim(),
//  body('imageurl').isURL(),
//  body('price').isFloat(),
//  body('description')
//      .isLength({min:8,Max:20})
//      .trim()
//  ],adminController.postEditProduct) ;



//module.exports=router; single export 
/*exports.routes= router;
exports.products=products; */ //multiple exports.
module.exports=router;