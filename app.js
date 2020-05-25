const   express =require('express');
const bodyParser= require('body-parser');
const path =require('path');
const session = require('express-session');
const mongodbStore= require('connect-mongodb-session') (session);
const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');
const authRoutes =require('./routes/auth');

const errorPage=require('./controllers/error')


const mongoose = require('mongoose');

const MONGODB_URI= 'mongodb+srv://admin:admin123@node-mongodb-mnpi9.mongodb.net/shop?retryWrites=true&w=majority';

const User =require('./models/user');



const app= express();

//session storage
const store= new mongodbStore({
  uri:MONGODB_URI,
  collection:'sessions'

});

app.set('view engine' ,'ejs');

app.set('views','views'); //path to find the views.

//middleware to store the user...

app.use((req,res,next)=>{

User.findById('5eca7793ac53922a2c85f7a1').then(user=>{

    req.user=user;
     next();
 }).catch(err=>{
     console.log('error in findByPk of mddleware in app.js' , err);
 })

 
})

//Initialize the session using middleware..
app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store:store
      
      
    })
  );

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public'))); //serve the static files like css.

app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

//app.use(errorPage.error404);

mongoose.connect(MONGODB_URI)
.then(result=>{
  console.log(' mongoosedb connection successful!');
 
User.findOne().then(user=>{
  if(!user)
  {
    const user =new  User({
      name:'Max',
      email:'test.t@gmail.com',
      cart:{
        items:[]
      }
  })
  user.save();

  }

}).catch(err=>{
  console.log(err);
})


app.listen(4001);
})
.catch(err=>{
  console.log(err);
});

    
  

