const Product = require('../model/product');
const mongodb = require('mongodb');


exports.addProduct = (req, res, next) => {
    const product = new Product(
        {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            userId: '5ecbd981c62b51148cd6e052'
        })
    product.save()
        .then(result => {
            console.log(result);
            res.json(result);
        }).catch(err => {
        console.log(err);
    });
}

exports.editProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then(product => {
            res.json(product);
        }).catch(err => {
        console.log(err);
    });
}

exports.updateProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId).then(product => {
        product.title = req.body.title;
        product.imageUrl = req.body.imageUrl;
        product.price = req.body.price;
        product.description = req.body.description;
        console.log(product);
        return product.save()
            .then(result => {
                res.json(result);
                console.log("Product Updated!");
            }).catch(err => {
                console.log(err);
            });
    });
}

exports.deleteProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByIdAndDelete(prodId)
        .then(result => {
            console.log("Product deleted!");
            res.send({Message: 'Product deleted'});
        }).catch(err => {
        console.log(err);
    })
}
