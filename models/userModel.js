const db = require('../config/db');

const User = {
    findById: (id, callback) => {
        db.query('SELECT * FROM users WHERE user_id = ?', [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },
    findAll: (callback) => {
        db.query('SELECT * FROM users', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        })
    }
    // Другие методы для работы с пользователями
};

module.exports = User;