const express = require('express');
const User = require('../User');

const deleteUserRouter = express.Router();

deleteUserRouter.delete('/deleteUser', async (req, res) => {
    const { userIds } = req.body;
    if (!Array.isArray(userIds) || userIds.length === 0) {
        return res.status(400).send('Некорректный массив userIds');
    }
    try {
        const deleteSuccess = await User.deleteUser(userIds);
        console.log(deleteSuccess)
        if (deleteSuccess) {
            res.status(200).send('Пользователи удалены');
        } else {
            res.status(404).send('Пользователь не найден');
        }
    } catch (error) {
        console.error('Ошибка при удалении пользователей: ', error);
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = deleteUserRouter;