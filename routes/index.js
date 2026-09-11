const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const menuController = require('../controllers/menuController');
const orderController = require('../controllers/orderController');

router.post('/orders', orderController.createOrder);
router.get('/restaurants/:id/menu', menuController.getMenuByRestaurant); 
router.get('/', homeController.getHome);
router.get('/about', aboutController.getAbout);

module.exports = router;

