const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true

    }

});

module.exports = mongoose.model('Product', productSchema); //lowercase and plural


//************mongo*************

// const mongodb = require('mongodb');
// const getDb = require('../utill/db').getDb;


// class Product {
//     constructor(title, price, description, imageUrl, id) {
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this._id = id? new mongodb.ObjectId(id) : null;
//     }

//     save() {
//         const db = getDb();
//         let dbOp;
//         if (this._id) {   //TO_CHECK_WHETHER_PRODUCTID_IS_ALREADY_EXISTS
//             dbOp = db.collection('products')
//                 .updateOne({ _id: this._id}, { $set: this })
//         }
//         else {
//             dbOp = db.collection('products').insertOne(this);
//         }
//         return dbOp.then(result => {
//             return result;
//         }).catch(err => {
//             console.log(err);
//         })

//     }

//     static fetchAll() {
//         const db = getDb();

//         return db.collection('products').find().toArray()
//             .then((products) => {
//                 console.log(products);
//                 return products;
//             }).catch((err) => {
//                 console.log(err);
//             });
//     }

//     static findById(prodId) {
//         const db = getDb(); //MONGODB_STORE_SOME_DATA_IN_THEIR_FORMAT_AS_TYPE_OBJECTID
//         return db.collection('products').find({ _id: new mongodb.ObjectId(prodId) })
//             .next()
//             .then(product => {
//                 return product;
//             }).catch(err => {
//                 console.log(err);
//             });
//     }

//     static deleteById(prodId){
//         const db = getDb();
//         return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
//         .then(result=>{
//             return result;
//         }).catch(err=>{
//             console.log(err);
//         })
//     }


// } 

//***************mysql**************************/

// const Product = sequelize.define('product', {

//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull: false,
//         primaryKey: true,
//     },

//     title: Sequelize.STRING,
//     price: {
//         type: Sequelize.DOUBLE,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     imageUrl: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });

