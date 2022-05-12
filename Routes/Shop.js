const express = require('express')
const router = express.Router()
const shopController = require('../Controllers/Shop')


router.get('/', shopController.getIndex )

 router.get('/products-list',shopController.getShopProducts)
 router.get('/product/:productId',shopController.getProductByID)
 router.get('/cart',shopController.getCart)  
 router.post('/cart',shopController.postCart)  
 router.post('/cart-delete-item',shopController.postCartDeleteProduct)  
 router.get('/checkout',shopController.getCheckout)
 router.post('/create-order',shopController.postOrders)
 router.get('/orders',shopController.getOrders)
 //router.get('/about', shopController.getAbout)

    
    // res.sendFile(path.join(rootDir,'views','shop.html'))

    //      OR

    // res.sendFile(path.join(__dirname,'../', 'views', 'shop.html'))

    





module.exports=router


