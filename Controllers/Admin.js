const mongoDB = require('mongodb')
const Product = require('../Models/product')
const ObjectId = mongoDB.ObjectId
const user=require('../Models/User')



exports.getAddproducts=(req,res)=>{
  
    res.render('Admin/addproduct',{
         pageTitle:'Add Product',
         path:'addproduct',
        isAuthenticated: req.session.isLoggedIn,
        isAdmin : req.session.isAdmin
         
        })
    }

exports.postProducts = (req,res)=>{
       const Title = req.body.title
       const imageURL = req.body.imgURL
       const Price = req.body.Price                                                                //i stored all user information in the req.user  this comes from app.js
       const Description = req.body.Description                                                    // here mongoose will automatically extract the ID  
       const p = new Product({title:Title , imgURL:imageURL, Price:Price, Description:Description , userId : req.user}) // map to the values we defined in the schema
       p.save()
       .then(result=>{
           console.log('product created')
           res.redirect('/admin/products')
       })
       .catch(err=>{
           console.log(err)
       })
       
         
        }

        exports.getEditproducts=(req,res)=>{
  
            const editMode = req.query.edit
            // if(!editMode)
            // { return res.redirect('/') }

            const prodId = req.params.productId  
            Product.findById(prodId)
            .then( product =>{
                if(!product)
                return res.redirect('/')


                res.render('admin/edit-product',{
                    pageTitle:'Edit Product',
                    editing : editMode ,
                    product: product,
                    isAuthenticated: req.session.isLoggedIn,
                    isAdmin : req.session.isAdmin

                })

            })
          
            }

            exports.postEditProducts = (req,res)=>{
                const prodId = req.body.productId

                const UpdatedTitle = req.body.title
                const UpdatedimgURL = req.body.imgURL
                const UpdatedPrice = req.body.Price
                const UpdatedDescription = req.body.Description
                
                Product.findById(prodId)
                .then(prod=>{
                    prod.title=UpdatedTitle
                    prod.imgURL=UpdatedimgURL
                    prod.Price=UpdatedPrice
                    prod.Description=UpdatedDescription

                    return prod.save()

                })
                .then(result=>{
                    console.log('product Updated')
                    res.redirect('/admin/products')
                })
                .catch(err=>{
                    console.log(err)
                    res.redirect('/')
                })
            }

exports.getAdminproducts = (req,res)=>{
    Product.find()
    .then(product=>{
        res.render(
            'admin/products',
            {prods: product, 
            pageTitle:'Admin Products',
            path:'/products',
            hasProducts:product.length>0,
            isAuthenticated: req.session.isLoggedIn,
            isAdmin : req.session.isAdmin
        })
    })
    .catch(err=>{
        console.log(err)
    })

}

exports.postDeleteProduct=(req,res)=>{
    const prodID = req.body.productId
    Product.findByIdAndDelete(prodID)
    .then(result=>{
        console.log('deleted')
        res.redirect('/admin/products')
    })
    .catch(err=>{
        console.log(err)
    })

}