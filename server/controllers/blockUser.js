const express = require('express');
const User = require('../User');
const blockUserRouter = express.Router();

blockUserRouter.post('/blockUser', async (req, res) => {
    const { userId } = req.body;
    try {
        const success = await User.blockUser(userId);
        if (success) {
            res.status(200).send('Пользователи заблокированы');
        } else {
            res.status(404).send('Пользователи не найдены');
        }
    } catch (error) {
        res.status(500).send('Ошибка при блокировке пользователей');
    }
});

module.exports = blockUserRouter;