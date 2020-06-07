const express = require('express');
const admin = express.Router();

const adminController = require('../controllers/admin');

 
admin.get('/add-product',adminController.addProduct);

admin.get('/edit-product/:productId',adminController.editProduct);

admin.get('/update-product', adminController.updateProduct);

admin.get('/delete-product/:productId', adminController.deleteProduct);

module.exports = admin