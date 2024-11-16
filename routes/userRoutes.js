const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/:id', UserController.getUser);
// Другие маршруты для пользователей

module.exports = router;