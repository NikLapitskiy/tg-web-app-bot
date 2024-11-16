const db = require('../config/db');

const Category = {
    findById: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM categories WHERE category_id = ?', [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]); // Возвращает один элемент
            });
        });
    },

    findAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM categories', (err, results) => {
                if (err) return reject(err);
                resolve(results); // Возвращает все элементы
            });
        });
    },
};

module.exports = Category;