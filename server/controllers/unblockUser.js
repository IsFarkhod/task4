const express = require('express');
const User = require('../User');

unblockUserRouter = express.Router();

unblockUserRouter.post('/unblockUser', async (req, res) => {
    const { userId } = req.body;
    try {
        const unblockSuccess = await User.unblockUser(userId);
        if (unblockSuccess) {
            res.status(200).send('Пользователи разблокированы');
        } else {
            res.status(404).send('Пользователь не найдены');
        }
    } catch (error) {
        res.status(500).send('Ошибка сервера')
    }
});

module.exports = unblockUserRouter;