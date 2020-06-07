const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let db;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://dilina:PPW2m8PFzcKeLD0L@cluster0-25oxz.mongodb.net/shop?retryWrites=true&w=majority', {
        useUnifiedTopology: true
    }).then(client => {
        console.log("connected !"); 
        db = client.db();
        callback();
    }).catch(err => {
        console.log(err);
        throw err;
    })
}

const getDb = ()=>{
    if(db){
        return db;
    }

    throw 'No db found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;