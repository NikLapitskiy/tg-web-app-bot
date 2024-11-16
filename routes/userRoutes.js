const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Получение всех пользователей
router.get('/', userController.getAll);

// // Создание нового пользователя
// router.post('/', userController.createUser);

// Получение пользователя по ID
router.get('/:id', userController.getById);

// // Обновление пользователя
// router.put('/:id', userController.updateUser);

// // Удаление пользователя
// router.delete('/:id', userController.deleteUser);

module.exports = router;