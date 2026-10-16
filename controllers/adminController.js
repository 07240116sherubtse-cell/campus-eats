const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const Feedback = require('../models/Feedback');

exports.dashboard = async (req, res) => {
  try {
    const restaurant = await Restaurant.getRestaurantByOwnerId(
      req.session.user.id
    );
    console.log('Logged-in user ID:', req.session.user.id);
    console.log('Restaurant linked to admin:', restaurant);

    if (!restaurant) {
      return res.render('admin-dashboard', {
        title: 'My Dashboard',
        restaurant: null,
        items: [],
        feedback: []
      });
    }

    const items = await MenuItem.getMenuByRestaurant(restaurant.id);
    const feedback = await Feedback.getFeedbackForRestaurant(restaurant.id);
    console.log('Admin restaurant ID:', restaurant.id);
    console.log('Feedback loaded:', feedback);

    res.render('admin-dashboard', {
      title: 'My Dashboard',
      restaurant,
      items,
      feedback
    });
  } catch (err) {
    console.error('Admin dashboard error:', err);
    res.status(500).send('Unable to load the admin dashboard.');
  }
};

exports.addMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.getRestaurantByOwnerId(
      req.session.user.id
    );

    if (!restaurant) {
      return res.status(403).send('No restaurant is linked to this account.');
    }

    const { name, price } = req.body;
    const numericPrice = Number(price);

    if (!name || !name.trim() || !Number.isFinite(numericPrice) || numericPrice < 1) {
      return res.status(400).send('Please enter a valid item name and price.');
    }

    await MenuItem.createMenuItem({
      restaurant_id: restaurant.id,
      name: name.trim(),
      price: numericPrice
    });

    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error('Add menu item error:', err);
    res.status(500).send('Unable to add the menu item.');
  }
};
