const express = require('express');
//const db = require('./db');
const cors = require('cors');
const authRoutes = require('./controllers/auth')
const getUsersRouter = require('./controllers/getUsers')
const blockUser = require('./controllers/blockUser')
const unblockUserRouter = require('./controllers/unblockUser');
const deleteUserRouter = require('./controllers/deleteUser');
const logoutRouter = require('./controllers/logoutUser');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8888;
app.use(authRoutes);
app.use(getUsersRouter);
app.use(blockUser);
app.use(unblockUserRouter);
app.use(deleteUserRouter);
app.use(logoutRouter);

app.listen(PORT, () => {
    console.log(`server start on port ${PORT}`)
})