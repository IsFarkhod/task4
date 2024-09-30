const sequelize = require('./db'); // Путь к вашему файлу с настройками подключения
const User = require('./models/UserModel'); // Путь к вашей модели User

sequelize.sync()
    .then(() => {
        console.log('User table has been created.');
    })
    .catch(error => {
        console.error('Error creating table:', error);
    });