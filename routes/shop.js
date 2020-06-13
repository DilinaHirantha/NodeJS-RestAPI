const express = require('express');
const shop = express.Router();
const checkAuth = require('../middlewear/check-auth');
const shopController = require('../controllers/shop');

shop.get('/', shopController.getAllproducts);

shop.get('/:productId',shopController.getProduct);

shop.post('/view-cart', checkAuth, shopController.getCart);

shop.post('/cart', checkAuth, shopController.postCart);

shop.post('/cart-delete-items', checkAuth, shopController.postCartDeleteProduct);

shop.post('/creat-orders', checkAuth, shopController.postOrders);

shop.post('/orders', checkAuth, shopController.getOrders);

module.exports = shop
