const User = require('../Models/User')

exports.getLogin = (req, res, next) => {
   

    console.log(req.session.isLoggedIn);
    res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: false,
      isAdmin : false
    });
  };
  
  exports.postLogin = (req, res, next) => {
    // User.findById('6277c023095bd1e03d8a13bd')
    // .then(user=>{
    //     req.session.isLoggedIn=true
    //     req.session.user=user
    //     res.redirect('/')

    // })
    // .catch(err=>{
    //     console.log(err)
    // })
    
    const email = req.body.email
    const password = req.body.password

    if(email === 'user@a' && password === 'user')
    {
        req.session.isLoggedIn = true;
        res.redirect('/');
    }
    else if(email=== "admin@a" && password ==='admin')
    {
        
        req.session.isAdmin = true;
        res.redirect('/');
    }
    //req.session.isLoggedIn=false
   res.redirect('/login')
  };

  exports.postLogout=(req,res)=>{
      req.session.destroy(err=>{
          console.log(err)
          res.redirect('/')
      })
  }

  exports.getRegister = (req, res, next) => {
   
    res.render('auth/Register', {
      path: '/Register',
      pageTitle: 'Register',
      isAuthenticated: false,
      isAdmin : false
    });
  };


  exports.postRegister = (req, res, next) => {
   
    res.render('auth/Register', {
      path: '/Register',
      pageTitle: 'Register',
      isAuthenticated: false,
      isAdmin : false
    });
  };

