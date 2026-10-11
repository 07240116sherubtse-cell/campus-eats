const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files (CSS, client-side JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const session = require('express-session');

app.use(session({
  secret: process.env.SESSION_SECRET || 'campus-eats-dev-secret',
  resave: false,
  saveUninitialized: false,
}));

// Make the logged-in user available to every view, without passing it manually every time
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Campus Eats running at http://localhost:${PORT}`);
});
