const express = require('express');
const router=express.Router();
const shopController=require('../controllers/shop')


//test route
router.get('/hello',(req,res,next)=>{
    console.log('in  another middleware...');
    res.send('<h1>Hello from nodejs </h1>')
})


router.get('/',shopController.getIndex)

//router.get('/',shopController.getProducts);

router.get('/products',shopController.getProducts);

router.get('/products/:prodId',shopController.getProductById)

//router.get('/cart', shopController.showCart);

//router.post('/cart', shopController.postCart);

//router.get('/order', shopController.getOrders);


module.exports=router;