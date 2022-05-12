const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = new Schema({
    title : {
        type:String,
        required:true
    },

    Price : {
        type : Number,
        required:true
    }, 

    Description : {
        type : String,
        required : true

    },

    imgURL : {
        type : String,
        required : true
    },

    userId :{
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true

    }


})


module.exports = mongoose.model('product',productSchema)























// const mongoDB = require('mongodb')
// const getDb = require('../Utilities/DataBase').getDB  


//  class product {
//     constructor(Title , imgURL , Price ,Description,id,userID){
//         this.title=Title
//         this.imgURL=imgURL
//         this.Price=Price
//         this.Description=Description
//         this._id=id
//         this.userID=userID
//     }

//     save(){
       
//         const db = getDb()
//         let dbOp

//         if(this._id){ 
//             // if the element exists then update it
//             dbOp = db.collection('products')
//             .updateOne({_id: new mongoDB.ObjectId(this._id)},{$set:this})
//         } 
//         // create a new one
//          else{
//             dbOp = db.collection('products').insertOne(this)
//          } 
        
//       return  dbOp
//         .then(result=>{
//             console.log(result)
//         })
//         .catch(err=>{
//             console.log(err)
//         })
//     }

//     static fetchAll(){
//         const db = getDb()
//         return db.collection('products')
//         .find()
//         .toArray()
//         .then(products=>{
//             console.log(products)
//             return products
//         })
//         .catch(err=>{
//             console.log(err)
//         })
//     }

//     static findByID(prodID){
//         const db = getDb()
//         return db.collection('products')
//         .find({ _id: new mongoDB.ObjectId( prodID)})
//         .next()
//         .then(result=>{
//             console.log(result)
//             return result
//         })
//         .catch(err=>{
//             console.log(err)
//         })
//     }

//     static deleteByID(prodID){
//         const db = getDb()
//         return db.collection('products')
//         .deleteOne({_id: new mongoDB.ObjectId(prodID)})
//         .then(result=>{
//             console.log(result)
//             return result
//         })
//         .catch(err=>{
//             console.log(err)
//         })
//     }
//  }

// module.exports=product





























// // const { json } = require('express/lib/response')
// // const fs = require('fs')
// // const path = require('path')

// // const p =
// //  path.join(path.dirname(process.mainModule.filename),
// //  'data', 
// //  'products.json')   

// //  const getDataFromFile = cb =>{
// //      fs.readFile(p,(err,fileContent)=>{
// //          if(err){
// //              cb([])
// //          }
// //          cb(JSON.parse(fileContent))  
// //      })
// //  }






// //  class product {
// //     constructor(Title , imgURL , Price ,Description){
// //         this.title=Title
// //         this.imgURL=imgURL
// //         this.Price=Price
// //         this.Description=Description
// //     }

// //     save(){
// //         this.id = Math.random().toString()
        
// //       fs.readFile(p,(err,fileContet)=>{
// //         let products = []
// //         if(!err){
// //             products = JSON.parse(fileContet)
// //         }

// //         products.push(this)
// //         fs.writeFile(p,JSON.stringify(products), (err)=>{
// //             console.log(err)
// //         })
// //       })


// //     }

// //     static fetchAll(cb){
// //         fs.readFile(p,(err,fileContent)=>{
// //             if(err){
// //                 cb([])
// //             }

// //             cb (JSON.parse(fileContent))
// //         })
// //     }

// //     static findByID(id,cb){
     
// //         getDataFromFile(products=>{
// //             const product = products.find(x=>x.id===id)
// //             cb(product)
// //         })
        
// //     }



// // }
 


// // module.exports = product