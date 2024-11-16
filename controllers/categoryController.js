const Category = require('../models/categoryModel');

const CategoryController = {
    getById: async (req, res) => {
        try {
            const itemId = req.params.id;
            const item = await Category.findById(itemId); // Используем await для получения данных
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
            const items = await Category.findAll(); // Здесь также используется await
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
        
    // Другие методы для работы с пользователями
};

module.exports = CategoryController;