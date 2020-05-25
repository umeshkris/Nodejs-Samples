const User = require('../models/user');
const bcrypt= require('bcryptjs');

exports.getLogin = (req, res, next) => {
  
  let message= req.flash('error');
  if(message.length>0)
  {
     message=message[0];
  }else{
    message=null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated:false,
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message= req.flash('error');
  if(message.length>0)
  {
     message=message[0];
  }else{
    message=null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated:false,
    errorMessage: message
    
  });
};

exports.postLogin = (req, res, next) => {
  const email= req.body.email;
  const password= req.body.password;

  //setting the cookie:
  //res.setHeader('Set-Cookie', 'isLoggedIn:true');
  //setting the session variable..
  
  User.findOne({email:email})
    .then(user => {
      if(!user){
        console.log('if not user found...');
        req.flash('error', 'invalid email or password');
        return res.redirect('/login');
      }
      console.log('user found--- comparing password with compare---' + password + ' ' + user.password);
      bcrypt.compare(password,user.password)
      .then(doMatch=>{

        console.log('doMatch---' + doMatch);
        if(doMatch){
          req.session.isLoggedIn = true;
          req.session.user = user;
         return req.session.save(err => {
            console.log(err);
             res.redirect('/');
      });
          
        }
        console.log('do match-- redirecting..' 
        + doMatch)
        req.flash('error', 'invalid email or password');
         res.redirect('/login');
      })
      
      .catch(err=>{
        console.log(err);
        res.redirect('/login');
      })
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {

  const email= req.body.email;
  const password= req.body.password;
  const confirmPassword= req.body.confirmPassword;

  
  User.findOne({email:email})
  .then(userDoc=>{
    if(userDoc){
      console.log('userdoc--' + userDoc);
      req.flash('error', 'Please enter different email address !!');
      return res.redirect('/signup');
    }

    return bcrypt.hash(password,12)
    
    .then(hashpassword=>{
      const  user =new User({
        email:email,
        password:hashpassword,
        cart:{
           items:[]
        }
      
      });
       return user.save();
    
    
    })
    

})
.then(result=>{
  res.redirect('/login');
})

.catch(err=>{
  console.log(err);
})
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
