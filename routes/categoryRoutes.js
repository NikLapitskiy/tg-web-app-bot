const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);
// Другие маршруты для пользователей

module.exports = router;