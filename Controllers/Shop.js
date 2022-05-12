 const Product = require('../Models/product')
 const Order = require('../Models/Order')
// const express = require ('express')
// const Cart = require('../Models/cart')




 exports.getShopProducts = (req,res)=>{
             Product.find()
             .then(product=>{
                 
                res.render(
                    'shop/products-list',
                    {prods: product, 
                    pageTitle:'All products',
                    path:'/products',
                    hasProducts:product.length>0,
                    // activeShop:true,
                    // productCSS:true
                    isAuthenticated: req.session.isLoggedIn,
                    isAdmin : req.session.isAdmin
                })
           
        })
        .catch(err=>{
            console.log(err)
        })
        }
 
        
exports.getProductByID=(req,res)=>{
    const prodID= req.params.productId
    
    Product.findById(prodID)
    .then(product=>{
        // console.log(p)
        res.render('shop/product-details',{
            product:product,
            pageTitle:'details',
            isAuthenticated: req.session.isLoggedIn,
            isAdmin : req.session.isAdmin
            
        })
    })
    .catch(err=>{
        console.log(err)
    })
    
    


//     res.render('shop/product-details',
//   {   
//       pageTitle:'product details',
     
//   })


}

     
exports.getIndex= (req,res)=>{
    Product.find()
    .then(product=>{
        res.render(
            'shop/index',
            {prods: product, 
            pageTitle:'Shop',
            path:'/',
            hasProducts:product.length>0,
            // activeShop:true,
            // productCSS:true
            isAuthenticated: req.session.isLoggedIn,
            isAdmin : req.session.isAdmin
        })
    })

    .catch(err=>{
        console.log(err)
    })
} 

exports.getCart=(req,res)=>{
    req.user
    .populate('cart.items.productId')
    .then(user=>{
        
        const products =user.cart.items

        res.render('shop/cart',{
            //path:'/cart',
            pageTitle:'your cart',
            products:products,
            isAuthenticated: req.session.isLoggedIn,
            isAdmin : req.session.isAdmin


        })

    })

    .catch(err=>{
        console.log(err)
    })

   
}

exports.postCart= (req,res)=>{
   const prodId = req.body.productId
   
   Product.findById(prodId)
//    .populate('title')
   .then(product=>{
      return req.user.addToCart(product)
      
   })
   .then(result=>{
       console.log(result)
       return result
   })


    // res.render('shop/cart',{
    //     pageTitle: 'cart'
    // })
    res.redirect('/cart')
}

exports.postCartDeleteProduct=(req,res)=>{
    const prodId = req.body.productId
   
    req.user.deleteItemFromCart(prodId)
    .then(result=>{
        res.redirect('/cart')
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.getOrders =(req,res)=>{
    Order.find({'user.userId' : req.user._id })
    .then(orders=>{

        res.render('shop/orders',{
            path:'/orders',
            pageTitle:'Orders',
            orders:orders,
            isAuthenticated: req.session.isLoggedIn,
            isAdmin : req.session.isAdmin
        })
    })

    .catch(err=>{
        console.log(err)
    })
       
}

exports.postOrders= (req,res)=>{
    req.user
    .populate('cart.items.productId')
    .then(user=>{
        const products = user.cart.items.map(i => {
            return {quantity: i.quantity , product: {...i.productId._doc}}
        })

        const order = new Order({
            user:{
                name : req.user.name,
                userId : req.user
            },
            products:products
        })
        return order.save()
    })


    .then(result=>{
       return req.user.clearCart()
    })
    .then(result=>{
        res.redirect('/orders')

    })
    .catch(err=>{
        console.log(err)
    })
}



exports.getCheckout =(req,res)=>{
    res.render('/shop/checkout',{
        path: '/checkout',
        pageTitle:'Checkout',
        isAuthenticated: req.session.isLoggedIn,
        isAdmin : req.session.isAdmin
        })
}

// exports.getAbout =(req,res)=>{
//     res.render('/shop/about',{
//         path: '/about',
//         pageTitle:'About US',
//         isAuthenticated: req.session.isLoggedIn,
//         isAdmin : req.session.isAdmin
//         })
// }
