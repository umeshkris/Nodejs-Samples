const User = require('../models/user');
const bcrypt= require('bcryptjs');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  const email= req.body.email;
  const password= req.body.password;

  //setting the cookie:
  //res.setHeader('Set-Cookie', 'isLoggedIn:true');
  //setting the session variable..
  req.session.isLoggedIn=true;
  
  res.redirect('/');

  
  // User.findByOne({email:email})
  //   .then(user => {
  //     if(!user){
  //       console.log('if not user found...');
  //       return res.redirect('/login');
  //     }
  //     console.log('user found--- comparing password with compare---' + password + ' ' + user.password);
  //     bcrypt.compare(password,user.password)
  //     .then(doMatch=>{

  //       console.log('doMatch---' + doMatch);
  //       if(doMatch){
          

          
  //         req.session.isLoggedIn = true;
  //         req.session.user = user;
  //        return req.session.save(err => {
  //           console.log(err);
  //            res.redirect('/');
  //     });
          
  //       }
  //       console.log('do match-- redirecting..' 
  //       + doMatch)
  //        res.redirect('/login');
  //     })
      
  //     .catch(err=>{
  //       console.log(err);
  //       res.redirect('/login');
  //     })
  //   })
  //   .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {

  const email= req.body.email;
  const password= req.body.password;
  const confirmPassword= req.body.confirmPassword;

  
  User.findByOne({email:email})
  .then(userDoc=>{
    if(userDoc){
      console.log('userdoc--' + userDoc);
      return res.redirect('/signup');
    }

    return bcrypt.hash(password,12)
    
    .then(hashpassword=>{
      const  user =new User(email,hashpassword);
       return user.save();
    
    
    })
    .then(result=>{
      res.redirect('/');
    })

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
