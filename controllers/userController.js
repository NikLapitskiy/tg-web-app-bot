const User = require('../models/userModel');

const UserController = {
    getById: (req, res) => {
        const userId = req.params.id;
        User.findById(userId, (err, user) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(user);
        });
    },
    getAll: (req, res) => {
        User.findAll((err, user) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(user);
        });
    },
    // Другие методы для работы с пользователями
};

module.exports = UserController;