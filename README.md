campus-eats/
├── config/
│   ├── db.js
│   └── mailer.js               (new — sendVerificationEmail, sendPasswordResetEmail via Gmail)
├── controllers/
│   ├── homeController.js
│   ├── aboutController.js
│   ├── menuController.js
│   ├── orderController.js
│   ├── apiController.js
│   ├── authController.js       (new — signup, login, logout, verifyEmail,
│   │                             forgot/reset password)
│   ├── adminController.js      (new — restaurant admin dashboard)
│   └── superAdminController.js (new — restaurants + granting admin access)
├── middleware/
│   └── auth.js                 (new — requireAuth, requireAdmin, requireSuperAdmin,
│                                 requireAuthApi)
├── models/
│   ├── Restaurant.js           (getAllRestaurants and getRestaurantById now filter
│   │                            is_active; adds getAllRestaurantsForAdmin,
│   │                            createRestaurantBySuperAdmin, deactivateRestaurant,
│   │                            getRestaurantByOwnerId)
│   ├── MenuItem.js             (adds createMenuItem)
│   ├── Order.js                (createOrder now takes and stores customerId)
│   └── User.js                 (new — createUser, findByEmail, verifyPassword,
│                                 markVerified, promoteToAdmin, setResetToken,
│                                 findByResetToken, resetPassword)
├── routes/
│   ├── index.js                (adds /signup, /login, /logout, /verify/:token,
│   │                             /forgot-password, /reset-password/:token,
│   │                             /admin/dashboard, /admin/menu, /superadmin/*;
│   │                             POST /orders now behind requireAuth)
│   └── api.js                  (POST /api/orders now behind requireAuthApi)
├── views/
│   ├── partials/
│   │   └── header.ejs          (nav now reflects all three roles)
│   ├── signup.ejs              (new — customer accounts only)
│   ├── signup-success.ejs      (new)
│   ├── login.ejs               (new — one shared login page, adds forgot-password link)
│   ├── verify-success.ejs      (new)
│   ├── forgot-password.ejs     (new)
│   ├── reset-password.ejs      (new)
│   ├── admin-dashboard.ejs     (new)
│   └── superadmin-dashboard.ejs (new)
├── app.js                      (adds express-session, res.locals.user)
└── .env                        (adds SESSION_SECRET, GMAIL_USER, GMAIL_APP_PASSWORD)

