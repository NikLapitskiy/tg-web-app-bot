const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menuController');

router.get('/', MenuController.getAll);
router.get('/:id', MenuController.getById);
router.post('/toCart', MenuController.postToCart);


// Другие маршруты для пользователей

module.exports = router;