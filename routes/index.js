const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const orderController = require('../controllers/orderController');
const menuController = require('../controllers/menuController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const superAdminController = require('../controllers/superAdminController');

const {
  requireAuth,
  requireAdmin,
  requireAuthApi,
  requireSuperAdmin
} = require('../middleware/auth');

// Superadmin routes
router.get(
  '/superadmin/dashboard',
  requireSuperAdmin,
  superAdminController.dashboard
);

router.post(
  '/superadmin/restaurants',
  requireSuperAdmin,
  superAdminController.addRestaurant
);

router.post(
  '/superadmin/restaurants/:id/remove',
  requireSuperAdmin,
  superAdminController.removeRestaurant
);

router.post(
  '/superadmin/grant-admin',
  requireSuperAdmin,
  superAdminController.grantAdmin
);

// Admin routes
router.get('/admin/dashboard', requireAdmin, adminController.dashboard);
router.post('/admin/menu', requireAdmin, adminController.addMenuItem);

// Order routes
router.post('/orders', requireAuth, orderController.createOrder);
router.get('/orders/:id', orderController.getOrder);
router.post('/orders/:id/cancel', orderController.cancelOrder);
router.post('/orders/:id/update', orderController.updateOrder);

// Home and menu routes
router.get('/', homeController.getHome);
router.get('/about', aboutController.getAbout);
router.get('/restaurants/:id/menu', menuController.getMenuByRestaurant);

// Authentication routes
router.get('/verify/:token', authController.verifyEmail);
router.get('/signup', authController.showSignup);
router.post('/signup', authController.signup);
router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Password reset routes
router.get('/forgot-password', authController.showForgotPassword);
router.post('/forgot-password', authController.forgotPassword);
router.get('/reset-password/:token', authController.showResetPassword);
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;
