campus-eats/ 
├── config/ 
│   └── db.js 
├── controllers/ 
│   ├── homeController.js      (Controller — restaurants + stats + popular items) 
│   ├── aboutController.js 
│   ├── menuController.js 
│   └── orderController.js     (Controller — full CRUD: create, read, update, cancel) 
├── models/ 
│   ├── Restaurant.js 
│   ├── MenuItem.js 
│   └── Order.js               (Model / entity class — CRUD + aggregation queries + a transaction) 
├── routes/ 
│   └── index.js               (Routing — /, /about, /restaurants/:id/menu, POST /orders, 
│                                GET /orders/:id, POST /orders/:id/update, POST /orders/:id/cancel) 
├── views/ 
│   ├── partials/ 
│   ├── index.ejs              (View — restaurants + stats bar + popular items) 
│   ├── about.ejs 
│   ├── menu.ejs               (View — order form now sends itemId) 
│   └── order_confirmation.ejs (View — real order, with update and cancel forms) 
├── public/ 
├── app.js 
├── .env 
├── .gitignore 
├── nodemon.json 
└── package.json 
