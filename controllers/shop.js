const Product = require('../model/product');
const Order = require('../model/order');

exports.getAllproducts = (req, res, next) => {
    Product.find()
        .select('title price -_id') //USING_THIS_WE_CAN_GET_USER_DETAILS_FROM_BOTH_SHOP_COLLECTION
        .populate('userId', 'name')
        // .execPopulate()
        .then((products) => {
            res.json(products);
            console.log("here all products");
        }).catch((err) => {
        console.log(err);
    });
}

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then((result) => {
            res.json(result);
        }).catch((err) => {
        console.log(err);
    });
};

exports.postCart = (req, res, next) => {
    console.log("ADD TO CART");
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log(result);
        });
};

exports.getCart = (req, res, next) => {
    console.log("GET FROM CART");
    req.user.populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            console.log(user.cart.items);
        })
        .catch(err => {
            console.log(err);
        })
};

exports.postCartDeleteProduct = (req, res, next) => {
    const proId = req.body.productId;
    req.user.removeFromCart(proId)
        .then(result => {
            console.log("ITEMS REMOVED FROM THE CART");
        })
}

exports.postOrders = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return {quantity: i.quantity, product: {...i.productId._doc}};
            });
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                products: products
            });
            order.save();
        })
        .then(result => {
            req.user.clearCart();
        });
}

// exports.getCheckouts = (req, res, next) => {
//     console.log("this is the checkout");
// }

// exports.getOrders = (req, res, next) => {
//     console.log("this are the orders");
// }
