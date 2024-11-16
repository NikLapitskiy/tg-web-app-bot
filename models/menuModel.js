const db = require('../config/db');

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
};

module.exports = Menu;