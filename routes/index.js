const express = require('express');
const userRoutes = require('./userRoutes');
const restaurantRoutes = require('./restaurantRoutes');
const orderRoutes = require('./orderRoutes');
const menuRoutes = require('./menuRoutes');
const deliveryRoutes = require('./deliveryRoutes');
const categoryRoutes = require('./categoryRoutes');


const router = express.Router();

router.use('/users', userRoutes);
// router.use('/restaurant', restaurantRoutes);
// router.use('/order', orderRoutes);
router.use('/menu', menuRoutes);
router.use('/categories', categoryRoutes);
// router.use('/delivery', deliveryRoutes);

module.exports = router;
