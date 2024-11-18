const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menuController');

router.get('/', MenuController.getAll);
router.get('/:id', MenuController.getById);


// Другие маршруты для пользователей

module.exports = router;