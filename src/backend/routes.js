// routes/index.js
const express = require('express');
const router = express.Router();
const userController = require('./src/usercontrol');

router.post('/user/create', userController.createUserControllerFn);
router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.post('/order-history', userController.createOrderHistory);
router.get('/orders/:userId', userController.getOrderHistoryById);
router.post('/address', userController.createAddress);
router.put('/address/:id', userController.updateAddress);
router.delete('/address/:id', userController.deleteAddress);
// Cart routes
router.post('/cart/add', userController.addToCart); // New
router.get('/cart/history/:userId', userController.getCartHistory); // New
router.get('/dresses', userController.getAllDresses);
router.get('/dress/:id', userController.getDressById);
router.post('/dress/', userController.createDress);
router.put('/dress/:id', userController.updateDress);
router.delete('/dress/:id', userController.deleteDress);
router.get('/order-confirmation/:orderId/:userId', userController.getOrderConfirmationDetails); // Add this line
router.delete('/cart/history/:userId', userController.deleteCartHistory);
module.exports = router;

