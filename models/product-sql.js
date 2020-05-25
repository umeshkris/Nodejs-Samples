let products=[];


const db= require('../util/database');
module.exports=class Product {

    constructor(title,imageurl,description,price){
        this.title=title;
        this.imageurl=imageurl;
        this.description=description;
        this.price=price;
    }

    save()
    {
        console.log('save', this.id);
    if(this.id)
        {
            console.log('inside if...')
            const existingProduct = products.findIndex(prod=> prod.id==this.id);
            console.log('existingProduct' , existingProduct);
            const updatedProducts=[... products];
            updatedProducts[existingProduct]=this;
            products=updatedProducts;

        }
        else{
            console.log('inside save else...')
           // this.id=Math.floor(Math.random() * 10)
            //products.push(this);
    return db.execute('INSERT INTO products (title,price,description,imageurl)VALUES(?,?,?,?)',
                 [this.title,this.price,this.description,this.imageurl]);
        }
    }

    static fetchAllProducts (){

        
        return db.execute('SELECT * FROM products');
    }

    static findProductById(id)
    {
        //const product= products.find(p=>p.id==id);

        //return product;

        return db.execute('SELECT * FROM products p WHERE p.id=?',[id]);

    }

    static deleteProductById(id)
    {
        const deletedproducts = products.filter(p=>p.id!= id);
        products=deletedproducts;
        

    }


}