const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    resetToken: {type: String},

    resetTokenExpiration: {type: Date},

    password: {
        type: String,
        required: true
    },

    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
});

userSchema.methods.addToCart = function (product) {
    // ()=>{} function eken context eka clear karanawa. ethakota 'this' kiyana eka empty wenawa
    // function() eken context eka pass karanawa. clear karanne nathuwa
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        });
        console.log("THIS IS UPDATED CART ITEMS " + updatedCartItems);
    }
    const updatedCart = {
        items: updatedCartItems
    };
    this.cart = updatedCart;
    return this.save();
};


userSchema.methods.removeFromCart = function (productId) {
    const updatedCartItems = this.cart.items.filter(items => {
        return items.productId.toString() !== productId.toString();
    });
    console.log("THIS IS UPDATED CART ITEMS " + updatedCartItems);
    this.cart.items = updatedCartItems;
    return this.save();
}

userSchema.methods.clearCart = function () {
    this.cart = {item: []} //IN THIS SCHEMA, WE CAN USE THIS KEYWORD TO REPRESENT
    return this.save();
}

module.exports = mongoose.model('User', userSchema);
