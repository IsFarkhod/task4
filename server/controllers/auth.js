const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../User')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET_KEY
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        //const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create(username, password, email);
        res.status(201).json({ id: newUser.id, username: newUser.username });

    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = user
    try {
        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        await User.updateDateLastLogin(user.id);
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

module.exports = router;