const Menu = require('../models/menuModel');

const MenuController = {
    getById: async (req, res) => {
        try {
            const itemId = req.params.id;
            const item = await Menu.findById(itemId);
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
            const { category } = req.query;
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

    postToCart: async (req, res) => {
        try{
            const { user_id, menu_id, quantity } = req.body;
            const cart = await Menu.addToCart(user_id, menu_id, quantity);
            res.json(cart);
        }catch (err){
            console.error('Ошибка при добавлении товара в корзину:', err);
              return res.status(500).json({message: err.message});
        }
    },
};

module.exports = MenuController;