const mongoDB = require('mongodb')
const MongoClient = mongoDB.MongoClient

let _db;

const mongoConnect = callBack => {
    MongoClient.connect('mongodb://localhost:27017')
    .then(client=>{
        console.log('Connected !!')
        _db = client.db('Shop')
        callBack()
    })
    .catch(err=>{
        console.log(err)
    })
}

const getDB = ()=>{
    if(_db)
    return _db

    throw 'no database found'
}

// module.exports = mongoConnect
exports.mongoConnect=mongoConnect
exports.getDB=getDB