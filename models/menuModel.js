const db = require('../config/db');
const { addToCart } = require('../controllers/menuController');

const Menu = {
    findById: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM menus WHERE menu_id = ?', [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]); // Возвращает один элемент
            });
        });
    },

    findAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM menus', (err, results) => {
                if (err) return reject(err);
                resolve(results); // Возвращает все элементы
            });
        });
    },

    findByCategory: (category) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM menus WHERE category_id = ?', 
                [category], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
    
    addToCart: (user_id, menu_id, quantity) => {
        return new Promise((resolve, reject) => {
            const query = `
            INSERT INTO cart (user_id, menu_id, quantity)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE quantity = quantity + ?;
          `;
            
          db.query(query, [user_id, menu_id, quantity, quantity], (err, results) => {
            if (err) return reject(err);
                resolve(results);
          });
        });
    }
};

module.exports = Menu;