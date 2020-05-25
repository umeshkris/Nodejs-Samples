// const mysql=require('mysql2');

// const pool= mysql.createPool({

//     host:'localhost',
//     user:'root',
//     database:'nodejs',
//     password:'admin'
// })

// module.exports=pool.promise();

// const Sequelize = require('sequelize');

// const sequelize= new Sequelize('nodejs','root','admin',{

//     dialect:'mysql',
//     host:'localhost'
// });


const mongodb= require('mongodb');
const MongoClient =mongodb.MongoClient;


let _db;
const connectionURL= 'mongodb+srv://admin:admin123@node-mongodb-mnpi9.mongodb.net/shop?retryWrites=true&w=majority';
//                    mongodb+srv://admin:admin123@node-mongodb-mnpi9.mongodb.net/shop?authSource=admin&replicaSet=Node-MongoDB-shard-0&w=majority%3B&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true
const mongoConnect = callback =>{

    //wrap into a function like above..
    MongoClient.connect(connectionURL)
    .then(client =>{
        console.log('MongoDB connection successful!!');
        _db=client.db();
        callback(client);
    })
    .catch(err=>{
        console.log( 'MongoDB connection failure -->',err);
        //throw err;
    });
    
}
const getdb=()=>{

    if(_db)
    {
        return _db;
    }
    throw new Error('No database Found !!');
}






//module.exports=mongoConnect; single export


exports.mongoConnect= mongoConnect;
exports.getdb=getdb;