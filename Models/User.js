const mongoose = require('mongoose')
const Schema = mongoose.Schema


 //component diagram
//on friday at 10:00

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    }, 

    email : {
        type : String,
        required : true
    },
  
    cart : {
        items : [
            {
                productId : { type : Schema.Types.ObjectId, ref : 'product', required : true},
                quantity : { type : Number , required : true}
            }
        ]
    }


})


userSchema.methods.addToCart= function (product){
    const cartProductIndex=this.cart.items.findIndex(cartProd=>{
                    return cartProd.productId.toString() === product._id.toString()  
                })
        
                //E198
        
                let newQuantity =1;
                const updatedCartItems= [...this.cart.items]
        
                if(cartProductIndex>=0){
                    newQuantity=this.cart.items[cartProductIndex].quantity+1
                    updatedCartItems[cartProductIndex].quantity=newQuantity
        
                } else{
                    updatedCartItems.push({
                        productId: product._id,quantity:newQuantity
                    })
        
                }
        
        
                const updatedCart={items:updatedCartItems}
                 this.cart = updatedCart
                 return this.save()
}


userSchema.methods.deleteItemFromCart=function(productId){

    const updatedCartItems = this.cart.items.filter(item=>{
        return item.productId.toString() != productId.toString()
    })

    this.cart.items = updatedCartItems
    return this.save()
}


userSchema.methods.clearCart= function(){
    this.cart = {items : []}
    return this.save()
}



module.exports = mongoose.model('User',userSchema)



























// const mongoDB = require('mongodb')
// const getDb = require('../Utilities/DataBase').getDB


// class User{
//     constructor(UserName,Email,Cart,id){
//         this.username=UserName
//         this.email=Email
//         this.cart=Cart
//         this._id=id
//     }

//     save(){

//         const db = getDb()
//         return db.collection('users')
//         .insertOne(this)
//         .then(result=>{
//             console.log(result)
//             return result
//         })
//         .catch(err=>{
//             console.log(err)
//         })
//     }

//     addToCart(product){
//         const cartProductIndex=this.cart.items.findIndex(cartProd=>{
//             return cartProd.productId.toString() === product._id.toString()  
//         })

//         //E198

//         let newQuantity =1;
//         const updatedCartItems= [...this.cart.items]

//         if(cartProductIndex>=0){
//             newQuantity=this.cart.items[cartProductIndex].quantity+1
//             updatedCartItems[cartProductIndex].quantity=newQuantity

//         } else{
//             updatedCartItems.push({
//                 productId: new mongoDB.ObjectId(product._id),quantity:newQuantity
//             })

//         }


//         const updatedCart={items:updatedCartItems}
//         const db = getDb()
//         db.collection('users')
//         .updateOne({_id: new mongoDB.ObjectId(this._id)},{$set:{cart:updatedCart}})
//     }


//     getCart(){
//         const db = getDb()
//         //mapping the original array ... 
//         //simply extracting only products ID's from the original array(items) 
//         //and storing them in a new array (this array has only product ID's).
//         const productId=this.cart.items.map(i=>{
//             return i.productId
//         })

//         return db.collection('products')
//         .find({_id: {$in : productId}}) // match id with ID's in DB from the newly created array that has only ID's.
//         .toArray()// convert the results from JSON to a JAVASCRIPT array
//         .then(products=>{ 
            
//             // now lets get the quantity back here
//             return products.map(p=>{
//                 return {...p, quantity: this.cart.items.find(cartItem=>{
//                     return cartItem.productId.toString() === p._id.toString()
//                 }).quantity
//             }
//             })   

//         })
//     }

//     deleteItemFromCart(productId){
        // filtering all the items (keeping them as long as the dont equal the Id of the product i want to delete)
//         const updatedCartItems = this.cart.items.filter(item=>{
//             return item.productId.toString() !== productId.toString()  // return false if you want to get rid of this element that holdds this id
//         })       // FROM CART                        // FROM DB
//         const db = getDb()
//         return db
//         .collection('users')
//         .updateOne({_id:new mongoDB.ObjectId(this._id)},{$set:{cart:{items:updatedCartItems}}})
//     }

//     addAnOrder(){
//         const db = getDb()
//         return this.getCart()
//         .then(products=>{
//             const order ={
//                 items: products,
//                 user:{
//                     _id: new mongoDB.ObjectId(this._id),
//                     UserName: this.username
//                 }
//             }
//             return db.collection('orders').insertOne(order)
//         })
       
//         .then(result=>{
//             this.cart={items:[]} // when u add an order , you wanna clear your cart !
//             return db
//             .collection('users')
//             .updateOne({_id: new mongoDB.ObjectId(this._id)},{$set:{cart:{items:[]}}})
//         })

//     }

//     getOrders(){
//         const db = getDb()
//         return db
//         .collection('orders')
//         .find({'user._id' : new mongoDB.ObjectId(this._id)})
//         .toArray() // bcuz we might have more than one user so we store them in the array
//     }

//     static findUserById(UserID){
 
//         const db = getDb()
//         return db.collection('users')
//         .findOne({_id: new mongoDB.ObjectId(UserID)})
//         .then(user=>{
//             console.log(user)
//             return user
//         })
//         .catch(err=>{
//             console.log(err)
//         })
//     }
// }


// module.exports=User