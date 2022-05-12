const fs = require('fs')
const path = require('path')


const p =
path.join(path.dirname(process.mainModule.filename),
'data', 
'cart.json')


class Cart {

    static addProduct(id,productPrice){
        //fetch the cart for previous content
        fs.readFile(p,(err,fileContent)=>{
            let cart = {products:[] , totalPrice:0}
            if(!err)
            {
                cart = JSON.parse(fileContent)
            }
            //Analyze the cart => find if there's exsisting product
            const existingProductIndex = cart.products.findIndex(prod=>prod.id===id)
            const existingProduct = cart.products[existingProductIndex]
            let updatedProuct
            if(existingProduct){
                updatedProuct={...existingProduct}
                updatedProuct.qty=updatedProuct.qty+1
                cart.products =[...cart.products] // just copying the old array
                cart.products[existingProductIndex]=updatedProuct  // at this position (The index) in the cart, replace the old product with the updated one
            }   //basically here we updating the cart with existing items

            else{
                updatedProuct= {id:id, qty:1}
                cart.products=[...cart.products,updatedProuct] // here we adding new product/item
            }
             cart.totalPrice = cart.totalPrice + +productPrice
             fs.writeFile(p,JSON.stringify(cart),(err)=>{
                 console.log(err)
             })
        })
    }
   
}

module.exports = Cart