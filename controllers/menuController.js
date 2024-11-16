const Menu = require('../models/menuModel');

const MenuController = {
    getById: async (req, res) => {
        try {
            const itemId = req.params.id;
            const item = await Menu.findById(itemId); // Используем await для получения данных
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.json(item);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const items = await Menu.findAll(); // Здесь также используется await
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getByCategory: async (req, res) => {
        try {
            const { category } = req.query; // Извлекаем категорию из параметров запроса
            if (!category) {
                return res.status(400).json({ message: 'Категория не указана' }); // Обрабатываем случай, когда категория не указана
            }
    
            const items = await Menu.findByCategory(category); // Передаем категорию в метод findByCategory
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
        
    // Другие методы для работы с пользователями
};

module.exports = MenuController;