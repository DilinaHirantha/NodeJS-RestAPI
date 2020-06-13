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

