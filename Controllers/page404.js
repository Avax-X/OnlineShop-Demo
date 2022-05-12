exports.page404 = (req,res)=>{
    // console.log('404')
     
     res.render('404',{
         pageTitle: 'Page not found',
         isAuthenticated: req.session.isLoggedIn,
         isAdmin : req.session.isAdmin
        })
 }