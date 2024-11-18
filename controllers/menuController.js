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
        // try {
        //     let items;
        //     const { category } = req.query;
        //     if (category) {
        //         items = await Menu.findByCategory(category); 
        //     }
        //     else{
        //          items = await Menu.findAll();
        //     }
        //     res.json(items);
        // } catch (err) {
        //     res.status(500).json({ message: err.message });
        // }
        try {
            const { category } = req.query; // Извлекаем категорию из параметров запроса
            const allItems = await Menu.findAll();
    
            let filteredItems = allItems;
            if (category) {
                filteredItems = await Menu.findByCategory(category);
            }
    
            res.json(filteredItems);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
};

module.exports = MenuController;