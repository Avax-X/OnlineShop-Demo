

const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

const adminRoutes = require('./Routes/Admin')
const shopRoute = require('./Routes/Shop')
const authRoutes = require('./Routes/auth')
const page404=require('./Routes/404')
//const mongoConnect = require('./Utilities/DataBase').mongoConnect
const User = require('./Models/User')
// const mongoDB = require('mongodb')
const mongoose = require('mongoose')
const session = require('express-session')
const mongoDBStore= require('connect-mongodb-session')(session) // passing the session to DB 
const store = new mongoDBStore(  // execute mongoDBStore as a constructor
 {
     uri:'mongodb://localhost:27017/myShop',
     collection: 'sessions'
 }
) 

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended:false}))
app.use(session({secret: 'my secret', resave:false, saveUninitialized:false , store:store}))



app.use((req,res,next)=>{
    User.findById('627a4fa2ae929acf5f07aa21')
    .then(user=>{
        // req.user = new User(user.UserName,user.Email,user.cart,user._id)  
        req.user = user
        next()
    })
    .catch(err=>{
        console.log(err)
    })
})

app.use(adminRoutes)
app.use(shopRoute)
app.use(authRoutes)
app.use(page404)


mongoose.connect('mongodb://localhost:27017/myShop')
.then(result=>{
    // const user = new User({
    //     name : 'jeff',
    //     email : 'jeff@yahoo.com',
    //     items : []
    // })
    // user.save()
    app.listen(3000)
})
.catch(err=>{
    console.log(err)
})




//app.listen(3000)