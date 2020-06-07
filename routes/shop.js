const express = require('express');
const shop = express.Router();

const shopController = require('../controllers/shop');

shop.get('/', shopController.getAllproducts);

shop.get('/:productId', shopController.getProduct);

shop.post('/view-cart', shopController.getCart);

shop.post('/cart', shopController.postCart);

shop.post('/cart-delete-items', shopController.postCartDeleteProduct);

shop.post('/creat-orders', shopController.postOrders);

module.exports = shop
