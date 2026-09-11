campus-eats/ 
├── config/ 
│   └── db.js                  (pg-promise connection, reused by every Model) 
├── controllers/ 
│   ├── homeController.js      (Controller — reads restaurants from the DB) 
│   ├── aboutController.js     (Controller) 
│   ├── menuController.js      (Controller — reads one restaurant's menu from the DB) 
│   └── orderController.js     (Controller — still in-memory, next lab) 
├── models/ 
│   ├── Restaurant.js          (Model / entity class) 
│   └── MenuItem.js            (Model / entity class) 
├── routes/ 
│   └── index.js               (Routing — /, /about, /restaurants/:id/menu, POST /orders) 
├── views/ 
│   ├── partials/ 
│   │   ├── header.ejs 
│   │   └── footer.ejs 
│   ├── index.ejs              (View — restaurants from the DB) 
│   ├── about.ejs 
│   ├── menu.ejs               (View — one restaurant's real menu) 
│   └── order_confirmation.ejs 
├── public/ 
├── app.js 
├── .env                       (now includes DB_HOST, DB_NAME, DB_USER, DB_PASS) 
├── .gitignore 
├── nodemon.json 
└── package.json
