const Product = require('../models/product');
const {validationResult} =require('express-validator/check');


//show home page
exports.showAddProductPage=(req,res,next)=>{
        res.render('admin/edit-product',
            {
                    pageTitle:'AddProduct' ,
                    path:'/admin/add-products',
                    editable:false,
                    errorMessage:null,
                    isAuthenticated:false
            })
};





exports.getEditProduct= (req,res,next)=>{

    const editFlag=req.query.editable
    if(!editFlag) {

        return res.redirect('/');
    }
    const productId= req.params.productId;
    Product.findById(productId).then(product=>{
        if(!product)
        {
            return res.redirect('/');
        }
        res.render('admin/edit-product',{

            pageTitle:'Edit Product',
            path:'/edit-product',
            editable:editFlag,
            product:product,
            isAuthenticated:false,
            errorMessage:''
    
        })


    }).catch(error=>{

        console.log('error while reterving admin products');
    })
    

}


exports.adminProducts=(req,res,next)=>{
        Product.find().then(products=>{
        res.render('admin/products',{
            prods:products,
            pageTitle:'Admin Products',
            path:'/admin-products',
             hasProducts:products.length>0,
           isAuthenticated:false
        });

   }).catch(error=>{

        console.log('error while fetching admin products..')
    })

}


//save product
exports.postAddProduct=(req,res,next)=>{
const title=req.body.title;
const imageurl=req.body.imageurl;
const price=req.body.price;
const description=req.body.description;


const product = new Product({
        title:title,
        price:price,
        description:description,
        imageurl:imageurl,
        userId:req.user
    });
product.save()
   .then(result=>{

        console.log('reccord saved successfully !!');
        res.redirect('/');
    }).catch(error=>{

        console.log('error while saving record') ;
    })
   

};

//admin Edit Product
 exports.postEditProduct=(req,res,next)=>{

    const prodId= req.body.productId;
    const updatedTitle=req.body.title;
    const updatedImgageUrl=req.body.imageurl;
    const updatedPrice=req.body.price;
    const updatedDescription=req.body.description;
    

    console.log('updatedTitle :' + updatedTitle);
    console.log('updatedImgageUrl :' + updatedImgageUrl);
    console.log('updatedPrice :' + updatedPrice);
    console.log('updatedDescription :' + updatedDescription);
    console.log('productId :'  + prodId);
    
    Product.findById(prodId).then(product=>{
        product.title=updatedTitle;
        product.imageurl=updatedImgageUrl;
        product.price=updatedPrice;
        product.description=updatedDescription;
        
        return product.save();

    }).then(result=>{

        console.log('updated sucessfully !!');
        res.redirect('/admin/admin-products');
    })
    
    
    .catch(err=>{

        console.log(err);
    })


}




exports.postDeleteProduct=(req,res,next)=>{

    const prodId= req.body.productId;
    

Product.findByIdAndRemove(prodId)

    .then(result=>{
        console.log('delete successfully !!');
        res.redirect('/admin/admin-products');

    })
    
.catch(err=>{
        console.log('error while deleting the product!!' ,err)
    })

} 

