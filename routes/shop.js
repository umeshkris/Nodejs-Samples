const express = require('express');
const router=express.Router();
const shopController=require('../controllers/shop');

const isAuth= require('../middleware/is-auth');


//test route
router.get('/hello',(req,res,next)=>{
    console.log('in  another middleware...');
    res.send('<h1>Hello from nodejs </h1>')
})


router.get('/',isAuth,shopController.getIndex)

//router.get('/',shopController.getProducts);

router.get('/products',isAuth,shopController.getProducts);

router.get('/products/:prodId',isAuth,shopController.getProductById)

router.get('/cart', isAuth,shopController.showCart);

router.post('/cart', isAuth,shopController.postCart);

router.get('/order', isAuth,shopController.getOrders);


module.exports=router;