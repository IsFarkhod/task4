const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'taskDB'
});

const User = {

    create: async (username, password, email) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const [rows] = await pool.query('INSERT INTO user (name, password, email, dateReg, dateLastLogin, status ) VALUES (?, ?, ?, NOW(), NOW(),TRUE)',
                [username, hashedPassword, email]);
            return { id: rows.insertId, username };
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },
    findByUsername: async (username) => {
        try {
            const [rows] = await pool.query('SELECT * FROM user WHERE name = ?', [username]);
            return rows[0];
        } catch (error) {
            console.error('Error finding user:', error);
            throw error;
        }
    },
    verifyPassword: async (username, password) => {
        try {
            const user = await User.findByUsername(username);
            if (!user || user.isBlocked) return false;

            const match = await bcrypt.compare(password, user.password);
            return match;
        } catch (error) {
            console.error('Error verifying password:', error);
            throw error;
        }
    },
    updateDateLastLogin: async (id) => {
        try {
            await pool.query('UPDATE user SET dateLastLogin = NOW() WHERE id = ?', [id])
        } catch (error) {
            console.log('Error updating last login date: ', error);
            throw error;
        }
    },
    getUsers: async () => {
        try {
            const [users] = await pool.query('SELECT * FROM user');
            return users;
        } catch (error) {
            console.log('Error', error);
            throw error;
        }
    },
    blockUser: async (userId) => {
        try {
            const groupUsers = userId.map(() => '?').join(', ');
            const query = `UPDATE user SET status = TRUE WHERE id IN (${groupUsers})`;
            const [result] = await pool.query(query, userId);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Ошибка при блокировке пользователей:', error);
            return false;
        }
    },
    unblockUser: async (userId) => {
        try {
            const groupUsers = userId.map(() => '?').join(', ');
            const query = `UPDATE user SET status = FALSE WHERE id IN (${groupUsers})`;
            const [result] = await pool.query(query, userId);
            return result.affectedRows > 0; // Если строка обновлена, возвращаем true
        } catch (error) {
            console.error('Ошибка при разблокировке пользователей:', error);
            throw error;
        }
    },
    deleteUser: async (userIds) => {
        try {
            const deleteUsers = userIds.map(() => '?').join(', ');
            console.log(deleteUsers)
            const query = `DELETE FROM user WHERE id IN (${deleteUsers})`;
            const [result] = await pool.query(query, userIds);
            console.log(`Удалено пользователей: ${result.affectedRows}`)
        } catch (error) {
            console.log(error);
        }
    },
    logout: async (userId) => {
        try {
            await pool.query('UPDATE user SET dateLastLogin = NULL WHERE id = ?', [userId]);
            return true; // Возвращаем true, если выход успешен
        } catch (error) {
            console.error(error)
            return false;
        }
    }
};

module.exports = User;