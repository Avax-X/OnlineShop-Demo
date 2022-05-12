
const express = require('express')
const Router = express.Router()
// const shopRoute = require('./Shop')
// const page404=require('./404')

const adminController= require('../Controllers/Admin')




Router.get('/admin/addProduct', adminController.getAddproducts )

Router.get('/admin/products',adminController.getAdminproducts)

Router.post('/admin/addproduct',adminController.postProducts);

Router.get('/admin/edit-product/:productId',adminController.getEditproducts)

Router.post('/admin/edit-product',adminController.postEditProducts)

 Router.post('/admin/delete-product',adminController.postDeleteProduct)

//  Router.use(shopRoute)
//  Router.use(page404)

module.exports=Router

