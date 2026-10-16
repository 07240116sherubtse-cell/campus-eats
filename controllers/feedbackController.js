
const Feedback = require('../models/Feedback');
const Restaurant = require('../models/Restaurant');

exports.submitFeedback = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.getRestaurantById(restaurantId);

    if (!restaurant) {
      return res.status(404).send('Restaurant not found.');
    }

    const { customerName, rating, comment } = req.body;
    const numericRating = Number(rating);

    if (
      !customerName ||
      !customerName.trim() ||
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.redirect(`/restaurants/${restaurantId}/menu`);
    }

    await Feedback.createFeedback({
      restaurantId: restaurant.id,
      customerName: customerName.trim(),
      rating: numericRating,
      comment: comment ? comment.trim() : ''
    });

    res.redirect(`/restaurants/${restaurantId}/menu`);
  } catch (err) {
    console.error('Submit feedback error:', err);
    res.status(500).send('Unable to submit feedback.');
  }
};

