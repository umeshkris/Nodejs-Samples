const Product = require('../models/product');

exports.getIndex=(req,res,next)=>{
        Product.find().then(product=>{
        res.render('shop/index',{
                              prods:product,
                              pageTitle:'Index',
                               path:'/',
                               hasProducts:product.length>0,
                               isAuthenticated:req.session.isLoggedIn
                            });


}).catch(error=>{

        console.log('error in fetching products !! ');

})
    

}

//get products tab
exports.getProducts=(req,res,next)=>{

        Product.find().then(product=>{       
                         res.render('shop/product-list',{
                 prods:product,
                 pageTitle:'Shop',
                 path:'/shop',
                 hasProducts:product.length>0,
                 isAuthenticated:false
             })


                }).catch(error=>{
                        console.log('error in fetching products !! ');

                })
};



exports.getProductById=(req,res,next)=>{

        const prodId=req.params.prodId;
        
      Product.findById(prodId).then(product=>{ 
                res.render('shop/product-detail',{
                                        product:product,
                                         pageTitle:'Product Detail',
                                         path:'/products',
                                         isAuthenticated:false
                                 })


        }).catch(error=>{
                console.log('error while reterving product ' ,error)
        })
       
        
       

}

exports.showProductdetail=(req,res,next)=>{

        res.render('shop/product-detail',{
                path:'products',
                pageTitle:'Product-Title'

        });

};
exports.showCart=(req,res,next)=>{
        res.render('shop/cart',{
               path:'cart',
               pageTitle:'Cart'
        })
} ; 

exports.postCart=(req,res,next)=>{
      const id= req.body.prodId;  
      console.log( id);
        res.render('shop/cart',{
               path:'cart',
               pageTitle:'Cart'
        })
} ; 

exports.getOrders =(req,res,next)=>{

        res.render('shop/order',{
                path:'order',
                pageTitle:'Your Orders'
        })
}
