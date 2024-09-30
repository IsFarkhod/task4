const express = require('express');
const User = require('../User');
const logoutRouter = express.Router();

logoutRouter.post('/logout', async (req, res) => {
    const userId = req.user;
    console.log(userId);
    const success = await User.logout(userId);
    if (success) {
        res.status(200).send('Вы вышли из системы');
    } else {
        res.status(500).send('Ошибка при выходе');
    }
});

module.exports = logoutRouter;