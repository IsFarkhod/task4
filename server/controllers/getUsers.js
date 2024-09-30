const express = require('express');
const User = require('../User');
const getUsersRouter = express.Router();

getUsersRouter.get('/home', async (req, res) => {
    try {
        const users = await User.getUsers();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ошибка при получении пользователей'); // Отправляем ошибку клиенту
    }
});
module.exports = getUsersRouter;